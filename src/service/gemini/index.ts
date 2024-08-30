import { env } from '@/env'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/server'

const gemini = new GoogleGenerativeAI(env.GEMINI_API_KEY)

export const geminiModel = gemini.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

export const aiFileManager = new GoogleAIFileManager(env.GEMINI_API_KEY)
