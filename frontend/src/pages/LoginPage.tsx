import { useNavigate } from "react-router-dom";
import { useState, useEffect, type FormEvent } from "react";
import "./styles/loginPage.css";
import { validateEmail, validatePassword } from "../utils/handleLogin";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
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

  const isValidUser = () => {
    //needs the implementation of DB
    if (userName) return true;
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(email + "\n" + password + "\n" + userName);
    const passwodError: string | null = validatePassword(password);
    if (email !== "") {
      const emailError: string | null = validateEmail(email);
      if (emailError == null && passwodError == null) {
        // also need to check if the user exsists in the DB or not
        navigate("/home");
      } else {
        alert("The entered email or password is wrong");
      }
    } else {
      console.log("inside the else part ");
      const userExsists = isValidUser();
      if (passwodError == null && userExsists) {
        // also need to check if the user exsists in the DB or not
        navigate("/home");
      } else {
        alert("The user name or password entered is wrong");
      }
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <div className="container">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username /email"
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
