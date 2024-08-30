/**
 *  Base64 image regex for base64 and General Image MIME types.
 *  The regex is based on RFC 4648, which is the standard for Base64 encoding.
 *
 *  [MDN: Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64)
 *  [Datatracker: RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648)
 * */
export function validateBase64Image(base64: string): boolean {
  const base64Regex =
    /^data:image\/(png|jpeg|jpg|webp);base64,[A-Za-z0-9+/]+={0,2}$/

  return base64Regex.test(base64)
}

export function getBase64ImageMimeType(base64: string) {
  const mimeTypeRegex = /^data:(image\/[a-zA-Z0-9.-]+);base64,/

  const mimeType = base64.match(mimeTypeRegex)
  return mimeType ? mimeType[1] : null
}
