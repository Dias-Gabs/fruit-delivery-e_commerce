import React, { useState } from "react";
import './LoginPopup.css';
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        className={currState === "Login" ? "margin-login" : "margin-register"}
                        src={assets.cross_icon}
                        alt="Fechar"
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Registrar-se" && (
                        <input type="text" placeholder="Seu nome" required />
                    )}
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Senha" required />
                </div>
                <div className="login-popup-condition">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms"> Eu aceito os termos de uso e políticas de privacidade.</label>
                </div>
                <button type="submit">{currState === "Registrar-se" ? "Criar conta" : "Login"}</button>
                <p>
                    {currState === "Registrar-se" 
                        ? "Já possui conta? " 
                        : "Criar uma nova conta? "}
                    <span onClick={() => setCurrState(currState === "Registrar-se" ? "Login" : "Registrar-se")}>
                        {currState === "Registrar-se" ? "Faça login aqui" : "Clique aqui"}
                    </span>.
                </p>
            </form>
        </div>
    );
}

export default LoginPopup;
