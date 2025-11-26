import "../App.css"
import Server from "../components/Server"
const HomePage = ()=>{
    const servers = [
        {serverName:"python" , serverComponents:["chat room" , "about room" , "problem statement"] },
        {serverName:"C++"  , serverComponents:["PS" , "solution"]},
        {serverName:"C" ,  serverComponents:["PS" , "solution"]},
    ];
    
    if(servers.length){
        console.log();
    }

    return(
        <div className="home">
            <div className="side-bar">
                <Server servers={servers}></Server>
            </div>
        </div>
    )
}

export default HomePage;
