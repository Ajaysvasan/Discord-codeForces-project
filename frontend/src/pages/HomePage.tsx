import { useState } from "react";
import "../App.css";
import "./styles/homePage.css";
import Server from "../components/Server";
import Channels from "../components/Channels";
import MessageArea from "../components/MessageArea";
import CodeArea from "../components/CodeArea";

const HomePage = () => {
  const [ServerName, setServerName] = useState("");
  const [ChannelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("");
  interface Channel {
    id: string;
    name: string;
    type: "text" | "voice" | "code";
  }
  interface ServerData {
    id: string;
    serverName: string;
    channels: Channel[];
  }

  const servers: ServerData[] = [
    {
      id: "srv-python",
      serverName: "Python",
      channels: [
        { id: "py-chat", name: "Chat Room", type: "text" },
        { id: "py-about", name: "About Room", type: "text" },
        { id: "py-code", name: "Code Room", type: "code" },
      ],
    },
    {
      id: "srv-cpp",
      serverName: "C++",
      channels: [
        { id: "cpp-ps", name: "Problem Statements", type: "text" },
        { id: "cpp-code", name: "Code Room", type: "code" },
      ],
    },
    {
      id: "srv-c",
      serverName: "C",
      channels: [
        { id: "c-ps", name: "Problem Statements", type: "text" },
        { id: "c-code", name: "Code Room", type: "code" },
      ],
    },
  ];

  console.log("The server name is: ", ServerName);
  console.log("The type of the channel is: ", channelType);

  const getServerChannels = (selectedServerName: string, servers: any) => {
    const selectedServer = servers.find(
      (server) => server.serverName === selectedServerName
    );
    const serverChannels = selectedServer.channels;
    return serverChannels;
  };

  return (
    <div className="home">
      <div className="serverList">
        {servers.map((server) => (
          <Server
            server={server.serverName}
            key={server.serverName}
            onSelectedServer={setServerName}
          ></Server>
        ))}
      </div>
      <div className="channelList">
        {ServerName !== "" && (
          <div className="Channel">
            <Channels
              channels={getServerChannels(ServerName, servers)}
              setSelectedChannel={setChannelName}
              setChannelType={setChannelType}
            />
          </div>
        )}
      </div>

      <div className="text-space-component">
        {channelType === "text" && (
          <div className="text-space">
            <MessageArea selectedChannel={ChannelName} />
          </div>
        )}
        {channelType === "code" && (
          <div className="code">
            <CodeArea />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
