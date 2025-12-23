🤖** AI Task Manager – Smart Productivity App**

An AI-powered Task Management application that helps users create, manage, and optimize tasks intelligently using Google Gemini AI.
The app not only manages tasks but also acts as a ChatGPT-like AI assistant focused only on task management.

<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/19d987d2-bee9-453b-80eb-2a2254e45c12" />


🔗 **Live Demo**:

👉 https://ai-task-manager-delta.vercel.app/

🚀 Features

✅ Core Task Management

.Create, update, delete tasks

.Task priorities (High / Medium / Low)

.Due dates & time estimation

.Step-by-step task breakdown

.Task completion tracking

🤖 **AI-Powered Task Creation**

Convert raw text into a structured task
AI automatically generates:

.Title

.Description

.Priority

.Steps

.Time estimate

.Due date

Uses Google Gemini AI


💬 AI Assistant (ChatGPT-like)
Ask questions only related to your tasks
Examples:

.“Summarize my pending tasks”

.“Create a task for tomorrow’s deployment”

.“Which task should I focus on today?”

.AI can chat OR create tasks directly

.Full chat history stored in database


👤 User Authentication & Profile

.JWT-based authentication

.Secure login & registration

.Profile picture upload using Cloudinary

.User-specific tasks & AI chats


📊 Smart Insights (UI)

.Productivity insights

.Task patterns

.Risk alerts for deadlines

.Suggestions for better task planning


🧠 AI Logic Flow (How AI Works)

User sends a message (chat or task request)
Backend sends:

.User message

.User’s existing tasks

.Strict AI prompt rules

AI responds with:

.CHAT → Normal reply

.CREATE_TASK → Structured task JSON

Backend:
.Saves chat history

.Creates task if required

.Updates user task list

🏗️ **Tech Stack**

**Frontend**
.React.js (Vite)

.Tailwind CSS

.Context API (state management)

.Axios

.Lucide Icons

**Backend**

.Node.js

.Express.js

.MongoDB + Mongoose

.JWT Authentication

.Google Gemini AI API

.Cloudinary (image storage)

**DevOps / Deployment**

.Vercel (Frontend)

.MongoDB Atlas

.Environment-based configs

🖥️** Frontend Highlights**

.ChatGPT-style AI chat UI

.Smooth animations & modern dark UI

.Sidebar navigation

.Realtime task updates after AI actions

.Auto-scroll & typing indicator in AI chat

🧪** API Testing**

.Fully testable via Postman

.JWT protected routes

.AI task creation endpoint

.AI chat endpoint

.Image upload endpoint (Cloudinary)

🌟 **Why This Project Stands Out**

✅ Real AI integration (not fake logic)

✅ Clean architecture (controller / service / utils)

✅ AI limited to domain-specific knowledge (task management)

✅ Chat + Action based AI (talk & create)

✅ Scalable backend design

✅ Real-world problem solving

📌 **Future Enhancements**

.WebSockets for real-time collaboration

.Redis caching for AI responses

.Background jobs (BullMQ)

.Team-based task management

.Analytics dashboard

.Docker + CI/CD pipeline

🤝 **Author & Acknowledgements**

Made with ❤️ by **sahillll0**

If this project helped you, please ⭐ star the repo — it motivates me to build more cool stuff.

“Keep learning, keep building.” — **Sahillll0**
