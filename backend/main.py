import os
import sys
from datetime import date

from config import settings
from db.session import get_db
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from logger import logger
from models.users import User
from pydantic import BaseModel
from security.hashing import hash, verify
from security.jwt import create_access_token, create_refresh_token, verify_access_token
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
    access_token: str
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
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User does not exists"
        )
    if not verify(hashed_password, password):
        logger.warning(f"Invalid credentials has been entered")
        raise HTTPException(
            status_code=status.HTTP_401_NOT_FOUND, detail="Invalid credentials"
        )

    user_id = result.id
    try:
        access_token = create_refresh_token(str(user_id))
        logger.info(f"Loggin  is successful for the user {data.identifier}")
        return {
            "error": False,
            "message": "Login successful",
            "sessionToken": access_token,
            "type": "bearer",
        }
    except Exception as e:
        logger.exception(f"The following Exception occured during login {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )


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
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="Passwords don't match"
            )

        created_at = str(date.today())
        # check if the email already exists
        result = db.query(User).filter(User.email == email).first()
        if result is not None:
            logger.warning(f"The user with the mail id {data.email}")
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="User already exsists. Try logging in",
            )
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
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Internal server error",
            )
    except Exception as e:
        logger.exception(f"The following exception occured while registration :{e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="interval server error",
        )
    access_token = create_refresh_token(str(new_user.id))
    return {
        "error": False,
        "message": "Registration successful",
        "sessionToken": access_token,
        "type": "bearer",
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
    if not verify_access_token(code_data.access_token):
        return {}
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
            logger.info(f"Code failed to run on some test cases")
            return {
                "success": False,
                "error": result["stderr"],
                "message": "Code execution failed",
                "output": result["stdout"],
            }

    except Exception as e:
        logger.warning(f"The following exception occured")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )
