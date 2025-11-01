from fastapi import APIRouter, HTTPException
from utils.db import get_job
from utils.vecstore import load_index
from utils.groq_client import groq_chat
from prompts import MATCH_ANALYSIS_PROMPT

router = APIRouter(prefix="/match", tags=["AI Matching"])

@router.post("/{job_id}")
def match_job(job_id: str):
    job = get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job_text = f"{job.get('title','')} {job.get('description','')} {' '.join(job.get('skills', []))}"

    vs = load_index()
    if vs is None:
        raise HTTPException(status_code=500, detail="Vectorstore not built. Run build_index.py.")

    results = vs.similarity_search_with_score(job_text, k=5)
    matches = []
    for doc, score in results:
        meta = doc.metadata
        matches.append({
            "laborer_id": meta.get("laborer_id"),
            "name": meta.get("name"),
            "skills": meta.get("skills", []),
            "rating": meta.get("rating", 0),
            "score": float(score)
        })

    candidates = "\n".join(
        [f"{m['name']} ({m['rating']}⭐) skills={','.join(m['skills'])}" for m in matches]
    )

    messages = [
        {"role": "system", "content": "You are a job-matching assistant."},
        {"role": "user", "content": f"{MATCH_ANALYSIS_PROMPT}\nJob: {job_text}\nCandidates:\n{candidates}"}
    ]
    try:
        analysis, _ = groq_chat(messages)
    except Exception:
        analysis = "Groq analysis unavailable."

    return {"success": True, "matches": matches, "analysis": analysis}
