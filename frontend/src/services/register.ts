interface RegisterPayLoad {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterSession {
  error: boolean;
  message?: string;
  sessionToken?: string;
  refreshToken?: string;
  type?: string;
}

const registerUser = async (
  payLoad: RegisterPayLoad
): Promise<RegisterSession> => {
  try {
    console.log("registerUser payload:", payLoad);
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payLoad),
    });
    if (res.status === 409) {
      throw new Error("Conflit");
    } else if (res.status === 500) {
      throw new Error("The user already exists. Try logging in.");
    }
    return await res.json();
  } catch (err) {
    return {
      error: true,
      message: (err as Error).message || "Network error",
    };
  }
};
export default registerUser;
