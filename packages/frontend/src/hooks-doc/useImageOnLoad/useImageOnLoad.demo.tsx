import React, { CSSProperties } from 'react'

import { useImageOnLoad } from 'usehooks-ts'

export default function Component() {
  const { handleImageOnLoad, css } = useImageOnLoad()

  const style: { [key: string]: CSSProperties } = {
    wrap: {
      position: 'relative',
      width: 600,
      height: 600,
    },
    image: {
      position: 'absolute',
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
