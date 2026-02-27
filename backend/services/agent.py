import fitz  # PyMuPDF
import os
import json
from typing import Dict, Any
from openai import AzureOpenAI

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extracts all text from a PDF file stream."""
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def evaluate_resume(text: str) -> Dict[str, Any]:
    """Evaluates the resume text using Azure AI Foundry and returns a scored JSON."""
    endpoint = os.getenv("AZURE_AI_ENDPOINT")
    key = os.getenv("AZURE_AI_KEY")
    
    if not endpoint or not key:
        return {"score": 0, "feedback_tips": ["Azure AI keys not configured on server (edit .env file)."]}
        
    client = AzureOpenAI(
        azure_endpoint=endpoint,
        api_key=key,
        api_version="2024-02-15-preview"
    )
    
    system_prompt = """
You are an expert HR recruiter and ATS (Applicant Tracking System) simulator. 
Evaluate the provided resume text on overall quality, readability, actionable impact, formatting, structure, and keyword optimization (without a specific JD).
Output ONLY valid JSON in the following format, with no markdown code blocks formatting outside:
{
  "score": <integer from 0 to 100>,
  "feedback_tips": [
    "tip 1", "tip 2"
  ],
  "missing_keywords_or_sections": [
    "missing 1", "missing 2"
  ],
  "positives": [
    "positive 1", "positive 2"
  ],
  "suggested_improvements": [
    {
      "original_text": "text chunk from resume that needs improvement",
      "improved_text": "suggested replacement text that sounds professional and impactful",
      "reasoning": "why this change improves the resume",
      "potential_score_increase": <integer denoting how much the score could improve if this was applied>
    }
  ]
}
"""
    
    try:
        model_name = os.getenv("AZURE_AI_MODEL", "gpt-4o")
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Here is the resume text:\n\n{text}"}
            ],
            temperature=0.7
        )
        
        content = response.choices[0].message.content.strip()
        # Clean markdown code blocks if present
        if content.startswith("```json"):
            content = content[7:-3].strip()
        elif content.startswith("```"):
            content = content[3:-3].strip()
            
        result = json.loads(content)
        return result
    except Exception as e:
        return {
            "score": 0,
            "error": str(e),
            "feedback_tips": ["Failed to evaluate resume due to an internal API error. Check standard Azure models and endpoint setup."]
        }
