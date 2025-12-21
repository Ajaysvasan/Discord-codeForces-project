from os import wait

LANG_CONFIG = {
    "python": {
        "image": "python:3.11",
        "source_file": "main.py",
        "compile_cmd": None,
        "run_cmd": ["python", "/code/main.py"],
        "timeout": 15,
    },
    "c": {
        "image": "gcc:13",
        "source_file": "main.c",
        "compile_cmd": ["gcc", "/code/main.c", "-O2", "-o", "/code/a.out"],
        "run_cmd": ["/code/a.out"],
        "timeout": 2,
    },
    "C++": {
        "image": "gcc:13",
        "source_file": "main.cpp",
        "compile_cmd": ["g++", "/code/main.cpp", "-O2", "-o", "/code/a.out"],
        "run_cmd": ["/code/a.out"],
        "timeout": 2,
    },
    "java": {
        "image": "eclipse-temurin:21",
        "source_file": "Main.java",
        "compile_cmd": None,
        "run_cmd": [
            "sh",
            "-c",
            "javac /code/Main.java && java -Xmx128m -cp /code Main",
        ],
        "timeout": 15,
    },
    "javascript": {
        "image": "node:20",
        "source_file": "main.js",
        "compile_cmd": None,
        "run_cmd": ["node", "/code/main.js"],
        "timeout": 5,
    },
}
