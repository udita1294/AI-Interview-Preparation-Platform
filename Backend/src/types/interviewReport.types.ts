import type { Document, Types } from "mongoose"

export interface IQuestion {
  question: string
  intention: string
  answer: string
}

export interface ISkillGap {
  skill: string
  severity: "low" | "medium" | "high"
}

export interface IPreparationDay {
  day: number
  focus: string
  tasks: string[]
}

export interface IInterviewReport extends Document {
  _id: Types.ObjectId
  user: Types.ObjectId
  title: string
  jobDescription: string
  resume?: string
  selfDescription?: string
  matchScore?: number
  technicalQuestions: IQuestion[]
  behavioralQuestions: IQuestion[]
  skillGaps: ISkillGap[]
  preparationPlan: IPreparationDay[]
  createdAt: Date
  updatedAt: Date
}
