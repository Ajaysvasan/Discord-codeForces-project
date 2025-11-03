import '../styles/formPage.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const LoginPage = ()=>{
    const navigate = useNavigate();

    useEffect(()=>{
        document.body.style.background = "linear-gradient(135deg, #656579 60%, #b5a7ff 100%)";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundRepeat = "no-repeat";
        return()=>{
            document.body.style.background = "";
        };
    } , []);
        
    const validEmail = ()=>{
        console.log("Hello");
    }

    const validPassword = ()=>{
        console.log("world ");
    }

    const handleLogin = (e:React.FormEvent)=>{
        e.preventDefault();
        navigate("/home");
    }

    return(
        <div className="form">
            <h1>Login</h1>
            <div className="container" >
                <form action="">
                    <div className="input-box">
                        <input type="text" placeholder='Username ' required onBlur={validEmail}/>
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='password' required minLength={6} onBlur={validPassword}/>
                    </div>
                    <button className="btn" onClick = {handleLogin}>Login</button>
                    <div className="register">
                        <label htmlFor="">New user: </label>
                        <a href="register">Register</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
