import { DependencyList, RefObject, useState } from 'react'

import { useIsomorphicLayoutEffect, useWindowSize } from '..'

/**
 * @description Custom React hook to determine if a dropdown list is fit at the bottom of the screen or not.
 * @param selectInputRef - Ref for the select box input.
 * @param listElementRef - Ref for the dropdown list.
 * @returns {boolean} - Indicates whether the list is at the bottom of the screen.
 */
export function useIsReachedScreenEnd<
  T extends HTMLElement = HTMLElement,
  K extends HTMLElement = HTMLElement,
>(
  selectInputRef: RefObject<T>,
  listElementRef: RefObject<K>,
  dependency?: DependencyList,
) {
  // Get window height
  const { height: windowHeight } = useWindowSize()

  // State to track whether the list is at the bottom of the screen
  const [isListReachedScreenEnd, setIsListReachedScreenEnd] =
    useState<boolean>(false)

  useIsomorphicLayoutEffect(() => {
    // Get the current location of the select input box from the top of the screen (in px)
    const selectInputClientTop =
      selectInputRef.current?.getBoundingClientRect().top || 0

    // Get the height of the select input box (in px)
    const selectInputClientHeight = selectInputRef?.current?.clientHeight || 0

    // Get the height of the dropdown list (in px)
    const listClientHeight = listElementRef.current?.clientHeight || 0

    // Calculate whether the list is fit at the bottom of the available screen
    const isReachedScreenEnd =
      windowHeight - (selectInputClientTop + selectInputClientHeight) <
      listClientHeight

    setIsListReachedScreenEnd(isReachedScreenEnd)
  }, [windowHeight, selectInputRef, listElementRef, ...(dependency || [])])

  return isListReachedScreenEnd
}
