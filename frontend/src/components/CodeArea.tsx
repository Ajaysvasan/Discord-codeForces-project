import { useState } from "react";
import ProblemStatement from "./ProblemStatement";
import CodeSpace from "./Editor";
const CodeArea = () => {
  const [code, setCode] = useState("");
  console.log(code);
  return (
    <div className="code-area">
      <div className="problem-statement-container">
        <ProblemStatement />
      </div>
      <div className="editor-container">
        <CodeSpace getCode={setCode} />
      </div>
    </div>
  );
};
export default CodeArea;
