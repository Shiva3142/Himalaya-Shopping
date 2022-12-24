import React, { useContext, useEffect, useState } from 'react'
import CartProduct from './CartProduct'
import '../css/CartContent.css'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router'
import { checkoutContext } from '../../App'
function CartContent() {
    let { checkout, checkoutdispatch } = useContext(checkoutContext)
    let history = useHistory()
    let [cartContent, updateCartContent] = useState(null)
    let [subtotal, updatesubtotal] = useState({
        itemsCount: null,
        totalPrice: null
    })
    async function getcartData() {
        try {
            let response = await fetch('/getcartdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application /json"
                }
            })
            // console.log(response);
            let data = await response.json()
            // console.log(data);
            if (response.status === 200) {
                updateCartContent(data)
                let itemcount = 0;
                let price = 0
                data.forEach((value) => {
                    itemcount = itemcount + value.product_count;
                    price = price + value.product_count * value.price
                });
                updatesubtotal({ itemsCount: itemcount, totalPrice: price })
                // console.log(itemcount);
                // console.log(subtotal);
            } else {
                updateCartContent("none")
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getcartData()
    }, [])
    function updateCartData() {
        // console.log("from cart content");
        getcartData()
    }
    return (
        <>
            {(cartContent !== null) ? ((cartContent !== "none") ? (<><div className="cartContainer">
                <div className="CartProducts">
                    {cartContent.map((value, index) => {
                        return (<CartProduct data={value} key={index} updateCart={updateCartData} />)
                    })}
                </div>
                <div className="cartSubtotal">
                    <h2>Subtotal</h2>
                    <p>No. Of Items : {subtotal.itemsCount}</p>
                    <h3>Amount : <sup>₹</sup><span>{subtotal.totalPrice}</span></h3>
                    <div className="checkOutbtn">
                        <button onClick={() => {
                            checkoutdispatch({ type: "CHECKOUT", checkout: true })
                            history.push('/checkout')
                        }}>Checkout</button>
                    </div>
                </div>
            </div></>) : (<>
                <div className="cartDataNotFound">
                    <h1>🛒 Your Shopping Cart Is Empty 🛒</h1>
                    <h2>¯\_(ツ)_/¯</h2>
                </div>
            </>)) : (<>
                <div className="loaderContainer">
                    <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                    <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                    <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                    loading...
                </div>
            </>)}
        </>
    )
}

export default CartContent
