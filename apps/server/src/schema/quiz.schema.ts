import { z } from "zod"

const dbIdSchema = z.number().int().positive().safe();

const quizSchema = z.object({
  title: z.string().describe("Title of the Quiz"),
  desc: z.string().describe("Desc of the Quiz"),
})

// {
//   "question": "Batman's City ?",
//   "options": [
//     "New York",
//     "New Jersey",
//     "Gotham",
//     "Detroit",
//   ],
//   "answer": 2
// }
const questionSchema = z.object({
  quiz_id: z.number().describe("Quiz Id Referencing to Quiz"),
  question: z.string().describe("Question"),
  options: z.array(z.string().describe("Available Options")).min(4).max(6).nonempty(),
  answer: z.number().describe("Answer Index from Available Options").min(0).max(5),
})

const fullQuizReqSchema = z.object({
  title: z.string().describe("Title of the Quiz"),
  desc: z.string().describe("Description of the Quiz"),
  questions: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    options: z.array(z.object({
      value: z.string(),
    })).nonempty()
  })).nonempty()
})

const quizResultReqSchema = z.object({
  quizId: dbIdSchema,
  result: z.array(z.object({
    questionId: dbIdSchema,
    answeredId: dbIdSchema,
  }))
})

export { quizSchema, questionSchema, fullQuizReqSchema, quizResultReqSchema }
