import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/registerPage.css";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../utils/handleRegister";
import registerUser from "../services/register";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    const PasswordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );
    console.log(email, password, confirmPassword);
    if (
      emailError != null ||
      PasswordError != null ||
      confirmPasswordError != null
    ) {
      alert("Enter the correct credentials");
    } else {
      const res = await registerUser({
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      console.log(res);

      if (!res.error) navigate("/home");
      else alert(res.message);
    }
  };

  useEffect(() => {
    document.body.style.background = "linear-gradient(#353935 , black)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundRepeat = "no-repeat";
    return () => {
      document.body.style.background = "";
    };
  }, []);
  return (
    <div className="form">
      <h1>Register</h1>
      <div className="container">
        <form
          action=""
          onSubmit={(e) => {
            handleRegister(e);
          }}
        >
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
            />
          </div>
          <button className="btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
