import argon2


def hash(data: str):
    password_hasher = argon2.PasswordHasher()
    hashed_password = password_hasher.hash(data)
    return hashed_password


def verify(hashed_data: str, plain_data: str) -> bool:
    password_hasher = argon2.PasswordHasher()
    try:
        password_hasher.verify(hashed_data, plain_data)
        return True
    except argon2.exceptions.VerifyMismatchError:
        return False
