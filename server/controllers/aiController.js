//controller for enhancing resume professional summary
//POST /api/ai/enhance-pro-sum

import ai from "../config/ai.js"
import Resume from "../models/Resume.js"

export const enhanceProSum = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer. Your task is to enhance the professional summary of a resume. You will be given a professional summary and you need to enhance it by making it more concise, impactful, and relevant. Use action verbs, quantify achievements, and highlight skills and experience. Ensure it is easy to read, free of grammatical errors, and not greater than 3-4 sentences. Return only the enhanced professional summary text, without any additional explanations, options, formatting, or extra text.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({ enhancedContent })
    } catch (error) {
        console.log("Error in enhanceProSum:", error)
        return res.status(400).json({ message: error.message })
    }
}

//controller for enhancing resume job description
//POST /api/ai/enhance-job-desc
export const enhanceJobDesc = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume writer. Your task is to enhance the job description of a resume. You will be given a job description and you need to enhance it by making it more concise, impactful, and relevant. Use action verbs, quantify achievements, and highlight skills and experience. Ensure it is easy to read, free of grammatical errors, and not greater than 4-5 sentences. Return only the enhanced job description text, without any additional explanations, options, formatting, or extra text.",
                },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({ enhancedContent })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

//controller for uploading resume to the database
//POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body
        const userId = req.userId
        if (!resumeText) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        const systemPrompt = "You are an expert AI agent to extract data from resume."
        const userPrompt = `extract data from this resume: ${resumeText}
        Provide the data in the following JSON format with no additional text before or after:
        {
         "professional_summary": {
        "type": "String",
        "default": " "
    },
    "skills": [{"type": "String"}],
    "personal_info": {
        "image": {"type": "String", "default": ""},
        "full_name": {"type": "String", "default": ""},
        "profession": {"type": "String", "default": ""},
        "email": {"type": "String", "default": ""},
        "phone": {"type": "String", "default": ""},
        "location": {"type": "String", "default": ""},
        "linkedin": {"type": "String", "default": ""},
        "website": {"type": "String", "default": ""}
    },
    "experience": [
        {
            "company": {"type": "String"},
            "position": {"type": "String"},
            "start_date": {"type": "String"},
            "end_date": {"type": "String"},
            "description": {"type": "String"},
            "is_current": {"type": "Boolean"}
        }
    ],
    "projects": [
        {
            "name": {"type": "String"},
            "typeof": {"type": "String"},
            "description": {"type": "String"}
        }
    ],
    "education": [
        {
            "institution": {"type": "String"},
            "degree": {"type": "String"},
            "field": {"type": "String"},
            "graduation_date": {"type": "String"},
            "gpa": {"type": "String"}
        }
    ]}
        `
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {
                type: "json_object"
            }
        })
        const extractedData = response.choices[0].message.content
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({ userId, title, ...parsedData })

        res.status(201).json({ message: "Resume uploaded successfully", resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
