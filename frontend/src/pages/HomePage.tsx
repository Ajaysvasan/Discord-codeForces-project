import {useState} from "react";
import "../App.css"
import "./styles/homePage.css";
import Server from "../components/Server";
import Channels from "../components/Channels";

interface ServerInfo{
  server:string;
  serverComponents:string [];
}

const HomePage = ()=>{
    const servers = [
        {serverName:"python" , serverComponents:["chat room" , "about room" , "problem statement"] },
        {serverName:"C++"  , serverComponents:["PS" , "solution"]},
        {serverName:"C" ,  serverComponents:["PS" , "solution"]},
    ];

     const getServerChannels = (selectedServer:string , servers:any)=>{
        const channels = servers.find(server=>server.serverName === selectedServer); 
        return channels.serverComponents;
  }
    const [ServerName, setServerName] = useState("");

    return(
        <div className="home">
          <div className="serverList">

            {
              servers.map(server=>(
                <Server server= {server.serverName} key={server.serverName}
            onSelectedServer = {setServerName}></Server>
              ))
            }
          </div>
          <div className="channelList">
          {
            ServerName !== "" && (
              <div className="Channel">
                <Channels channels = {getServerChannels(ServerName, servers)}/>            
              </div>
            )
          }
          </div>
 
        </div>
    )
}

export default HomePage;
