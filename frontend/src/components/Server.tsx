import "../App.css";
import "./styles/server.css";

interface ServerProps {
  server: string;
  onSelectedServer: (name: string) => void;
}

const Server = ({ server, onSelectedServer }: ServerProps) => {
  const handleClick = () => onSelectedServer(server);

  return (
    <div className="server">
      <button className="server-btn" onClick={handleClick}>
        {server}
      </button>
    </div>
  );
};
export default Server;
