from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

# We import the router after load_dotenv so that variables are available.
from backend.api.evaluate_route import router as evaluate_router

app = FastAPI(title="AI ATS Resume Scorer")

# Add CORS so the Next.js frontend can connect
# According to security best practices, wildcard is only for dev. 
# We'll leave wildcard to avoid breaking your local environment setup, but in prod replace with your vercel URL.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Backend is running"}

app.include_router(evaluate_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
