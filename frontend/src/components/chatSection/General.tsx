import { useState, useEffect } from "react";

interface MessageReceived {
  messageReceived: string;
}

const General = ({ messageReceived }: MessageReceived) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (messageReceived && messageReceived.trim() !== "") {
      setMessages((prev) => [...prev, messageReceived]);
    }
  }, [messageReceived]);

  return (
    <div className="Message-container">
      {messages.map((message, index) => (
        <div className="message" key={index}>
          {message}
        </div>
      ))}
    </div>
  );
};

export default General;
