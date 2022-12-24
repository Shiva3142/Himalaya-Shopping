import React from 'react'
import { NavLink } from 'react-router-dom'

function ShippedProduct(object) {
    function getTimeDate(object) {
        let timestamp = new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0, 25)
    }
    async function undothePackedstatus(event) {
        try {
            let response=await fetch('/undotheshippedstatus',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    id:object.productdata._id
                })
            })
            object.refreshdata()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="packedproductinfo">
                <div className="packagingproductdetails">
                    <div className="adminproduct">
                        <div className="adminproductimage">
                            <img src={object.productdata.image} alt="" />
                        </div>
                        <div className="adminproductdetail">
                            <p><NavLink to={`product/$`} style={{ color: "Black", fontWeight: "BOLD", fontSize: "18px" }}>{object.productdata.product_name}</NavLink></p>
                            <p>price : <sup>₹</sup><strong className="price">{object.productdata.price}</strong></p>
                            <p>number of items : {object.productdata.count}</p>
                            <p>Date of order : {getTimeDate(object.productdata.date_of_order)}</p>
                            <p>Product Transaction ID : {object.productdata._id}</p>
                            <p>Buyer : {object.productdata.username}</p>
                            <p>Shipped at : <span style={{ color: 'red' }}>{getTimeDate(object.productdata.shippingdate)}</span></p>
                            <p >Shipping Note : {object.productdata.isshippednote}</p>
                            <p>Shipped for : <span style={{ color: 'red' }}>{object.productdata.branchname} branch</span></p>
                            <p>Buyer Address : {` ${object.productdata.useraddress} , ${object.productdata.pincode}`}</p>
                        </div>
                    </div>
                </div>
                <div className="undopackedstatus">
                    <button onClick={undothePackedstatus}>Change Status To UnShipped</button>
                </div>
            </div>
        </>
    )
}

export default ShippedProduct
