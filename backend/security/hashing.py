import argon2


def hash(data: str):
    password_hasher = argon2.PasswordHasher()
    hashed_password = password_hasher.hash(data)
    return hashed_password
