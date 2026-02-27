from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.services.agent import extract_text_from_pdf, evaluate_resume
from backend.core.database import save_evaluation

router = APIRouter()

@router.post("/evaluate")
async def evaluate(file: UploadFile = File(...)):
    """Receives a PDF resume, parses text, evaluates via AI, and logs to Supabase."""
    MAX_FILE_SIZE = 10 * 1024 * 1024 # 10MB
    
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are supported.")
        
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    content = await file.read()
    
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File is too large. Max size is 10MB.")
    
    try:
        # 1. Extract text from the PDF
        text = extract_text_from_pdf(content)
        if not text.strip():
             raise HTTPException(status_code=400, detail="Could not extract text from this PDF.")
        
        # 2. Evaluate with AI
        evaluation = evaluate_resume(text)
        
        # 3. Save to Supabase
        score = evaluation.get("score", 0)
        saved_record = save_evaluation(text, score, evaluation)
        
        return {
            "success": True,
            "record_id": saved_record.get("id"),
            "evaluation": evaluation
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
