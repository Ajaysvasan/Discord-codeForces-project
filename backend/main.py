import os
import sys
from datetime import date

from config import settings
from db.session import get_db
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from logger import logger
from models.users import User
from pydantic import BaseModel
from security.hashing import hash, verify
from security.jwt import create_access_token, verify_access_token
from sqlalchemy.orm import Session

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


class SessionToken(BaseModel):
    sessionToken: str
    uid: int


@app.post("/api/login/")
def login(data: LoginData, db: Session = Depends(get_db)):
    logger.info(f"Login attempt for {data.identifier}")
    user_email = data.identifier
    password = data.password
    result = db.query(User).filter(User.email == user_email).first()
    if result is None:
        logger.warning(f"The user does not exsists")
        return {"error": True, "message": "User does not exist"}
    hashed_password = result.password
    if not verify(hashed_password, password):
        logger.warning(f"Invalid credentials has been entered")
        return {"error": True, "message": "Invalid credentials"}
    user_id = result.id
    try:
        access_token = create_access_token(str(user_id))
        logger.info(f"Loggin  is successful for the user {data.identifier}")
        return {
            "error": False,
            "message": "Login successful",
            "sessionToken": access_token,
            "type": "bearer",
        }
    except Exception as e:
        logger.exception(f"The following Exception occured during login {e}")
        return {"error": True, "message": f"Internal server error"}


@app.post("/api/register/")
def register(data: RegisterData, db: Session = Depends(get_db)):
    # since email is unique
    logger.info(f"Login attempt for {data.email}")
    user_name = data.userName
    email = data.email
    password = data.password
    confirm_password = data.confirmPassword
    # registration logic goes here
    try:
        if password != confirm_password:
            logger.warning("The passwords did not match")
            return {"error": True, "message": "Passwords do not match"}

        created_at = str(date.today())
        # check if the email already exists
        result = db.query(User).filter(User.email == email).first()
        if result is not None:
            logger.warning(f"The user with the mail id {data.email}")
            return {"error": True, "message": "Email already exists"}
        try:
            # The hash funtion is build using argon2
            hased_password = hash(password)
            # inserting the user in the db
            new_user = User(
                name=user_name,
                email=email,
                password=hased_password,
                created_at=str(created_at),
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            logger.info(
                f"Registration successful for the user {data.userName} with mail id =  {data.email}"
            )
        except Exception as e:
            logger.exception(f"The following exception occured while registration :{e}")
            return {"error": True, "message": "Internal server error"}
    except Exception as e:
        logger.exception(f"The following exception occured while registration :{e}")
        return {"error": True, "message": "Internal server error"}
    access_token = create_access_token(str(new_user.id))
    return {
        "error": False,
        "message": "Registration successful",
        "sessionToken": access_token,
        "type": "bearer",
    }


@app.get("/api/verify-token/")
def token_validation(token: SessionToken):
    # ToDo define a function that verifies the token
    logger.info(f"verifying session token")
    if verify_access_token(token.sessionToken):
        logger.info("The session token is valid")
        return {"token": token.sessionToken, "message": "the token is valid"}
    else:
        logger.info("The session token is invaid. New token generated")
        return {
            "token": create_access_token(str(token.uid)),
            "message": "The token is invaid. New token generated",
        }


@app.get("/api/get_message/")
def get_message():
    pass


@app.post("/api/post_message")
def post_message():
    pass


# this one just updates the submissionn status after sandboxing
# also this ensures that if the mode is run then only the visible test cases are executed
# if it is submit then all test cases are executed and the code is updated and stored in the database
# and the leaderboards are updated accordingly
@app.post("/api/submit-code/")
def submit_code(code_data: CodeSubmissionData):
    logger.info(f"Attempt to run the code by the user")
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
        if result["exit_code"] == 0:
            logger.info(f"The code run successfully")
            return {
                "success": True,
                "message": "Code submitted successfully",
                "output": result["stdout"],
                "errors": result["stderr"],
            }

        else:
            logger.info(f"The code execution failed!")
            return {
                "success": False,
                "error": result["stderr"],
                "message": "Code execution failed",
                "output": result["stdout"],
            }

    except Exception as e:
        logger.warning(f"The following exception occured")
        return {"success": False, "message": "Internal server error"}
