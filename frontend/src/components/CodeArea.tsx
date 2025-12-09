import { useState } from "react";
import CodeSpace from "./Editor";
const CodeArea = () => {
  const [code, setCode] = useState("");
  const problemStatements = [
    {
      pid: 1,
      problemStatement: "Find the array that has maximum sum",
    },
  ];
  console.log(code);
  return (
    <div className="code-area">
      <div className="problem-statement-container"></div>
      <div className="editor-container">
        <CodeSpace getCode={setCode} />
      </div>
    </div>
  );
};
export default CodeArea;
