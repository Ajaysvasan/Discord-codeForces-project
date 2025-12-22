interface CodeResult {
  codeId: string;
  status: number;
  output: string;
  error?: string;
}
export const getCodeResult = async (codeId: string): Promise<CodeResult> => {
  console.log("Fetching results for the code ID: ", codeId);
  const codeResult = await fetch(
    `http://127.0.0.1:8000/api/code-result/${codeId}`,
    {
      method: "GET",
    }
  );
  if (!codeResult.ok) {
    throw new Error(`HTTP error! status: ${codeResult.status}`);
  }
  const data = await codeResult.json();
  return {
    codeId: data.codeId,
    status: data.status,
    output: data.output,
    error: data.error || "",
  };
};
