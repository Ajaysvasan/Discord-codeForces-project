import { useState, useEffect } from "react";

interface MessageReceived {
  messageReceived: string;
}

const General = ({ messageReceived }: MessageReceived) => {
  const [messages, setMessages] = useState<string[]>([]);

  console.log(messageReceived);

  useEffect(() => {
    if (messageReceived && messageReceived.trim() !== "") {
      setMessages((prev) => [...prev, messageReceived]);
    }
  }, [messageReceived]);

  console.log(messages);

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
