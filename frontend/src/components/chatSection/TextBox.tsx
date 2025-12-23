import { useState } from "react";
import "../styles/textspace.css";
interface TextBoxArguments {
  setMessage: (inputValue: string) => void;
}
const Textbox = ({ setMessage }: TextBoxArguments) => {
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      event.preventDefault();
      setMessage(inputValue);
      setInputValue("");
    }
  };
  return (
    <div className="input-field" onChange={(e) => e.preventDefault}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
export default Textbox;
