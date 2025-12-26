interface codePayload {
  code: string;
  pid: number;
  selectedLanguage: string;
  mode: string;
  teamId?: string;
}
interface sendCodeResponse {
  success: boolean;
  message: string;
  // code id is going to be team id + problem id + the total submissions count for that problem by that team
  // which will be implemented later and this can be done in the frontend doesn't have to be sent from the backend
  codeId?: string;
  output?: string;
  error?: string;
  hiddenTestsPassed?: number;
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
    return {
      success: true,
      message: data.message || "Code submitted successfully",
      codeId: data.codeId, // Placeholder codeId; replace with actual logic as needed,
    };
  } catch (error) {
    return {
      success: false,
      message:
        (error as Error).message || "An error occurred while submitting code",
    };
  }
};
