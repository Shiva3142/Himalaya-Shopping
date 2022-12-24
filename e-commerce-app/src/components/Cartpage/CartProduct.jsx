import React, { useContext, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { userContext } from '../../App';
import '../css/CartProduct.css'
function CartProduct(object) {
    // console.log(object);
    let [itemCount, updateCount] = useState(object.data.product_count);
    // console.log(itemCount);
    let { state, dispatch } = useContext(userContext)
    async function deleteCartItem(event) {
        try {
            let response=await fetch('/deletecartitem',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    item_id:object.data._id
                })
            })
            // console.log(response);
            // let res=await response.json()
            // console.log(res);
            dispatch({type:"DeleteCartItem"})
            object.updateCart()
        } catch (error) {
            console.log(error);
        }
    }
    async function updateCountOfItems(count) {
        try {
            let response=await fetch('/updatecount',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    item_id:object.data._id,
                    count:count
                })
            })
            // console.log(response);
            // let res=await response.json();
            // console.log(res);
            object.updateCart()
        } catch (error) {
            console.log(error);
        }
    }
    function changeCount(event) {
        updateCount(event.target.value)
        updateCountOfItems(event.target.value)
    }
    return (
        <>
            <div className="cartProductContainer">
                <div className="cartProductImage">
                    <img src={object.data.image} alt="productImage" />
                </div>
                <div className="cartProductDetails">
                    <p className="cartProductName">
                        <NavLink to={`/product/${object.data.pdt_id}`}>{object.data.pdt_name}</NavLink>
                    </p>
                    <p className="productPrice">
                        Price : <sup>₹</sup><span>{object.data.price}</span>
                    </p>
                    <div className="itemcountChange">
                        No. of Items : <select name="itemCount" onChange={changeCount} id="itemCount" value={`${itemCount}`}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <div className="cartProductDeletebtn">
                        <button onClick={deleteCartItem}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartProduct
