🧠 AI Resume Builder

An AI-powered resume builder that allows users to create, edit, and manage professional resumes with cloud image handling and intelligent content generation.

Built using the MERN stack, integrated with AI models for resume assistance, and ImageKit for optimized media handling.

🚀 Live Demo

Frontend: https://resume-builder-woad-eta.vercel.app

Backend API: https://resume-builder-backend-nope.onrender.com

🛠 Tech Stack
🌐 Frontend

React

Vite

Tailwind CSS

Axios

🖥 Backend

Node.js

Express.js

MongoDB

JWT Authentication

🧠 AI

AI-powered resume content generation

Gemini / OpenAI-compatible API integration

🖼 Media Handling

ImageKit (image upload, optimization, CDN delivery)

☁ Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

✨ Features

User authentication (Register / Login)

Create, edit, and save resumes

AI-assisted resume content generation

Image upload & optimization using ImageKit

Secure JWT-based authorization

Responsive and modern UI

Production-ready deployment

📂 Project Structure
resume-builder/
│
├── client/            # React frontend
│   ├── src/
│   └── public/
│
├── server/            # Node + Express backend
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── controllers/
│
└── README.md

⚙️ Environment Variables
Backend (server/.env)
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
OPENAI_API_KEY=your_ai_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash

Frontend (client/.env)
VITE_API_URL=https://resume-builder-backend-nope.onrender.com

🧪 Run Locally
Backend
cd server
npm install
npm start

Frontend
cd client
npm install
npm run dev

🔐 Authentication

JWT-based authentication

Protected API routes

Secure user sessions

🌍 Deployment Notes

Backend hosted on Render (free tier – cold starts may occur)

Frontend hosted on Vercel

CORS configured for cross-origin communication

Environment variables managed securely

📌 Future Enhancements

Resume PDF export

Multiple resume templates

Autosave drafts

Advanced AI customization

User profile dashboard

👨‍💻 Author

Shaurya
