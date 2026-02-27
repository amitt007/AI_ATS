# AI ATS - Resume Intelligence Scorer

An AI-Agent powered Applicant Tracking System (ATS) simulator that takes a PDF resume and analyzes it for quality, providing constructive actionable recommendations and a final impact score—no specific job description required.

This project helps job seekers instantly evaluate their resume structure, readability, and content metrics, offering step-by-step rewrite suggestions powered by Azure AI Foundry.

## Tech Stack

- **Frontend:** Next.js 15, Tailwind CSS, Framer Motion
- **Backend:** Python, FastAPI, PyMuPDF, Azure OpenAI (Azure AI Foundry)
- **Database:** Supabase

## Architecture

```
AI_ATS/
├── frontend/         ← Next.js app (deployed on Vercel)
│   ├── app/
│   │   └── page.tsx
│   └── next.config.ts
├── backend/          ← FastAPI app (deploy separately, e.g. Railway/Render)
│   ├── main.py
│   ├── api/
│   │   └── evaluate_route.py
│   ├── core/
│   │   └── database.py
│   └── services/
│       └── agent.py
├── vercel.json       ← Tells Vercel where the frontend lives
└── README.md
```

**Flow:**
1. User uploads PDF via Next.js frontend
2. Frontend POSTs to FastAPI backend `/api/evaluate`
3. Backend extracts text with PyMuPDF, evaluates via Azure AI, stores in Supabase
4. Scores & rewrite recommendations returned to the frontend

## Local Setup

### Prerequisites
- Node.js v18+
- Python 3.10+
- Active Azure AI Foundry deployment
- Supabase project

### 1. Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows PowerShell
pip install -r requirements.txt
```

Create a `.env` file based on `.env.example`:
```env
AZURE_AI_ENDPOINT="https://<your-instance>.openai.azure.com/"
AZURE_AI_KEY="<your-key>"
AZURE_AI_MODEL="gpt-4o"
SUPABASE_URL="https://<your-project>.supabase.co"
SUPABASE_KEY="<your-anon-or-service-role-key>"
```

```bash
uvicorn main:app --port 8000 --reload
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Deployment

### Frontend → Vercel
The `vercel.json` at the repo root tells Vercel to build from the `frontend/` subdirectory. Connect the GitHub repo to Vercel — no extra dashboard config needed.

> ⚠️ Vercel only hosts the Next.js frontend. The FastAPI backend must be deployed separately.

### Backend → Railway / Render / Azure Container Apps
Deploy the `backend/` folder to your preferred Python hosting service and set its public URL as an environment variable in your Vercel project:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## Security Practices
- Strict MIME type + 10MB file size checks on both frontend and backend
- Security headers configured in `next.config.ts` (XSS protection, SAMEORIGIN, nosniff)
- Clean backend layer separation: `api/` routes → `services/` logic → `core/` database
- `.env` excluded from version control via `.gitignore`
