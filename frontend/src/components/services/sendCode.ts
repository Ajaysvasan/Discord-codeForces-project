interface codePayload {
  code: string;
  pid: number;
  selectedLanguage: string;
}
interface sendCodeResponse {
  success: boolean;
  message: string;
}
export const sendCode = async (
  payload: codePayload
): Promise<sendCodeResponse> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/submit-code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Response data:", data);
    return {
      success: true,
      message: data.message || "Code submitted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || "An error occurred while submitting code",
    };
  }
};
