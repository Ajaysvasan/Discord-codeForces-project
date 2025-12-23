import { useState } from "react";
import Textbox from "./TextBox";
import General from "./General";
import "../styles/textspace.css";
interface SelectedChannelName {
  selectedChannel: string;
}
const MessageArea = ({ selectedChannel }: SelectedChannelName) => {
  const [message, setMessage] = useState("");
  return (
    <div className="text-component">
      <div className="message-area">
        <General messageReceived={message} />
      </div>
      <div className="input-box">
        <Textbox setMessage={setMessage} />
      </div>
    </div>
  );
};

export default MessageArea;
