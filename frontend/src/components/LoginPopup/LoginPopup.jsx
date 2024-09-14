import React, { useState } from "react";
import './LoginPopup.css'
import { assets } from "../../assets/assets";

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Login")
    
    return(
        <div className="login-popup">
            
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState==="Login"?<></>:<input type="text" placeholder="Seu nome" required/>}
                    <input type="email" placeholder="Email" required/>
                    <input type="password" placeholder="Senha" required/>
                </div>
                <button>{currState==="Registrar-se"?"Criar conta":"Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>Ao aceitar, eu declaro que concordo com os termos de uso e políticas de privacidade</p>
                </div>
                {currState==="Login"}
                <p>Criar uma nova conta? <span onClick={()=>setCurrState("Registre-se")}>Clique aqui</span>.</p>
                <p>Já possui conta? <span onClick={()=>setCurrState("Login")}>Faça login aqui</span>.</p>
            </form>

        </div>
    )
}

export default LoginPopup