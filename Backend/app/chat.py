from fastapi import APIRouter, Depends, Request
from app.auth import verify_user
from app.utils.vectorstore import retrieve_similar_docs
from app.utils.prompts import build_prompt
from openai import OpenAI

router = APIRouter()
llm = OpenAI(api_key="OPENAI_API_KEY")

@router.post("/chat")
async def chat(request: Request, user=Depends(verify_user)):
    body = await request.json()
    query = body["message"]
    role = body["role"]
    tone = body["tone"]

    docs = retrieve_similar_docs(query, user['uid'])
    prompt = build_prompt(query, docs, role, tone)

    response = llm.chat.completions.create(
        messages=[{"role": "user", "content": prompt}],
        model="gpt-4",
        stream=True
    )

    return {"response": response}
