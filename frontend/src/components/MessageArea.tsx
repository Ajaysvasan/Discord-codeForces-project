import {useState} from "react";
interface SelectedChannelName{
  selectedChannel:string
}
const MessageArea = ({selectedChannel}:SelectedChannelName)=>{
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
        </div>
        <div className="input-box">
        </div>
    </div>
  );
}

export default MessageArea;
