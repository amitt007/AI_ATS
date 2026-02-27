# AI ATS - Resume Intelligence Scorer

An AI-Agent powered Applicant Tracking System (ATS) simulator that takes a PDF resume and analyzes it for quality, providing constructive actionable recommendations and a final impact score—no specific job description required. 

This project aims to help job seekers instantly evaluate their resume structure, readability, and content metrics, offering step-by-step re-write suggestions utilizing local AI Agent parsing strategies and robust Next.js frontend rendering.

## Tech Stack
- Frontend: **Next.js 15, Tailwind CSS, Framer Motion**
- Backend: **Python, FastAPI, PyMuPDF, OpenAI (Azure AI Foundry)** 
- Database: **Supabase**

## Architecture

1. **Frontend:** Handles user PDF file drags/drops. Implements constraints (10MB limit, PDF-only checks) and posts to the API route securely. Renders the Azure AI payload natively into clean, UI-friendly dynamic cards assessing the score.
2. **Backend:** Serves securely via `FastAPI`. Exposes the `/api/evaluate` endpoint. `PyMuPDF` unpacks PDF payload, forwards it to the defined standard `AzureOpenAI` Client configurations via specific prompt engineering, and then stores the returned struct persistently inside Supabase.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- An active Azure AI Foundry instance.
- A Supabase Project configured locally or in the cloud.

### 1. Environment Configurations
Clone this repository.
In the `/backend/` directory, create a `.env` file based on `.env.example`:
```env
AZURE_AI_ENDPOINT="https://<your-instance>.openai.azure.com/"
AZURE_AI_KEY="<your-key>"
AZURE_AI_MODEL="gpt-4o"
SUPABASE_URL="https://<your-supabase-url>.supabase.co"
SUPABASE_KEY="<your-service-role-key-or-anon>"
```

### 2. Backend Initialization
```bash
cd backend
python -m venv venv
source venv/Scripts/activate # On Windows PowerShell
pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

### 3. Frontend Initialization
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to test out the application natively.

## Security Practices Used
* Clean Backend Layer Abstraction between API routing vs service core configuration.
* Explicit validation payload verifications applied (Size + MIME format).
* Enabled Next.js explicit security boundaries (X-XSS-Protection, referrers, MIME sniffing protections).
