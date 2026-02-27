import os
from supabase import create_client, Client

# Database instance will be initialized dynamically or centrally if needed.
# For simplicity, we initialize it here directly.
url: str = os.getenv("SUPABASE_URL", "")
key: str = os.getenv("SUPABASE_KEY", "")

# Initialize the Supabase client safely
supabase: Client | None = None
if url and key:
    supabase = create_client(url, key)

def save_evaluation(parsed_text: str, score: int, feedback_json: dict) -> dict:
    """Saves the resume evaluation to Supabase."""
    if supabase is None:
        raise Exception("Supabase client is not configured properly.")
        
    data = {
        "parsed_text": parsed_text,
        "score": score,
        "feedback_json": feedback_json
    }
    response = supabase.table("resume_evaluations").insert(data).execute()
    return response.data[0] if response.data else {}
