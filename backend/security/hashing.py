from passlib.context import CryptContext

password_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash(data: str):
    return password_context.hash(data)


def verify(hashed_data: str, plain_data: str) -> bool:
    return password_context.verify(plain_data, hashed_data)
