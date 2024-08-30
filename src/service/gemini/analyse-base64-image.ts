import { geminiModel } from '.'

/**
 * Converts a local base64 image to a generative part.
 *
 * **Link**:
 * [GoogleAI for Developers - Prompt with multiple images](https://ai.google.dev/gemini-api/docs/vision?lang=node#prompt-multiple)
 */
function base64ImageToGenerativePart(base64Image: string) {
  return {
    inlineData: {
      data: base64Image,
      mimeType: 'image/jpeg',
    },
  }
}

export async function analyseBase64ImageConsumptionService(image: string) {
  const generativeImagePart = base64ImageToGenerativePart(image)

  const prompt = `Analyze the attached image of a water or gas bill. Identify and extract the measurement of usage,
which may be represented in units such as cubic meters (m³), liters, or kilowatt-hours (kWh).The relevant information
might be labeled in different languages, so look for terms like 'Consumption','Usage', 'Meter Reading', or their equivalents
in other languages such as 'Consumo', 'Lectura de Medidor' (Spanish), 'Consumo', 'Leitura do Medidor' (Portuguese).
Return only the numerical value, regardless of the language, without the associeated unit of measure`

  const result = await geminiModel.generateContent([
    prompt,
    generativeImagePart,
  ])
  const response = result.response.text()

  const onlyNumbersRegex = /[^0-9]/g

  const validateResponse = response.replace(onlyNumbersRegex, '')

  return validateResponse
}
