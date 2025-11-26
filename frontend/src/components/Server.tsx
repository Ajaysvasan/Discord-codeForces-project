import { useState} from "react";
import "../App.css"
import Channels from "../components/Channels";
interface Server {
  serverName: string;
  serverComponents: string[];
}

interface SideBarProps {
  servers: Server[];
}
var selectedServer:string =  "";
const Server: React.FC<SideBarProps> = ({ servers }) => {

  const [ServerName, setServerName] = useState("");
  const handleClick = (server:string)=>{
    selectedServer = server;
    setServerName(server);
    console.log(selectedServer); 
  }


  const getServerChannels = (selectedServer:string , servers:any)=>{
    const channels = servers.find(server=>server.serverName === selectedServer); 
    return channels.serverComponents;
  }

  // console.log(getServerChannels(selectedServer , servers));

   return (
    <nav id="side-bar">
      <h3>Servers list</h3>
      {
        servers.map((server) => (
          <div className="serverName" key={server.serverName}>
            <button className="server-btn" onClick={() => handleClick(server.serverName)}>{server.serverName}</button>
          </div>
        ))
      }
      {
        selectedServer !== "" && (
          <div className="Channels">
            <Channels channels = {getServerChannels(selectedServer , servers)}/>            
          </div>
        )
      }
    </nav>
  )
}
export default Server;     
