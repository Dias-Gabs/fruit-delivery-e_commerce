import React, { useContext, useEffect, useState } from "react";
import './LoginPopup.css';
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const {url,setToken} = useContext(StoreContext)
    
    const [currState, setCurrState] = useState("Login");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState==="Login"){
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl,data);

        if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }

    }

    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
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

                    {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Seu nome" required/>}

                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Senha" required />
                </div>
                <button type="submit">{currState==="Registrar-se"?"Criar conta":"Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" id="termos" required />
                    <label htmlFor="termos"> Eu aceito os termos de uso e políticas de privacidade.</label>
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
