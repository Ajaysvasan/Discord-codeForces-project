import {useState} from "react";
import "../App.css"
import "./styles/homePage.css";
import Server from "../components/Server";
import Channels from "../components/Channels";
import TextSpace from "../components/TextSpace";

const HomePage = ()=>{
    const [ServerName, setServerName] = useState("");
    const [ChannelName , setChannelName] = useState("");
    const servers = [
        {serverName:"python" , serverComponents:["chat room" , "about room" , "problem statement"] },
        {serverName:"C++"  , serverComponents:["PS" , "solution"]},
        {serverName:"C" ,  serverComponents:["PS" , "solution"]},
    ];

     const getServerChannels = (selectedServer:string , servers:any)=>{
        const channels = servers.find(server=>server.serverName === selectedServer); 
        return channels.serverComponents;
  }

    return(
        <div className="home">
          <div className="serverList">
            <h2>Server components</h2>
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
                <Channels channels = {getServerChannels(ServerName, servers)} setSelectedChannel={setChannelName}/>            
              </div>
            )
          }
          </div>

        <div className="text-space-component">
            {
                ChannelName !== "" && (
                        <div className = "text-space">
                    <TextSpace selectedChannel={ChannelName}/>
                    </div>
                )
            }
        </div>
 
        </div>
    )
}

export default HomePage;
