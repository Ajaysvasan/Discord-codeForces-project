import os
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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


@app.post("/api/login/")
def login(data: LoginData):
    print(type(data))
    user_name = data.identifier
    password = data.password
    # DB Logic goes here
    return {"error": False, "message": "Hello from fast api"}


@app.post("/api/register/")
def register(data: RegisterData):
    user_name = data.userName
    email = data.email
    password = data.password
    confirm_password = data.confirmPassword
    # registration logic goes here
    return {"error": False, "message": "Registration successful"}


@app.post("/api/submit-code/")
def submit_code(code_data: CodeSubmissionData):
    problem_id = code_data.pid
    code = code_data.code
    selected_language = code_data.selectedLanguage
    print(f"Problem ID: {problem_id}, Language: {selected_language}")
    print(f"Code: {code}")
    # Code submission logic goes here
    result = run_code(selected_language, code)
    print(f"Sandboxing result: {result}")
    # sandbxing to be precise

    return (
        {"success": True, "message": "Code executed successfully"}
        if result["exit_code"] != -1
        else {"success": False, "output": result["stdout"]}
    )
