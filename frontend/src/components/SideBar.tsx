import { useState } from "react";

import "../App.css"
const SideBar = ()=>{

    const [ServerName , setServerName] = useState("");

    console.log(ServerName);

    const handleClick =(server:string)=>{
        setServerName(server);
        console.log(server);
    }

    const servers = [
        {serverName:"python" , serverComponents:["chat room" , "about room" , "problem statement"] },
        {serverName:"C++"  , serverComponents:["PS" , "solution"]},
        {serverName:"C"},
    ];
    return(
        <nav id="side-bar">
            <h3>Servers list</h3>
            {
                servers.map((server)=>(
                    <div className="serverName" key={server.serverName}>
                        <button className = "server-btn" onClick = {()=>handleClick(server.serverName )}>{server.serverName}</button>
                    </div>
                ))
            }
        </nav>
    )
}
export default SideBar;     