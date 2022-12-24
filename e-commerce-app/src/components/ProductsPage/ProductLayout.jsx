import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/ProductCard.css'
import StarPrinting from '../templates/StarPrinting'

function ProductLayout(object) {
    return (
        <>
            <div className="Productcard">
                <div className="Productcontainer">
                    <div className="Productimg">
                        <img src={object.pdtImage} alt=""/>
                    </div>
                    <div className="ProductInfo">
                        <p><NavLink to={`/product/${object.pdtId}`}>{object.pdtName} </NavLink></p>
                        <p><sup>₹</sup><strong className="price">{object.pdtPrice}</strong></p>
                    </div>
                    <div className="rating">
                        <StarPrinting rating={object.rating}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductLayout
