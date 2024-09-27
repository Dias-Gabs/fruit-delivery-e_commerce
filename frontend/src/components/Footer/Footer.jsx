import React from "react";
import './Footer.css'
import { assets } from "../../assets/assets";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>Na Fruit Fresh, acreditamos que o frescor é essencial para uma vida saudável. Por isso, trabalhamos todos os dias para garantir que as melhores frutas cheguem até você com qualidade e sabor incomparáveis. Do campo direto para a sua mesa, nossa missão é levar saúde e bem-estar a cada entrega.</p>
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