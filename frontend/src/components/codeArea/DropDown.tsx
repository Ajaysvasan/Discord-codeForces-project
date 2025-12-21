import { useState } from "react";
interface DropDownValues {
  title: string;
  options: string[];
  setLanguageSelected: (name: string) => void;
}

const DropDown = ({ title, options, setLanguageSelected }: DropDownValues) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="dropdown">
      <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
      {isOpen && (
        <ul>
          {options.map((opt) => (
            <li key={opt}>
              <button onClick={() => setLanguageSelected(opt)}>{opt}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
