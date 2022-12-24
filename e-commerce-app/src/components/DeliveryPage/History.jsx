import React, { useEffect, useState } from 'react'

function History() {
    let [deliveryassigndata, updatedeliveryassigndata] = useState(null)
    async function getdeliveredproductfordeliveredproduct() {
        try {
            let response = await fetch('/getdeliveredproductfordeliveredproduct', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            if (response.status === 200) {
                let result = await response.json()
                console.log(result);
                updatedeliveryassigndata(result)
            } else {
                window.alert('error occured')
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getdeliveredproductfordeliveredproduct()
    },[])
    return (
        <>

            <h1 style={{ textAlign: "center" }}>Products that Delivered by You</h1>
            {
                deliveryassigndata === null ? (

                    <>
                    </>
                ) : (<>
                    <div className="deliverryassignpagadata">
                        {
                            deliveryassigndata.length === 0 ? (
                                <>
                                    <h1 style={{ textAlign: "center" }}>🤔 None Of The Products are Delivered by You Yet 🤔</h1>

                                </>
                            ) : (

                                <>
                                    <div className="deliveryproductcontainer">
                                        {
                                            deliveryassigndata.map((value, index) => {
                                                return (
                                                    <div key={index} className="branchhomeproduct">
                                                        <div className="adminproductdetail">
                                                            <p>Product Transaction ID : {value.transaction_id}</p>
                                                            <p>Payment Mode : {value.paymentmode === "Cash" ? (<>Cash On Delivery</>) : (<>Prepaid</>)}</p>
                                                            <p>Amount : <sup>₹</sup><strong className="price">{value.deliveryamount}</strong></p>
                                                            <p>number of items : {value.deliverycount}</p>
                                                            <p>sended from : <span style={{ color: 'red' }}>{value.deliveryhubname} Hub</span></p>
                                                            <p>Buyer Address : {` ${value.deliveryaddress} , ${value.deliverypincode}`}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                </>
                            )
                        }
                    </div>
                </>)
            }
        </>
    )
}

export default History
