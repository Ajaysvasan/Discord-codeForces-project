from datetime import datetime, timedelta

from config import Settings
from jose import JWTError, jwt
from logger import logger

JWT_KEY = Settings.JWT_SECRET_KEY
ALGORITHM = Settings.JWT_ALGORITHM
JWT_ACCESS_TOKEN_EXPIRE_MINUTIES = Settings.JWT_ACCESS_TOKEN_EXPIRE_MINUTES
JWT_REFRESH_TOKEN_EXPIRE_DAYS = Settings.JWT_REFRESH_TOKEN_EXPIRE_DAYS


def create_access_token(subject: str) -> str:
    logger.info("Creating access token for the user: ", subject)
    expire = datetime.utcnow() + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTIES)
    payload = {
        "sub": str(subject),
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access",
    }
    if payload is None:
        logger.error(f"Payload is None")
        raise ValueError("Payload is None")

    logger.info(f"Creating access token for user: {subject}")
    logger.info(f"Payload: {payload}")
    return jwt.encode(payload, JWT_KEY, algorithm=ALGORITHM)


def verify_access_token(token: str) -> str:
    try:
        payload = jwt.decode(token, JWT_KEY, algorithms=[ALGORITHM])

        if payload.get("type") != "access":

            logger.error(f"Invalid token type")
            raise ValueError("Invalid token type")

        return payload["sub"]  # return user_id

    except JWTError:
        logger.error(f"The following exception occured : {JWTError}")
        raise Exception(JWTError)


def create_refresh_token(subject: str) -> str:
    logger.info("Creating access token for the user: ", subject)
    expire = datetime.utcnow() + timedelta(days=JWT_REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {
        "sub": str(subject),
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "refresh",
    }
    if payload is None:
        logger.error("Payload is None")
        raise ValueError("Payload is None")
    logger.info(f"Payload: {payload}")
    return jwt.encode(payload, JWT_KEY, algorithm=ALGORITHM)
