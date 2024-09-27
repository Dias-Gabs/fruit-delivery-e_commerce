// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount, url} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Nome</p>
          <p>Preço</p>
          <p>Quantidade</p>
          <p>Total</p>
          <p>Remover</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return (
              <div className="cart-items-title cart-items-item" key={item._id}>
                <img src={url+"/images/"+item.image} alt=""/>
                <p>{item.name}</p>
                <p>R${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>R${item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
            )
          }
        })}
      </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Total do carrinho</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Frete</p>
              <p>R${getTotalCartAmount()===0?0:5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>R${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>

            <div>
              <button onClick={()=>navigate('/order')}>CONTINUAR PEDIDO</button>
            </div>

          </div>
          <div className="cart-promocode">
            <div>
              <p>Se possuir código promocional, insira aqui</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Código promocional"/>
                <button>Confirmar</button>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Cart