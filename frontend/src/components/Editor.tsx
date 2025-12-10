import { Editor } from "@monaco-editor/react";
import DropDown from "./DropDown";
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
  const [langaugeSelected, setLanguageSelected] = useState("");
  console.log(langaugeSelected);
  const handleChange = (value: any) => {
    setCode(value ?? "");
    getCode(code);
  };
  const [code, setCode] = useState("");
  return (
    <div className="editor">
      <div className="language">
        <DropDown
          title="language"
          options={languageSupported}
          setLanguageSelected={setLanguageSelected}
        />
      </div>
      <Editor
        height="90vh"
        defaultLanguage="cpp"
        value={code}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
};
export default CodeSpace;
