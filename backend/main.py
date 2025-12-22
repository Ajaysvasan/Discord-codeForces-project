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
    mode: str
    teamId: str | None = None


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
        # Code submission logic goes here
        if code_data.mode not in ["run", "submit"]:
            return {"success": False, "message": "Invalid mode"}
        result = run_code(selected_language, code, problem_id, mode)
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
