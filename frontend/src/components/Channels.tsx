import "./styles/channels.css"
const Channels = ({ channels }: { channels: string[] }) => {
  console.log("channels:", channels);

  return (
    <nav id="channel-container">
      <h2>Channels</h2>
      {channels.map((name, index) => (
        <div className="channel">
        <button key={index} className="channel-btn">
          {name}
        </button>
        </div>
      ))}
    </nav>
  );
};

export default Channels;
