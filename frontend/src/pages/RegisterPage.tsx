import "../styles/formPage.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = ()=>{
    const navigate = useNavigate();
    const handleRegister = (e:React.FormEvent)=>{
      e.preventDefault();
      navigate("/home")
    }
    useEffect(()=>{
            document.body.style.background = "linear-gradient(135deg, #656579 60%, #b5a7ff 100%)";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundRepeat = "no-repeat";
            return()=>{
                document.body.style.background = "";
            };
        } , []);

  return(
    <div className="form">
      <h1>Register</h1>
      <div className="container">
        <form action="">
          <div className="input-box">
            <input type="text" placeholder="Username" required/>
          </div>
          <div className="input-box">
            <input type="email" placeholder="email" required/>
          </div>
          <div className="input-box">
            <input type="password" placeholder="password" required minLength={6}/>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm password" required minLength={6}/>
          </div>
            <button className="btn" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
