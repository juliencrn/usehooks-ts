import { CSSProperties } from 'react'

import { useImageOnLoad } from './useImageOnLoad'

export default function Component() {
  const { handleImageOnLoad, css } = useImageOnLoad()

  const style: Record<string, CSSProperties> = {
    wrap: {
      position: 'relative',
      width: 400,
      height: 400,
      margin: 'auto',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: `100%`,
      height: `100%`,
    },
  }

  return (
    <div style={style.wrap}>
      {/* Small image load fast */}
      <img
        style={{ ...style.image, ...css.thumbnail }}
        src="https://via.placeholder.com/150"
        alt="thumbnail"
      />
      {/* Full size image */}
      <img
        onLoad={handleImageOnLoad}
        style={{ ...style.image, ...css.fullSize }}
        src="https://via.placeholder.com/600"
        alt="fullImage"
      />
    </div>
  )
}
