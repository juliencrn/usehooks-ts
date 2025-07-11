import { renderHook } from '@testing-library/react';

import { useDebounceEffect } from './useDebounceEffect';

vitest.useFakeTimers();

describe('useDebounceEffect()', () => {
  const DELAY = 500;

  it('should execute the effect after the specified delay.', () => {
    // Given
    const effect = vitest.fn();
    const dependencies = [1];

    // When
    renderHook(() => useDebounceEffect(effect, dependencies, DELAY));
    vitest.advanceTimersByTime(DELAY);

    // Then
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should not execute the effect if dependencies change before the delay expires.', () => {
    // Given
    const effect = vitest.fn();
    let dependencies = [1];

    // When
    const { rerender } = renderHook(() => useDebounceEffect(effect, dependencies, DELAY));

    dependencies = [2];
    rerender();

    vitest.advanceTimersByTime(DELAY);

    // Then
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should execute the effect again after dependencies change after the daily.', () => {
    // Given
    const effect = vitest.fn();
    let dependencies = [1];

    // When
    const { rerender } = renderHook(() => useDebounceEffect(effect, dependencies, DELAY));

    vitest.advanceTimersByTime(DELAY);

    expect(effect).toHaveBeenCalledTimes(1);

    dependencies = [2];
    rerender();

    vitest.advanceTimersByTime(DELAY);

    // Then
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('should clear the timeout when unmounted.', () => {
    // Given
    const effect = vitest.fn();
    const dependencies = [1];

    // When
    const { unmount } = renderHook(() => useDebounceEffect(effect, dependencies, DELAY));

    unmount();

    vitest.advanceTimersByTime(DELAY);

    // Then
    expect(effect).not.toHaveBeenCalled();
  });
});
