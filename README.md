# ✦ AI Interview Preparation Platform

> An intelligent, full-stack platform that analyzes your resume and target job description using Google Gemini LLM — delivering tailored interview questions, skill-gap analysis, and a personalized preparation roadmap.

---

## ✨ Features

- **AI-Powered Analysis** — Upload a PDF resume and paste a job description; Gemini LLM returns a structured report with a **0–100 match score**, tailored questions, and skill gaps
- **Technical & Behavioral Questions** — Role-specific questions with intent explanation and model answers
- **Personalized Roadmap** — Day-wise preparation plan based on your identified skill gaps
- **Report History** — All past interview sessions stored and retrievable per user
- **Secure Authentication** — Stateless JWT auth with HTTP-only cookies and token blacklisting
- **PDF Resume Upload** — Processed via Multer in-memory storage and `pdf-parse`

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js + Vite | UI framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| React Router | Client-side routing |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB + Mongoose | Database & ODM |
| Google Gemini API | LLM inference |
| JWT + HTTP-only cookies | Authentication |
| Multer | File upload (in-memory) |
| pdf-parse | Resume text extraction |
| Zod | Schema validation & LLM output structuring |

---
<img width="1872" height="898" alt="image" src="https://github.com/user-attachments/assets/b3a305fb-6a4f-4da4-bc03-6cb5cb25d028" />
<img width="1876" height="901" alt="image" src="https://github.com/user-attachments/assets/dfdcd9ad-bdea-4127-b24d-50f11ecc3a70" />
<img width="1814" height="877" alt="image" src="https://github.com/user-attachments/assets/5502647e-9146-4e39-b0e2-7d7d110bbb9c" />



## 📁 Project Structure
```
AI-Interview-Preparation-Platform/
├── Backend/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # Mongoose schemas
│   │   ├── routes/            # Express routers
│   │   ├── middleware/        # Auth, error handling
│   │   ├── services/          # Gemini LLM integration
│   │   └── utils/             # Helpers
│   ├── .env.example
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/          # Login, Register
│   │   │   └── interview/     # Home, Interview report
│   │   ├── components/        # Shared UI components
│   │   ├── hooks/             # useAuth, useInterview
│   │   └── main.tsx
│   └── package.json
│
└── .gitignore
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT cookie |
| `POST` | `/api/auth/logout` | Clear auth cookie |

### Interview
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/interview/generate` | Generate a new interview report |
| `GET` | `/api/interview/reports` | Get all reports for current user |
| `GET` | `/api/interview/reports/:id` | Get a single report by ID |
| `GET` | `/api/interview/resume/:id` | Download AI-enhanced resume PDF |

---

## 🧠 How It Works
```
User uploads Resume PDF + Job Description
         ↓
Backend extracts resume text via pdf-parse
         ↓
Zod schema → JSON Schema → bound to Gemini responseSchema
         ↓
Gemini LLM returns structured JSON:
  • Match Score (0–100)
  • Skill Gaps (severity: high / medium / low)
  • Technical Questions (intent + model answer)
  • Behavioral Questions (intent + model answer)
  • Day-wise Preparation Plan
         ↓
Saved to MongoDB → returned to client
```

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">Built with ❤️ by <a href="https://github.com/udita1294">udita1294</a></div>
