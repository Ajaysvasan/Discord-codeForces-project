import {useState} from "react";
import "./styles/textspace.css";
interface TextInfo{
  selectedChannel:string
}
const TextSpace = ({selectedChannel}:TextInfo)=>{
    const [message , setMessage] = useState("");
    const [inputValue , setInputValue] = useState("");
    console.log(selectedChannel);
    const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key == "Enter"){
            event.preventDefault();
            setMessage(inputValue);
            setInputValue("");
        }
    }

  return(
    <div className="text-component">
        <div className="message-area">
            {message}
        </div>
        <div className="input-box">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
        </div>
    </div>
  );
}

export default TextSpace;
