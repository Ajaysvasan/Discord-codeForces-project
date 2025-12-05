import {useState} from "react";
import Textbox from "./TextBox";
import Message from "./Message";
import "./styles/textspace.css";
interface SelectedChannelName{
  selectedChannel:string
}
const MessageArea = ({selectedChannel}:SelectedChannelName)=>{
    const [message , setMessage] = useState("");
    console.log(selectedChannel);


  return(
    <div className="text-component">
        <div className="message-area">
             <Message messageReceived={message} />
        </div>
        <div className="input-box">
            <Textbox setMessage={setMessage} />
        </div>
    </div>
  );
}

export default MessageArea;
