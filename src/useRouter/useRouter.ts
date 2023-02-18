import { useMemo } from "react";
import {
  useLocation,
  useMatch,
  useNavigate,
  useParams,
  ParamParseKey,
  PathPattern,
  PathMatch,
} from "react-router-dom";

type ParamsType = {
  [x: string]: string | (string | null)[] | null | undefined;
};

type UseRouterType = {
  push: (route: string) => void;
  replace: (route: string) => void;
  pathname: string;
  query: ParamsType;
  search: ParamsType;
  params: ParamsType;
  match: <ParamKey extends ParamParseKey<Path>, Path extends string>(
    pattern: Path | PathPattern<Path>
  ) => PathMatch<ParamKey> | null;
  location: Partial<Location>;
  history: History;
};

function useRouter(): UseRouterType {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const match = useMatch;
  const search = location.search
    ? JSON.parse(
      '{"' +
      decodeURI(location.search.substring(1))
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
    )
    : undefined;
  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: (route: string) => navigate(route),
      replace: (route: string) => navigate(route, { replace: true }),
      pathname: location.pathname,

      // Merge search and parsed query string into single "query" object for interchangeability
      query: { ...search, ...params },

      // Include search and params alone for single usage incase of duplicate keys
      search,
      params,

      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history, search]);
}

export default useRouter;
