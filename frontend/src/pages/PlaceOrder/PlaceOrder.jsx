// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    
    <form className='place-order'>

    <div className="place-order-left">
      <p className='title'>Informações de Entrega</p>
      <div className="multi-field">
        <input type="text" placeholder='Primeiro nome' />
        <input type="text" placeholder='Sobrenome' />
      </div>

      <input type="email" placeholder='Email' />
      <input type="text" placeholder='Endereço' />

      <div className="multi-fields">
        <input type="text" placeholder='CEP'/>
        <input type="text" placeholder='País' />
      </div>
      <input type="text" placeholder='Contato' />
    </div>

    <div className="place-order-right">
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
              <button onClick={()=>navigate('/order')}>FINALIZAR PEDIDO</button>
            </div>

          </div>
    </div>

    </form>

  )
}

export default PlaceOrder