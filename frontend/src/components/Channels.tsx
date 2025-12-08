import "./styles/channels.css";
import React from "react";
import CodeArea from "./CodeArea";
interface Channel {
  id: string | number;
  name: string;
  type: "code" | "text" | "voice";
}

interface ChannelsInfo {
  channels: Channel[]; // Changed from object to Channel[]
  setSelectedChannel: (name: string) => void;
}

const Channels = ({ channels, setSelectedChannel }: ChannelsInfo) => {
  const handleChannelClick = (channelName: string) => {
    setSelectedChannel(channelName);
  };

  console.log("channels:", channels);

  return (
    <nav id="channel-container">
      <h2>Channels</h2>

      {channels.map((channel) => (
        <React.Fragment key={channel.id}>
          {channel.type === "code" && <CodeArea />}

          <div className="channel">
            <button onClick={() => handleChannelClick(channel.name)}>
              {channel.name}
            </button>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};
export default Channels;
