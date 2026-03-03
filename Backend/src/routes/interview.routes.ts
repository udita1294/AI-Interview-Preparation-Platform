import { Router } from "express"
import type { RequestHandler } from "express"
import { authUser } from "../middlewares/auth.middleware.js"
import {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController,
} from "../controllers/interview.controller.js"
import upload from "../middlewares/file.middleware.js"

const interviewRouter = Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description, resume pdf and job description.
 * @access private
 */
interviewRouter.post(
  "/",
  authUser as unknown as RequestHandler,
  upload.single("resume"),
  generateInterViewReportController as unknown as RequestHandler
)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  authUser as unknown as RequestHandler,
  getInterviewReportByIdController as unknown as RequestHandler
)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get(
  "/",
  authUser as unknown as RequestHandler,
  getAllInterviewReportsController as unknown as RequestHandler
)

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authUser as unknown as RequestHandler,
  generateResumePdfController as unknown as RequestHandler
)

export default interviewRouter
