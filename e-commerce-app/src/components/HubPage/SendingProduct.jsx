import React, { useState } from 'react'

function SendingProduct(object) {
    // console.log(object);
    function getTimeDate(object) {
        let timestamp = new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0, 25)
    }
    let [deliveryboyslist, updatedeliveryboyslist] = useState(null)
    let [showdeliveryboyslist, hidedeliveryboyslist] = useState(0)
    let [deliverboy, updatedeliverboy] = useState(
        {
            name: null,
            id: null
        }
    )
    async function updatehubsendingstatus() {
        // console.log(deliverboy);
        try {
            let response = await fetch('/updatehubsendingstatus', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    id: object.productdata._id,
                    willdeliveredby: deliverboy.name,
                    deliveryboyid: deliverboy.id
                })
            })
            object.refreshdata()
        } catch (error) {
            console.log(error);
        }
    }
    function getdeliveryboyname(event) {
        let checkedvalue = document.querySelector('input[name="deliveryboy"]:checked')
        // console.log(checkedvalue.value);
        if (checkedvalue === null) {
            return null
        } else {
            return checkedvalue.value
        }
    }
    function choosedeliveryboy() {
        let deliveryboyname = getdeliveryboyname()
        // updatedeliverboy(deliveryboyname)
        // console.log(deliveryboyname);
        if (deliveryboyname === null) {
            window.alert('plaese choose delivery boy')
        } else {
            updatehubsendingstatus()
            hidedeliveryboyslist(0)
        }
    }
    async function getdeliveryboys() {
        try {
            let response = await fetch('/getdeliceryboyslisttodeliver', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    pincode: object.productdata.pincode
                })
            })
            let result = await response.json()
            console.log(result);
            updatedeliveryboyslist(result)
            hidedeliveryboyslist(1)
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
                            <p>Reached at : <span style={{ color: 'red' }}>{getTimeDate(object.productdata.nearreachingdate)}</span></p>
                            <p>Buyer Address : {` ${object.productdata.useraddress} , ${object.productdata.pincode}`}</p>
                        </div>
                    </div>
                    <div className="undopackedstatus">
                        <button onClick={getdeliveryboys}>Change Status to Out for Delivery</button>
                    </div>
                </div>
            </div>
            {
                deliveryboyslist === null ? (
                    <></>
                ) : (
                    <>
                        {showdeliveryboyslist === 1 ? (
                            <>
                                <div className="deliveryboyslistcontainer">

                                    <div className="choosedeliveryboys">
                                        <i className="fas fa-times" onClick={() => {
                                            hidedeliveryboyslist(0)
                                        }}></i>

                                        {
                                            deliveryboyslist.list.map((value, index) => {
                                                // console.log(value.name);
                                                return (
                                                    <>
                                                        <label htmlFor={value.id}>
                                                            <input type="radio" name="deliveryboy" id={value.id} onClick={(event) => {
                                                                updatedeliverboy({ name: event.target.value, id: event.target.id })
                                                            }} value={value.name} />
                                                            <div className="deliveryboy">
                                                                <span>{value.name}</span><span>current no. of orders : {value.ordernumbers}</span>
                                                            </div>
                                                        </label>
                                                    </>
                                                )
                                            })
                                        }
                                        <button onClick={choosedeliveryboy}>Choose</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </>
                )
            }

            {/* </div> */}
        </>
    )
}

export default SendingProduct
