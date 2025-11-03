import SideBar from "../components/SideBar";
import "../App.css"
import Server from "../components/Server";
const HomePage = ()=>{

    const servers = [
        {serverName:"python" , serverComponents:["chat room" , "about room" , "problem statement"] },
        {serverName:"C++"  , serverComponents:["PS" , "solution"]},
        {serverName:"C"},
    ];
    
    if(servers.length){
        console.log();
    }

    return(
        <div className="home">
            <div className="side-bar">
                <SideBar></SideBar>
            </div>
            <div className="server-components">
                {/* {
                    servers.map((server)=>(
                        <Server key = {server.serverName} serverComponents = {server.serverComponents}></Server>
                    ))
                } */}
            </div>
        </div>
    )
}

export default HomePage;