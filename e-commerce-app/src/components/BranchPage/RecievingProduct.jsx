import React, { useState } from 'react'

function RecievingProduct(object) {
    // console.log(object);
    function getTimeDate(object) {
        let timestamp = new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0, 25)
    }
    async function updatebranchreachingstatus() {
        try {
            let response = await fetch('/updatebranchrecievedstatus', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    ids: [object.productdata._id]
                })
            })
            // updatenoteinput(0)
            object.refreshdata()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="packagingproductsection">
                <div className="branchproductcontainer">
                    {/* <div className="packagingproductdetails"> */}
                    <div className="branchhomeproduct">
                        <div className="adminproductdetail">
                            <p>Product Transaction ID : {object.productdata._id}</p>
                            <p>price : <sup>₹</sup><strong className="price">{object.productdata.price}</strong></p>
                            <p>number of items : {object.productdata.count}</p>
                            <p>Date of order : {getTimeDate(object.productdata.date_of_order)}</p>
                            {/* <p>Buyer : {object.productdata.username}</p> */}
                            <p>Shipped at : <span style={{ color: 'red' }}>{getTimeDate(object.productdata.shippingdate)}</span></p>
                            <p>Shipped for : <span style={{ color: 'red' }}>{object.productdata.branchname} branch</span></p>
                            <p><span style={{ color: 'red' }}>Not Yet Recieved</span></p>
                            <p>Buyer Address : {` ${object.productdata.useraddress} , ${object.productdata.pincode}`}</p>
                        </div>
                    </div>
                    <div className="undopackedstatus">
                    <button onClick={updatebranchreachingstatus}>Change Status To Recieved To Branch</button>
                </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default RecievingProduct
