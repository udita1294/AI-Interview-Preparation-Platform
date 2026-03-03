# ✦ AI Interview Preparation Platform

> An intelligent, full-stack platform that analyzes your resume and target job description using Google Gemini LLM — delivering tailored interview questions, skill-gap analysis, and a personalized preparation roadmap.

---

## 🚀 Live Demo

🔗 [View Live](#) | 📂 [GitHub Repo](https://github.com/udita1294/AI-Interview-Preparation-Platform)

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

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Google Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/udita1294/AI-Interview-Preparation-Platform.git
cd AI-Interview-Preparation-Platform
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
```
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `GEMINI_API_KEY` | Google Gemini API key |
| `CLIENT_URL` | Frontend origin (for CORS) |
| `PORT` | Backend port (default: 5000) |

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

---

## 🔒 Security

- Passwords hashed with **bcrypt**
- **Stateless JWT** in HTTP-only cookies (XSS-safe)
- Token blacklist with TTL index for secure logout
- Protected routes via auth middleware on all `/interview` endpoints
- Zod validation on all request bodies

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">Built with ❤️ by <a href="https://github.com/udita1294">udita1294</a></div>
