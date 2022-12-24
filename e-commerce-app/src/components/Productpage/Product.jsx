import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../templates/Header'
import '../css/Product.css'
import Loader from 'react-loader-spinner'
import { userContext } from '../../App'
import Footer from '../templates/Footer'
import StarPrinting from '../templates/StarPrinting'

function Product() {
    let { pdt_id } = useParams()
    let [image, updateimage] = useState(1)
    let [pdtData, updatePdtData] = useState(null)
    let { state, dispatch } = useContext(userContext)
    async function getData(object) {
        try {
            let response = await fetch('/getproductdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    product_id: pdt_id
                })
            })
            let data = await response.json();
            // console.log(response);
            // console.log(data);
            if (response.status === 200) {
                // console.log(data._id);
                updatePdtData(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [])
    async function addToCart(event) {
        // console.log(pdt_id);
        if (state.user === true) {
            try {
                let responce = await fetch('/addtocart', {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        product_id: pdt_id
                    })
                })
                // console.log(responce);
                let res = await responce.json()
                // console.log(res);
                if (responce.status === 200) {
                    dispatch({type:"AddCartItem"})
                    window.alert('added to cart successfully')
                }
                else if (responce.status === 409) {
                    window.alert('Item is already exit in cart ,\nif you wants to change the count of the products please go to cart ')
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {
            window.alert('Please First Login and Try again')
        }
    }
    return (
        <>
            <Header />
            {(pdtData !== null) ?
                (<>
                    <div className="productContainer">
                        <div className="productImageContainer">
                            <div className="productImageoptions">
                                <div className="productimageOption" onClick={() => {
                                    updateimage(1)
                                }}>
                                    <img src={pdtData.product_data.images.img1} alt="" />
                                </div>
                                <div className="productimageOption" onClick={() => {
                                    updateimage(2)
                                }}>
                                    <img src={pdtData.product_data.images.img2} alt="" />
                                </div>
                                <div className="productimageOption" onClick={() => {
                                    updateimage(3)
                                }}>
                                    <img src={pdtData.product_data.images.img3} alt="" />
                                </div>
                            </div>
                            <div className="productMainImage">
                                {(image === 2 || image === 1) ? ((image === 1) ? (<img src={pdtData.product_data.images.img1} alt="" />) : (<img src={pdtData.product_data.images.img2} alt="" />)) : (<img src={pdtData.product_data.images.img3} alt="" />)}
                            </div>
                        </div>
                        <div className="productInfo">
                            <div className="pdtinfo">
                                <h2>{pdtData.product_data.pdt_name}</h2>
                                <p>Price : <sup>₹</sup><span>{pdtData.product_data.price}</span></p>
                            </div>
                            <div className="cartbtn">
                                <button onClick={addToCart}>Add to Cart</button>
                            </div>
                            <div className="pdtdescription">
                                <h4>Description :</h4>
                                <p>
                                    {pdtData.product_data.pdt_desc}
                                </p>
                            </div>
                            <div className="pdtSpecification">
                                <h4>Specification : </h4>
                                <ul className="specificationlist">
                                    {
                                        Object.keys(pdtData.product_data.specefications).map((value, index) => {
                                            return (<li key={index}><span className="key">{value}</span><span className="value">{pdtData.product_data.specefications[value]}</span></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="ProductRating">
                                <h4>Rating : </h4>
                                <div className="ratingcontainer">
                                    <div>
                                        <StarPrinting rating={pdtData.product_data.rating} />
                                    </div>
                                    <div>
                                        Overall Rating : {Math.round((pdtData.product_data.rating * 10)) / 10}/5
                                    </div>
                                </div>
                            </div>
                            <div className="pdtreviews">
                                <h4>Reviews : </h4>
                                {
                                    pdtData.review_data !== null ? (
                                        <>
                                            {
                                                pdtData.review_data.map((value, index) => {
                                                    // console.log(value);
                                                    return (
                                                        <div key={index}>
                                                            <div className="userreview" >

                                                                <div className="reviewusername">
                                                                    <img src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" alt="" />
                                                                    <h4>{value.username}</h4>
                                                                    <span className="lighttext">{value.feedbackDate.slice(0, 15)}</span>
                                                                </div>
                                                                <div className="rating">
                                                                    <StarPrinting rating={value.stars} />
                                                                </div>
                                                                <p className="userreviewdesc">
                                                                    {value.feedbackdesc}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    ) :
                                        (
                                            <>
                                                <h3 className="noreviews">
                                                    🙇‍♀️ Sorry No Reviews Yet 🙇‍♀️
                                                </h3>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </>) : (<> 
                <div className="loaderContainer">
                    <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                    <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                    <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                </div>
                </>)
            }
            <Footer />

        </>
    )
}

export default Product
