from fastapi import APIRouter, UploadFile, File, Depends
from app.auth import verify_user
from app.utils.vectorstore import store_document

router = APIRouter()

@router.post("/upload-docs")
async def upload_docs(file: UploadFile = File(...), user=Depends(verify_user)):
    content = await file.read()
    store_document(content, user_id=user['uid'], filename=file.filename)
    return {"message": "Document uploaded and indexed"}
