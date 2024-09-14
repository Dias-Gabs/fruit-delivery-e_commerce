// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

export const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("home");

  return (
    <div className='navbar'>
      {/* <img src={assets.logo} className='logo'/> */}
      {/* <ul className='navbar-menu'>
        <li onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</li>
        <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</li>
        <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contato</li>
      </ul> */}

      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explorer-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-App</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contato</a>
      </ul>


      <div className='navbar-right'>
        
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <img src={assets.basket_icon} alt="" />
          <div className='dot'></div>
        </div>

        <div>
          <button onClick={()=>setShowLogin(true)}>Entrar</button>
        </div>
      
      </div>

    </div>
  )
}

export default Navbar
