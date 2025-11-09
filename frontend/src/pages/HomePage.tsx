import SideBar from "../components/SideBar";
import "../App.css"
import Server from "../components/Server";
const HomePage = ()=>{
    return(
        <div className="home">
            <div className="side-bar">
                <SideBar></SideBar>
            </div>
            <div className="server-components">
                <Server></Server>
            </div>
        </div>
    )
}

export default HomePage;