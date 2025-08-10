import { Hono } from 'hono'
import type { HonoAppProps } from '..'
import { saveQuizResult } from "@/controller"

const quizResultRouter = new Hono<HonoAppProps>()

quizResultRouter.post('/', ...saveQuizResult)

export { quizResultRouter }
