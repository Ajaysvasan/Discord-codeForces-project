import { Editor } from "@monaco-editor/react";
import { useState } from "react";
interface EditorArguments {
  getCode: (code: string) => void;
}

const languageSupported: string[] = [
  "python",
  "c",
  "java",
  "C++",
  "javascript",
];

const CodeSpace = ({ getCode }: EditorArguments) => {
  const [code, setCode] = useState("");
  return (
    <div className="editor">
      <Editor
        height="90vh"
        defaultLanguage="cpp"
        value={code}
        onChange={(value) => setCode(value ?? "")}
      />
    </div>
  );
};
export default CodeSpace;
