from datetime import datetime, timedelta

from config import Settings
from jose import JWTError, jwt

JWT_KEY = Settings.JWT_SECRET_KEY
ALGORITHM = Settings.JWT_ALGORITHM
JWT_ACCESS_TOKEN_EXPIRE_MINUTIES = Settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES


def create_access_token(subject: str) -> str:
    expire = datetime.utcnow() + timedelta(JWT_ACCESS_TOKEN_EXPIRE_MINUTIES)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, JWT_KEY, ALGORITHM)


def verify_access_token(token: str) -> bool:
    return True
