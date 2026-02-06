import express from "express"
import protect from "../middleware/authMiddleware.js"
import { enhanceJobDesc, enhanceProSum, uploadResume } from "../controllers/aiController.js"

const aiRouter = express.Router()
aiRouter.post('/enhance-pro-sum', protect, enhanceProSum)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDesc)
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter