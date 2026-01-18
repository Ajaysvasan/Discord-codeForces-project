export interface LoginPayLoad {
  identifier: string;
  password: string;
}
export interface LoginSession {
  error: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  type?: string;
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
    if (res.status === 400) {
      throw new Error("Invalid credentials");
    } else if (res.status === 404) {
      throw new Error("User not found. Try registering first.");
    } else if (res.status === 500) {
      throw new Error("Server error. Please try again later.");
    }
    return await res.json();
  } catch (err) {
    return {
      error: true,
      message: (err as Error).message || "Network error",
    };
  }
};
