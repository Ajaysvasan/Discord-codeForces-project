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
    if (!res.ok) {
      throw new Error("Registeration failed");
    }
    return await res.json();
  } catch (error) {
    return {
      error: true,
      message: "Server or network error" + error,
    };
  }
};
export default registerUser;
