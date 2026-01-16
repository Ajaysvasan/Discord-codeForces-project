import { useNavigate } from "react-router-dom";
import { useState, useEffect, type FormEvent } from "react";
import "./styles/loginPage.css";
import { validateEmail, validatePassword } from "../utils/handleLogin";
import { loginUser } from "../services/authServive";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.background = "linear-gradient(#353935 , black)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundRepeat = "no-repeat";
    return () => {
      document.body.style.background = "";
    };
  }, []);
  const handleUserName = (value: string) => {
    if (validateEmail(value) == null) {
      setEmail(value);
    } else {
      setUserName(value);
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const passwodError: string | null = validatePassword(password);
    const emailError: string | null = validateEmail(email);
    if (passwodError) {
      setError(passwodError);
      return;
    } else if (emailError && email != "") {
      setError(emailError);
      return;
    }
    // also need to check if the user exsists in the DB or not
    isLoading(true);
    const response = await loginUser({
      identifier: email,
      password: password,
    });
    console.log(response);
    if (!response.error) {
      // also need to check if the user exsists in the DB or not
      isLoading(false);
      navigate("/home");
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <div className="container">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-box">
            <input
              type="email"
              placeholder="email"
              required
              onChange={(e) => handleUserName(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn">Login</button>
          <div className="register">
            <label htmlFor="">New user: </label>
            <a href="register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
