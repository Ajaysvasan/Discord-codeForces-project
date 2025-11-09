import SideBar from "../components/SideBar";
import "../App.css"
import Server from "../components/Server";
const HomePage = ()=>{

    const servers = [
        {serverName:"python" , components: ["Chat" , "Rules"]  },
        {serverName:"C++",  components: ["Chat" , "Rules"]},
        {serverName:"C" , components: ["Chat" , "Rules"]},
    ];

    return(
        <div className="home">
            <div className="side-bar">
                <SideBar servers = {servers}></SideBar>
            </div>
            <div className="server-components">
                <Server></Server>
            </div>
        </div>
    )
}

export default HomePage;