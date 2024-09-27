import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  const { getTotalCartAmount,token,setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
    navigate("/");
  }

  // Função que será chamada ao clicar no ícone de pesquisa
  const handleSearch = () => {
    if (searchTerm) {
      console.log(`Procurando por: ${searchTerm}`);
      // Aqui você pode redirecionar o usuário para a página de resultados de busca
      // ou realizar qualquer ação de pesquisa no front ou backend
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className='logo' /></Link>

      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contato</a>
      </ul>

      <div className='navbar-right'>
        <div className='navbar-search'>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button onClick={handleSearch}>
            <img src={assets.search_icon} alt="Search Icon" />
          </button>
        </div>
        
        <div className='navbar-search-icon'>
          <Link to='/cart'> <img src={assets.basket_icon} alt="Basket Icon" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token?<button onClick={() => setShowLogin(true)}>Entrar</button>
        :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className='nav-profile-dropdown'>
              <li><img onClick={()=>navigate('/myorders')} src={assets.bag_icon} alt=""/></li>
              <hr />
              <li onClick={logout} ><img src={assets.logout_icon} alt=""/></li>
            </ul>
        </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
