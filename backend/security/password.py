from passlib.context import CryptContext

password_context = CryptContext(schemes=["argon2"], deprecated="auto")
