import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function TransactionSearch() {
    let [transactionId, updateTransactionId] = useState()
    let [transactionData, updateTransactionData] = useState(null)
    let [showdata, updateshowdata] = useState(0)
    async function getTransactiondata() {
        try {
            let response = await fetch('/gettransactiondata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    pdt_transaction_id: transactionId
                })
            })
            // console.log(response);
            let res = await response.json()
            // console.log(res);
            if (res.length>0) {
                updateTransactionData(res)
            }else{
                updateTransactionData(null)
            }
        } catch (error) {
            console.log(error);
            updateTransactionData(null)
        }
    }
    return (
        <>
            <h1 style={{textAlign:"center"}}>For Particuler Transaction Search</h1>
            <div className="transactionsearch">
                <div className="transactionentryInput">
                    <input type="text" name="id" id="transactionId" placeholder="Enter the Product Transaction Id" value={transactionId} onChange={(event) => {
                        updateTransactionId(event.target.value)
                    }} required />
                    <button onClick={() => {
                        getTransactiondata()
                        updateshowdata(1)
                    }}><i class="fas fa-search"></i></button>
                </div>
                {showdata === 1 ? (
                    <div className="productDetails">
                        {transactionData !== null ? (<>{
                            transactionData.map((value, index) => {
                                return (<>
                                    <div className="adminproduct">
                                        <div className="adminproductimage">
                                            <img src={value.image} alt="" />
                                        </div>
                                        <div className="adminproductdetail">
                                            <p><NavLink to={`product/${value.pdt_id}`} style={{ color: "Black", fontWeight: "BOLD", fontSize: "18px" }}> {value.product_name}</NavLink></p>
                                            <p>price : <sup>₹</sup><strong className="price">{value.price}</strong></p>
                                            <p>number of items: {value.count}</p>
                                            <p>Date of order : {value.date_of_order.slice(0, 10)}</p>
                                            <p>Product Transaction ID : {value._id}</p>
                                            <p>Buyer : {value.username} </p>
                                            <p>Buyer Address : {value.useraddress}, {value.pincode}</p>
                                            {value.deliveryStatus === true ? (<><p>Date of delivery : {value.date_of_delivery.slice(0, 10)}</p>
                                                <p>Delivered By : {value.delivered_by}</p></>
                                            ) : (<p style={{ color: "coral" }}>Yet to be Delivered</p>)}
                                        </div>
                                    </div>
                                </>)
                            })}
                        </>) : (<>
                            <div className="transactiondatanotFound">
                                📅 Data Not Found 📅</div>
                        </>)}
                    </div>
                ) : (<></>)}
            </div>
        </>
    )
}

export default TransactionSearch
