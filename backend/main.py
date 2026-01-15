import os
import sys
from datetime import date

from config import settings
from db import Session
from db.session import engine, get_db
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from psycopg2.sql import Identifier
from pydantic import BaseModel
from security.hashing import hash
from sqlalchemy import text

module_dir = os.path.join(os.path.dirname(__file__), "services")
sys.path.append(module_dir)

from services.sandboxing import run_code

app = FastAPI(title="Discord_codeforces project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_config = {
    "host": settings.DB_HOST,
    "port": settings.DB_PORT,
    "database": settings.DB_NAME,
    "user": settings.DB_USER,
    "password": settings.DB_PASSWORD,
}


class LoginData(BaseModel):
    identifier: str
    password: str


class RegisterData(BaseModel):
    userName: str
    email: str
    password: str
    confirmPassword: str


class CodeSubmissionData(BaseModel):
    pid: int
    code: str
    selectedLanguage: str
    mode: str
    teamId: str | None = None


@app.post("/api/login/")
def login(data: LoginData):
    user_email = data.identifier
    password = data.password
    hashed_password = hash(password)
    with engine.connect() as conn:
        result = conn.execute(
            text("select id from users where email=:email and password=:password"),
            {"email": user_email, "password": hashed_password},
        )
        print(result)
    # DB Logic goes here
    return {"error": False, "message": "Hello from fast api"}


@app.post("/api/register/")
def register(data: RegisterData, db: Session = Depends(get_db)):
    user_name = data.userName
    email = data.email
    password = data.password
    confirm_password = data.confirmPassword
    print(data)
    # registration logic goes here
    try:
        if password != confirm_password:
            return {"error": True, "message": "Passwords do not match"}

        created_at = date.today()
        try:
            # The hash funtion is build using argon2
            hased_password = hash(password)
            with engine.connect() as conn:
                get_id = conn.execute(
                    text("select id from users order by id desc limit 1"),
                )

                if get_id.scalar() is not None:
                    new_id = get_id.scalar() + 1
                else:
                    new_id = 1
            with engine.connect() as conn:
                conn.execute(
                    text(
                        "insert into users (id, name, email, password, created_at) values (:id,:name, :email, :password, :created_at)"
                    ),
                    {
                        "id": new_id,
                        "name": user_name,
                        "email": email,
                        "password": hased_password,
                        "created_at": created_at,
                    },
                )
        except Exception as e:
            print(e)
            return {"error": True, "message": str(e)}
    except Exception as e:
        print(e)
        return {"error": True, "message": str(e)}
    return {"error": False, "message": "Registration successful"}


# this one just updates the submissionn status after sandboxing
# also this ensures that if the mode is run then only the visible test cases are executed
# if it is submit then all test cases are executed and the code is updated and stored in the database
# and the leaderboards are updated accordingly
@app.post("/api/submit-code/")
def submit_code(code_data: CodeSubmissionData):
    try:
        problem_id = code_data.pid
        code = code_data.code
        selected_language = code_data.selectedLanguage
        mode = code_data.mode
        if code_data.mode not in ["run", "submit"]:
            return {"success": False, "message": "Invalid mode"}
        result = run_code(selected_language, code, problem_id, mode)
        print(result)
        # Logic for submitting code and running all test cases
        # logic for updating database and leaderboards
        # sandbxing to be precise

        return (
            {
                "success": True,
                "message": "Code submitted successfully",
                "output": result["stdout"],
                "errors": result["stderr"],
            }
            if result["exit_code"] == 0
            else {
                "success": False,
                "error": result["stderr"],
                "message": "Code execution failed",
                "output": result["stdout"],
            }
        )
    except Exception as e:
        return {"success": False, "message": str(e)}
