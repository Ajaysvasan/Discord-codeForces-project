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
    {
        serverName: "JavaScript",
        serverComponents: [
            "general-chat",
            "beginners-help",
            "snippets",
            "project-showcase",
            "daily-questions"
        ]
    },
    {
        serverName: "C++",
        serverComponents: [
            "general",
            "templates-and-stl",
            "debugging-help",
            "interview-problems",
            "code-review"
        ]
    },
    {
        serverName: "AI-ML",
        serverComponents: [
            "model-training",
            "datasets",
            "research-papers",
            "projects",
            "deployments"
        ]
    },
    {
        serverName: "Gaming",
        serverComponents: [
            "announcements",
            "general-chat",
            "matchmaking",
            "highlights",
            "voice-chat-lobby"
        ]
    },
    {
        serverName: "Linux",
        serverComponents: [
            "shell-scripting",
            "distros",
            "kernel-dev",
            "sysadmin-help",
            "configs-and-dots"
        ]
    },
    {
        serverName: "FullStack",
        serverComponents: [
            "frontend",
            "backend",
            "devops",
            "project-ideas",
            "deployments"
        ]
    },
    {
        serverName: "CyberSecurity",
        serverComponents: [
            "ctf-challenges",
            "beginners",
            "tools",
            "writeups",
            "vulnerabilities"
        ]
    },
    {
        serverName: "Python",
        serverComponents: [
            "general",
            "scripts",
            "automation",
            "django-flask",
            "data-science"
        ]
    },
    {
        serverName: "GoLang",
        serverComponents: [
            "general",
            "goroutines",
            "backend",
            "microservices",
            "projects"
        ]
    },
    {
        serverName: "Rust",
        serverComponents: [
            "borrowing-lifetimes",
            "beginners-help",
            "crates",
            "async",
            "projects"
        ]
    },
    {
        serverName: "TypeScript",
        serverComponents: [
            "general",
            "ts-config",
            "utility-types",
            "react-types",
            "projects"
        ]
    },
    {
        serverName: "DevOps",
        serverComponents: [
            "docker",
            "kubernetes",
            "ci-cd",
            "terraform",
            "monitoring"
        ]
    },
    {
        serverName: "Cloud",
        serverComponents: [
            "aws",
            "gcp",
            "azure",
            "cloud-architectures",
            "certifications"
        ]
    },
    {
        serverName: "Design",
        serverComponents: [
            "ui-ux",
            "figma",
            "design-systems",
            "color-palettes",
            "reviews"
        ]
    },
    {
        serverName: "Blockchain",
        serverComponents: [
            "solidity",
            "smart-contracts",
            "nfts",
            "defi",
            "projects"
        ]
    },
    {
        serverName: "Data Structures",
        serverComponents: [
            "arrays",
            "trees",
            "graphs",
            "dp",
            "system-design"
        ]
    }
];
     const getServerChannels = (selectedServer:string , servers:any)=>{
        const channels = servers.find(server=>server.serverName === selectedServer); 
        return channels.serverComponents;
  }

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
