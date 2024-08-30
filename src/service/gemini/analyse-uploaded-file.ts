import { geminiModel } from '.'

export async function analyseUploadedFile(fileUri: string) {
  const prompt = `Analyze the attached image of a water or gas bill. Identify and extract the measurement of usage,
which may be represented in units such as cubic meters (m³), liters, or kilowatt-hours (kWh).The relevant information
might be labeled in different languages, so look for terms like 'Consumption','Usage', 'Meter Reading', or their equivalents
in other languages such as 'Consumo', 'Lectura de Medidor' (Spanish), 'Consumo', 'Leitura do Medidor' (Portuguese).
Return only the numerical value, regardless of the language, without the associeated unit of measure`

  const result = await geminiModel.generateContent([
    {
      fileData: {
        mimeType: 'image/jpeg',
        fileUri,
      },
    },
    { text: prompt },
  ])

  const res = result.response.text()

  const onlyNumbersRegex = /[^0-9]/g

  const sanatizedRes = res.replace(onlyNumbersRegex, '')

  return sanatizedRes
}
