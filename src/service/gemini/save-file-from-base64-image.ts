import { env } from '@/env'
import { InternalError } from '@/http/errors'
import { z } from 'zod'

/**
 * Google AI File Manager SDK only Supports uploading files in the system path.
 * Considering that we only have the Buffer from a base64 image, we can't use the SDK.
 *
 * Due to that limitation, we will upload it through the Google AI File Manager REST API.
 *
 * @return File object with the uploaded file metadata.
 * @reference
 * - [GeminiAPI: File](https://ai.google.dev/api/files#File)
 * - [Gemini API: media.upload](https://ai.google.dev/api/files#method:-media.upload)
 */
export async function saveFileFromBase64Image({
  costumerCode,
  base64Image,
}: {
  costumerCode: string
  base64Image: string
}) {
  const imageBuf = Buffer.from(base64Image, 'base64')

  const fileName = `${costumerCode}-${Date.now()}.jpeg`

  const reqURL = await acquireUploadURL(imageBuf.length, fileName)

  const headers = {
    'Content-Length': imageBuf.length.toString(),
    'X-Goog-Upload-Offset': '0',
    'X-Goog-Upload-Command': 'upload, finalize',
  }

  const res = await fetch(reqURL, {
    method: 'POST',
    headers,
    body: imageBuf,
  })

  if (!res.ok) {
    console.error('error on saveFileFromBase64Image UPLOAD URL request')
    throw new InternalError()
  }

  const expecteResponseSchema = z.object({
    file: z.object({
      name: z.string(),
      displayName: z.string(),
      mimeType: z.string(),
      uri: z.string(),
    }),
  })

  const parsedRes = expecteResponseSchema.safeParse(await res.json())

  if (!parsedRes.success) {
    console.error('error on saveFileFromBase64Image UPLOAD FILE request')
    throw new InternalError()
  }

  return parsedRes.data.file
}

/**
 * Acquire the upload URL from the Google AI File Manager API.
 *
 * [Gemini API: media.upload](https://ai.google.dev/api/files#method:-media.upload)
 */
async function acquireUploadURL(bufferSize: number, fileName: string) {
  const uploadEndpoint = new URL(
    'https://generativelanguage.googleapis.com/upload/v1beta/files'
  )

  uploadEndpoint.searchParams.set('key', env.GEMINI_API_KEY)

  const headers = {
    'X-Goog-Upload-Protocol': 'resumable',
    'X-Goog-Upload-Command': 'start',
    'X-Goog-Upload-Header-Content-Length': bufferSize.toString(),
    'X-Goog-Upload-Header-Content-Type': 'image/jpeg',
    'Content-Type': 'application/json',
  }

  const body = JSON.stringify({
    file: {
      display_name: fileName,
    },
  })

  const res = await fetch(uploadEndpoint, {
    method: 'POST',
    headers,
    body,
  })

  if (!res.ok) {
    console.error('error on acquireUploadURL request')
    throw new InternalError()
  }

  const expectedResHeaders = res.headers.get('x-goog-upload-url')

  if (!expectedResHeaders) {
    console.error('error on acquireUploadURL: invalid response headers')
    throw new InternalError()
  }

  return expectedResHeaders
}
