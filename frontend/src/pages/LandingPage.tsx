import { useNavigate } from "react-router-dom";
import { useState } from "react";
const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginPage, setLoginPage] = useState(false);
  const [isRegisterPage, setRegisterPage] = useState(false);
  const handleLoginClick = () => {
    setLoginPage(true);
    setRegisterPage(false);
    if (isLoginPage) {
      navigate("/login");
    }
  };

  const handleRegisterClick = () => {
    setLoginPage(false);
    setRegisterPage(true);
    if (isRegisterPage) {
      navigate("/register");
    }
  };
  return (
    <>
      <div className="nav-bar">
        <button onClick={() => handleLoginClick()}>login</button>
        <button onClick={() => handleRegisterClick()}>register</button>
      </div>
    </>
  );
};
export default LandingPage;
