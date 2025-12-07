import { useState } from "react";
import "../App.css";
import "./styles/homePage.css";
import Server from "../components/Server";
import Channels from "../components/Channels";
import MessageArea from "../components/MessageArea";

const HomePage = () => {
  const [ServerName, setServerName] = useState("");
  const [ChannelName, setChannelName] = useState("");

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

  const getServerChannels = (selectedServerName: string, servers: any) => {
    const selectedServer = servers.find(
      (server) => server.serverName === selectedServerName
    );
    const serverChannels = selectedServer.channels;
    console.log(typeof serverChannels);
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
            />
          </div>
        )}
      </div>

      <div className="text-space-component">
        {ChannelName !== "" && (
          <div className="text-space">
            <MessageArea selectedChannel={ChannelName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
