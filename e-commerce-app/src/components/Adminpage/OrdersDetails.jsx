import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function OrdersDetails() {
    let [tobedelivereddata, updatetobedelivereddata] = useState(null)
    let [delivereddata, updatedelivereddata] = useState(null)
    async function gettebedelivereddata() {
        try {
            let response = await fetch('/admintobedeliveredproducts', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            // console.log(response);
            let res = await response.json()
            // console.log(res);
            updatetobedelivereddata(res)
        } catch (error) {
            console.log(error);
        }
    }
    async function getdelivereddata() {
        try {
            let response = await fetch('/admindeliveredproducts', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            // console.log(response);
            let res = await response.json()
            // console.log(res);
            updatedelivereddata(res)
        } catch (error) {
            console.log(error);
        }
    }
    function getTimeDate(object) {
        let timestamp=new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0,25)
    }
    useEffect(() => {
        gettebedelivereddata()
        getdelivereddata()
    }, [])

    return (
        <>
            <h1 style={{textAlign:"center"}}>General Data</h1>
            <div className="orderdetailsContainer">
                <div className="tobedeliveredproducts">
                    <h1>List of products to be delivered</h1>
                    <div className="tobedeliveredproductscontainer">
                        {tobedelivereddata !== null ? (<>{
                            tobedelivereddata.map((value, index) => {
                                return (
                                    <div key={index} className="adminproduct">
                                        <div className="adminproductimage">
                                            <img src={value.image} alt="" />
                                        </div>
                                        <div className="adminproductdetail">
                                            <p><NavLink to={`product/${value.pdt_id}`} style={{color:"Black",fontWeight:"BOLD",fontSize:"18px"}}> {value.product_name}</NavLink></p>
                                            <p>price : <sup>₹</sup><strong className="price">{value.price}</strong></p>
                                            <p>number of items: {value.count}</p>
                                            <p>Date of order : {getTimeDate(value.date_of_order)}</p>
                                            <p>Product Transaction ID : {value._id}</p>
                                            <p>Buyer : {value.username} </p>
                                            <p>Buyer Address : {value.useraddress}, {value.pincode}</p>
                                        </div>
                                    </div>
                                )
                            })}

                        </>) : (<></>)}

                    </div>
                </div>
                <div className="deliveredproductdetails">
                    <h1>List of products which are delivered recently</h1>
                    <div className="deliveredproductscontainer">
                        {delivereddata !== null ? (<>
                            {
                                delivereddata.map((value, index) => {
                                    return (<>
                                        <div className="adminproduct">
                                            <div className="adminproductimage">
                                                <img src={value.image} alt="" />
                                            </div>
                                            <div className="adminproductdetail">
                                                <p><NavLink to={`product/${value.pdt_id}`} style={{color:"Black",fontWeight:"BOLD",fontSize:"18px"}}> {value.product_name}</NavLink></p>
                                                <p>price : <sup>₹</sup><strong className="price">{value.price}</strong></p>
                                                <p>number of items: {value.count}</p>
                                                <p>Date of delivery : {getTimeDate(value.date_of_delivery)}</p>
                                                <p>Date of order : {getTimeDate(value.date_of_order)}</p>
                                                <p>Product Transaction ID : {value._id}</p>
                                                <p>Buyer : {value.username} </p>
                                                <p>Buyer Address : {value.useraddress}, {value.pincode}</p>

                                            </div>
                                        </div>
                                    </>)
                                })}
                        </>) : (<></>)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrdersDetails
