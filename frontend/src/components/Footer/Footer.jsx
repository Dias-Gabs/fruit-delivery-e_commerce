import React from "react";
import './Footer.css'
import { assets } from "../../assets/assets";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias at fugit quis? Cupiditate pariatur quam corrupti libero odio repellendus, cum hic assumenda error eos dignissimos ullam at! Nesciunt, numquam adipisci!</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-center">
                  <h2>Companhia</h2>
                   <ul>
                       <li>Home</li>
                        <li>Sobre</li>
                        <li>Delivery</li>
                        <li>Política e Termos</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>NOS CONTATE</h2>
                    <ul>
                        <li>+55 (19) 99988-8888</li>
                        <li>contact@fruitfresh.com</li>
                    </ul>
                </div>
            </div>

            <hr />
            <p className="footer-copyright">Copyright 2024 © FruitFresh.com - Todos os Direitos Reservados.</p>
         </div>

    )
}

export default Footer