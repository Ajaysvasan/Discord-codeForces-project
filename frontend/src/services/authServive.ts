export interface LoginPayLoad {
  identifier: string;
  password: string;
}
export interface LoginSession {
  error: boolean;
  sessionToken?: string;
  message?: string;
}

export const loginUser = async (
  payLoad: LoginPayLoad
): Promise<LoginSession> => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });
    if (!res.ok) {
      throw new Error("login failed");
    }

    return await res.json();
  } catch (err) {
    return {
      error: true,
      message: "Network or server error",
    };
  }
};
