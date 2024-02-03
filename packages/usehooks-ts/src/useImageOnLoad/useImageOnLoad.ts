import { useState } from 'react'

import type { CSSProperties } from 'react'

interface ImageStyle {
  thumbnail: CSSProperties
  fullSize: CSSProperties
}

interface ImageOnLoadType {
  handleImageOnLoad: () => void
  css: ImageStyle
}

/**
 * Custom hook for handling image loading events and providing related CSS styles.
 * @deprecated This hook is deprecated and will be removed in a future release.
 * @returns {ImageOnLoadType} An object containing a function to handle image load events and related CSS styles.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-image-on-load)
 * @example
 * const { handleImageOnLoad, css } = useImageOnLoad();
 * // Use handleImageOnLoad as the onLoad handler for the full-size image.
 * // Apply the CSS styles from the `css` object to control visibility and transitions.
 */
export function useImageOnLoad(): ImageOnLoadType {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true)
  }

  const css: ImageStyle = {
    // Thumbnail style.
    thumbnail: {
      visibility: isLoaded ? 'hidden' : 'visible',
      filter: 'blur(8px)',
      transition: 'visibility 0ms ease-out 500ms',
    },
    // Full image style.
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 500ms ease-in 0ms',
    },
  }

  return { handleImageOnLoad, css }
}
