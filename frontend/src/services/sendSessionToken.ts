const sendSessionToken = async (token: string) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/verify-token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending session token:", error);
    return { error: true, message: "Network error" };
  }
};
export default sendSessionToken;
