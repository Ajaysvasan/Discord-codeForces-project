import "./styles/channels.css";
import React from "react";
interface Channel {
  id: string | number;
  name: string;
  type: "code" | "text" | "voice";
}

interface ChannelsInfo {
  channels: Channel[]; // Changed from object to Channel[]
  setSelectedChannel: (name: string) => void;
  setChannelType: (channelType: string) => void;
}

const Channels = ({
  setChannelType,
  channels,
  setSelectedChannel,
}: ChannelsInfo) => {
  const handleChannelClick = (channelName: string, channelType: string) => {
    setSelectedChannel(channelName);
    setChannelType(channelType);
  };

  console.log("channels:", channels);

  return (
    <nav id="channel-container">
      <h2>Channels</h2>

      {channels.map((channel) => (
        <React.Fragment key={channel.id}>
          <div className="channel">
            <button
              onClick={() => handleChannelClick(channel.name, channel.type)}
            >
              {channel.name}
            </button>
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};
export default Channels;
