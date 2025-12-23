import { Editor } from "@monaco-editor/react";
import DropDown from "./DropDown";
import { useRef } from "react";
interface EditorArguments {
  getCode: (code: string) => void;
  setLanguageSelected?: (name: string) => void;
  selectedLanguage?: string;
}

const languageSupported: string[] = [
  "python",
  "c",
  "java",
  "C++",
  "javascript",
];

const CodeSpace = ({
  getCode,
  setLanguageSelected,
  selectedLanguage,
}: EditorArguments) => {
  const codeRef = useRef<string>("");
  const handleChange = (value: any) => {
    getCode(value);
  };
  return (
    <div className="editor" onSubmit={(e) => e.preventDefault()}>
      <div className="language">
        <DropDown
          title="language"
          options={languageSupported}
          setLanguageSelected={setLanguageSelected}
        />
      </div>
      <Editor
        height="60vh"
        defaultLanguage={selectedLanguage || "python"}
        value={codeRef.current}
        onChange={(value) => handleChange(value)}
      />
    </div>
  );
};
export default CodeSpace;
