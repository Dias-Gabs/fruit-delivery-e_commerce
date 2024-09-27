import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../../assets/assets'
import { Form } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image,setImage] = useState(false);

  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  useEffect(()=>{
    console.log(data);
  },[data])

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    // formData.append("image",data.image)
    if(image){
      formData.append('image', image);
    }
    
    const response = await axios.post(`${url}/api/food/add`,formData);
    if (response.data.success) {
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }
  }  

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Enviar imagem</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Nome do produto</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Digite aqui'/>
        </div>

        <div className="add-product-description flex-col">
          <p>Descrição do produto</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="10" placeholder='Escreva o conteúdo aqui'></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Categoria do produto</p>
            <select onChange={onChangeHandler} value={data.category} name='category'>
              <option value="Verduras">Saladas</option>
              <option value="Legumes">Vegetais</option>
              <option value="Frutas">Frutas</option>
              <option value="Castanhas">Nozes e Castanhas</option>
              {/* <option value="Temperos">Temperos e Especiárias</option> */}
              <option value="Frios">Frios</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Diversos">Diveros</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Preço do produto</p>
            <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='$'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>Adicionar</button>
      </form>
    </div>
  )
} 

export default Add
