import os
import subprocess
import tempfile

from languages import LANG_CONFIG


def run_code(language: str, code: str, timeout=5):
    if language not in LANG_CONFIG:
        return {
            "stdout": "",
            "stderr": f"Unsupported language: {language}",
            "exit_code": -2,
        }

    cfg = LANG_CONFIG[language]

    with tempfile.TemporaryDirectory() as tmp:
        src_path = os.path.join(tmp, cfg["source_file"])
        with open(src_path, "w") as f:
            f.write(code)

        base_cmd = [
            "docker",
            "run",
            "--rm",
            "--network",
            "none",
            "--memory",
            "256m",
            "--cpus",
            "0.5",
            "--pids-limit",
            "64",
            "-v",
            f"{tmp}:/code:Z",
            cfg["image"],
        ]

        try:
            # Compile step (if required)
            if cfg["compile_cmd"]:
                compile_proc = subprocess.run(
                    base_cmd + cfg["compile_cmd"],
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    timeout=timeout,
                )

                if compile_proc.returncode != 0:
                    return {
                        "stdout": "",
                        "stderr": compile_proc.stderr.decode(),
                        "exit_code": compile_proc.returncode,
                    }

            # Run step
            run_proc = subprocess.run(
                base_cmd + cfg["run_cmd"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=timeout,
            )

            return {
                "stdout": run_proc.stdout.decode(),
                "stderr": run_proc.stderr.decode(),
                "exit_code": run_proc.returncode,
            }

        except subprocess.TimeoutExpired:
            return {
                "stdout": "",
                "stderr": "Time Limit Exceeded",
                "exit_code": -1,
            }
