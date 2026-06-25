from fastapi import FastAPI
from fastapi import HTTPException
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from sqlalchemy.orm import Session

from passlib.hash import bcrypt

from database import SessionLocal

from models import User
from models import UserLoginLog

from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


class LoginRequest(BaseModel):

    username: str
    password: str


@app.post("/signup")
async def signup(data: LoginRequest):

    db: Session = SessionLocal()

    try:

        existing_user = db.query(User).filter(
            User.username == data.username
        ).first()

        if existing_user:

            raise HTTPException(
                status_code=400,
                detail="Username already exists"
            )

        hashed_password = bcrypt.hash(
            data.password[:72]
        )

        new_user = User(

            username=data.username,

            password=hashed_password,

            enter_by="admin"

        )

        db.add(new_user)

        db.commit()

        return {

            "status": "success",

            "message": "Signup successful"

        }

    finally:

        db.close()



@app.post("/login")
async def login(

    login_data: LoginRequest,

    request: Request

):

    db: Session = SessionLocal()

    try:

        user = db.query(User).filter(
            User.username == login_data.username
        ).first()

        if not user:

            failed_log = UserLoginLog(

                user_id=None,

                ip_address=request.client.host,

                login_location="Unknown",

                device={
                    "browser": "Chrome",
                    "os": "Windows"
                },

                status="FAILED"

            )

            db.add(failed_log)

            db.commit()

            raise HTTPException(

                status_code=401,

                detail="Invalid username"

            )

        if not bcrypt.verify(

            login_data.password[:72],

            user.password

        ):

            failed_log = UserLoginLog(

                user_id=user.user_id,

                ip_address=request.client.host,

                login_location="Unknown",

                device={
                    "browser": "Chrome",
                    "os": "Windows"
                },

                status="FAILED"

            )

            db.add(failed_log)

            db.commit()

            raise HTTPException(

                status_code=401,

                detail="Invalid password"

            )

        success_log = UserLoginLog(

            user_id=user.user_id,

            ip_address=request.client.host,

            login_location="India",

            device={
                "browser": "Chrome",
                "os": "Windows"
            },

            status="SUCCESS"

        )

        db.add(success_log)

        db.commit()

        return {

            "status": "success",

            "message": "Login successful"

        }

    finally:

        db.close()
