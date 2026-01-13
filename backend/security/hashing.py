import hashlib


def hash(data: str):
    data_bytes = data.encode("utf-8")
    hash_objects = hashlib.sha256(data_bytes)
    hex_dig = hash_objects.hexdigest()
    return hex_dig
