const Channels = ({ channels }: { channels: string[] }) => {
  console.log("channels:", channels);

  return (
    <nav id="server-container">
      <h2>Server components</h2>

      {channels.map((name, index) => (
        <a key={index} className="channel" href="#">
          {name}
        </a>
      ))}
    </nav>
  );
};

export default Channels;
