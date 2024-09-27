// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {

//   const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

//   const [data,setData] = useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     street:"",
//     city:"",
//     state:"",
//     zipcode:"",
//     country:"",
//     phone:"",
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data=>({...data,[name]:value}))
//   }

//   // useEffect(()=>{
//   //   console.log(data);
//   // },[data])

//   const placeOrder = async (event) => {
//     event.preventDefault();
//     let orderItems = [];
//     food_list.map((item)=>{
//       if(cartItems[item._id]>0){
//         let itemInfo = item;
//         itemInfo["quantity"] = cartItems[item._id];
//         orderItems.push(ItemInfo);
//       }
//     })
//     console.log(orderItems);

//     let orderData = {
//       address:data,
//       items:orderItems,
//       amount:getTotalCartAmount()+2,
//     }
//     let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
//     if(response.data.success) {
//       const {session_url} = response.data;
//       window.location.replace(session_url)
//     }
//     else {
//       alert("Erro");
//     }
//   }

//   const navigate = useNavigate();

//   useEffect(()=>{
//     if(!token){
//       navigate('/cart');
//     }
//     else if(getTotalCartAmount()===0){
//       navigate('/cart')
//     }
//   },[token])

//   return (
    
//     <form onSubmit={placeOrder} className='place-order'>

//     <div className="place-order-left">
//       <p className='title'>Informações de Entrega</p>
//       <div className="multi-field">
//         <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Primeiro nome' />
//         <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Sobrenome' />
//       </div>

//       <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
//       <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Endereço' />

//       <div className="multi-fields">
//         <input required name="cep" onChange={onChangeHandler} value={data.cep} type="text" placeholder='CEP'/>
//         <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='Cidade'/>
//         <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='País' />
//       </div>
//       <input required name="contact" onChange={onChangeHandler} value={data.contact} type="text" placeholder='Contato' />
//     </div>

//     <div className="place-order-right">
//     <div className="cart-total">
//             <h2>Total do carrinho</h2>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Frete</p>
//               <p>R${getTotalCartAmount()===0?0:5}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>R${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
//             </div>

//             <div>
//               <button type='submit' onClick={()=>navigate('/order')}>FINALIZAR PEDIDO</button>
//             </div>

//           </div>
//     </div>

//     </form>

//   )
// }

// export default PlaceOrder

// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",  // Ensure this is included if used
    zipcode: "", // Ensure this is included if used
    country: "",
    phone: "",   // Ensure this is included if used
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    console.log(orderItems);

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Erro");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Informações de Entrega</p>
        <div className="multi-field">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Primeiro nome' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Sobrenome' />
        </div>
        
        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' />
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Endereço' />
        
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='CEP'/>
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='Cidade'/>
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='País' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Contato' />
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
            <p>R${getTotalCartAmount() === 0 ? 0 : 5}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>R${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>

          <div>
            <button type='submit'>FINALIZAR PEDIDO</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
