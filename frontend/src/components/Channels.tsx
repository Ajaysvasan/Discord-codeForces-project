import "./styles/channels.css"

interface ChannelsInfo{
    channels:string[];
    setSelectedChannel:(name:string)=>void;
}

const Channels = ({ channels,setSelectedChannel }:ChannelsInfo) => {
  console.log("channels:", channels);
  return (
    <nav id="channel-container">
      <h2>Channels</h2>
      {channels.map((name, index) => (
        <div className="channel">
        <button key={index} className="channel-btn" onClick = {()=>setSelectedChannel(name)}>
          {name}
        </button>
        </div>
      ))}
    </nav>
  );
};

export default Channels;
