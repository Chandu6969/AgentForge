from fastapi import APIRouter, Depends, Request, HTTPException
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials

cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)

router = APIRouter()

def verify_user(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=403, detail="Invalid token")
