export function toPixel(pixel) {
  if (Array.isArray(pixel)) {
    return new google.maps.Point(pixel[0], pixel[1])
  }
  return pixel
}

export function toSize(size) {
  if (Array.isArray(size)) {
    return new google.maps.Size(size[0], size[1])
  }
  return size
}

export function pixelTo(pixel) {
  if (Array.isArray(pixel)) return pixel
  return [pixel.x, pixel.y]
}

export function toLngLat(lngLat) {
  if (Array.isArray(lngLat)) {
    return new google.maps.LatLng(lngLat[1], lngLat[0])
  }
  return lngLat
}

export function lngLatTo(lngLat) {
  if (!lngLat) return
  if (Array.isArray(lngLat)) return lngLat.slice()
  return [lngLat.lng(), lngLat.lat()]
}

/**
 * @param arrs 二重数组 southWest, northEast
 */
export function toBounds(arrs) {
  return new google.maps.LatLngBounds(toLngLat(arrs[0]), toLngLat(arrs[1]))
}

export function boundsTo(bounds) {
  return [lngLatTo(bounds.getSouthWest()), lngLatTo(bounds.getNorthEast())]
}

export function toIcon(options) {
  let icon = options
  if (typeof options === 'string') {
    icon = {
      url: options
    }
  } else if (options['image']) {
    // 高德的icon配置
    const {
      size,
      imageOffset,
      image,
      imageSize
    } = options
    icon = {
      url: image,
      size: toSize(size),
      origin: toPixel(imageOffset),
      scaledSize: toSize(imageSize)
    }
  }
  console.log('toIcon', options, icon, options === icon)
  return icon
}

export const commonConvertMap = {
  position: toLngLat,
  offset: toPixel,
  bounds: toBounds,
  LngLat: toLngLat,
  Pixel: toPixel,
  Point: toPixel,
  Size: toSize,
  Bounds: toBounds,
  icon: toIcon
}
