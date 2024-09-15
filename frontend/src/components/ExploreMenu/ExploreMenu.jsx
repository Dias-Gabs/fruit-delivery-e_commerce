import React from "react";
import './ExploreMenu.css';
import { menu_list } from "../../assets/assets";

const ExplorerMenu = ({category,setCategory}) => {
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore nosso menu</h1>
            <p className="explore-menu-text">Escolha a partir de um menu diversificado com uma deliciosa variedade de pratos. A nossa missão é satisfazer os seus desejos e elevar a sua experiência gastronómica, uma refeição delecius de cada vez.</p>
            
            <div className="explore-menu-list">
                {menu_list.map((item,index) => {
                    return (
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>

                <hr/>

        </div>
    )
}

export default ExplorerMenu
