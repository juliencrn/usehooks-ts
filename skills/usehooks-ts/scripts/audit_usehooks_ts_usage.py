#!/usr/bin/env python3
"""Audit common usehooks-ts integration issues in a React project."""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass
from pathlib import Path


IGNORE_DIRS = {
    ".git",
    ".next",
    ".turbo",
    "build",
    "coverage",
    "dist",
    "generated",
    "node_modules",
    "out",
}

SOURCE_EXTENSIONS = {".js", ".jsx", ".ts", ".tsx", ".mdx"}

REMOVED_HOOKS = {
    "useDebounce": "useDebounceValue or useDebounceCallback",
    "useElementSize": "useResizeObserver",
    "useFetch": "framework data fetching, SWR, or TanStack Query",
    "useLockedBody": "useScrollLock",
    "useIsFirstRender": "explicit state/effect logic",
    "useSsr": "framework SSR/client boundaries",
    "useEffectOnce": "React useEffect",
    "useUpdateEffect": "React useEffect with explicit guards",
    "useImageOnLoad": "app-specific image loading behavior",
}

SSR_SENSITIVE_HOOKS = {
    "useLocalStorage",
    "useSessionStorage",
    "useReadLocalStorage",
    "useMediaQuery",
    "useWindowSize",
    "useScreen",
    "useDarkMode",
    "useTernaryDarkMode",
}

IMPORT_STATEMENT_RE = re.compile(
    r"import\s+[\s\S]*?\s+from\s+['\"][^'\"]+['\"]\s*;?",
    re.MULTILINE,
)

FROM_RE = re.compile(
    r"import\s+(?P<clause>[\s\S]*?)\s+from\s+['\"](?P<source>usehooks-ts[^'\"]*)['\"]",
    re.MULTILINE,
)

NAMED_IMPORT_RE = re.compile(r"\{(?P<named>[\s\S]*?)\}")


@dataclass
class Finding:
    severity: str
    path: Path
    message: str


def iter_source_files(root: Path):
    for path in root.rglob("*"):
        if path.is_dir():
            continue
        if any(part in IGNORE_DIRS for part in path.parts):
            continue
        if path.suffix in SOURCE_EXTENSIONS:
            yield path


def has_use_client_directive(text: str) -> bool:
    for raw_line in text.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("//"):
            continue
        return line in {"'use client'", '"use client"', "'use client';", '"use client";'}
    return False


def is_next_app_file(path: Path) -> bool:
    normalized = path.as_posix()
    return "/app/" in normalized or normalized.startswith("app/")


def parse_named_imports(clause: str) -> set[str]:
    match = NAMED_IMPORT_RE.search(clause)
    if not match:
        return set()
    names = set()
    for item in match.group("named").split(","):
        raw = item.strip()
        if not raw:
            continue
        name = raw.split(" as ")[0].strip()
        if name.startswith("type "):
            name = name.removeprefix("type ").strip()
        names.add(name)
    return names


def audit_file(path: Path, root: Path) -> list[Finding]:
    rel = path.relative_to(root)
    text = path.read_text(encoding="utf-8", errors="ignore")
    findings: list[Finding] = []

    matches = []
    for statement in IMPORT_STATEMENT_RE.finditer(text):
        match = FROM_RE.search(statement.group(0))
        if match:
            matches.append(match)
    if not matches:
        return findings

    imported_hooks: set[str] = set()

    for match in matches:
        source = match.group("source")
        clause = match.group("clause")

        if source != "usehooks-ts":
            findings.append(
                Finding(
                    "error",
                    rel,
                    f"Deep import from '{source}'. Import named hooks from 'usehooks-ts'.",
                )
            )

        normalized_clause = clause.strip().removeprefix("type ").strip()
        if normalized_clause and not normalized_clause.startswith("{"):
            findings.append(
                Finding(
                    "warning",
                    rel,
                    "Possible default or namespace import. Prefer named imports from 'usehooks-ts'.",
                )
            )

        imported_hooks.update(parse_named_imports(clause))

    for hook, replacement in sorted(REMOVED_HOOKS.items()):
        if hook in imported_hooks:
            findings.append(
                Finding(
                    "error",
                    rel,
                    f"{hook} was removed from v3. Use {replacement}.",
                )
            )

    if is_next_app_file(rel) and not has_use_client_directive(text):
        findings.append(
            Finding(
                "warning",
                rel,
                "Next.js App Router file imports usehooks-ts but lacks a top-level 'use client' directive.",
            )
        )

    sensitive_used = imported_hooks & SSR_SENSITIVE_HOOKS
    if sensitive_used and "initializeWithValue" not in text:
        hooks = ", ".join(sorted(sensitive_used))
        findings.append(
            Finding(
                "info",
                rel,
                f"SSR-sensitive hook(s) used without visible initializeWithValue option: {hooks}. Check hydration behavior.",
            )
        )

    return findings


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Audit common usehooks-ts usage issues in a project."
    )
    parser.add_argument("root", nargs="?", default=".", help="Project root to scan")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        parser.error(f"Path does not exist: {root}")

    findings: list[Finding] = []
    for path in iter_source_files(root):
        findings.extend(audit_file(path, root))

    if not findings:
        print("No obvious usehooks-ts issues found.")
        return 0

    order = {"error": 0, "warning": 1, "info": 2}
    findings.sort(key=lambda item: (order.get(item.severity, 99), str(item.path)))

    for finding in findings:
        print(f"[{finding.severity.upper()}] {finding.path}: {finding.message}")

    return 1 if any(item.severity == "error" for item in findings) else 0


if __name__ == "__main__":
    raise SystemExit(main())
