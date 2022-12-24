import React, { useState } from 'react'

function ComfirmDelivery(object) {
    let [otpformtoggle, updateotpformtoggtl] = useState(0)
    let [otp, updateotp] = useState("")
    async function finaldeliveryvarification() {
        if (otp!=="") {
            try {
                let response = await fetch('/finaldeliveryvarification', {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        transaction_id: object.data.transaction_id,
                        deliveryid: object.data._id,
                        otp: otp
                    })
                })
                console.log(response);
                if (response.status === 200) {
                    updateotpformtoggtl(0)
                    object.updatefinaldeliverydata()
                } else if (response.status === 403) {
                    window.alert('wrong otp')
                }
                else {
    
                    window.alert('some error occurred')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            window.alert('Please fill the otp')
        }
    }
    return (
        <>
            <div className="branchhomeproduct comfirmdetails">
                <div className="adminproductdetail">
                    <p>Product Transaction ID : {object.data.transaction_id}</p>
                    <p>Collecting Person Name : {object.data.deliveredto}</p>
                    <p>Payment Mode : {object.data.paymentmode === "Cash" ? (<>Cash On Delivery</>) : (<>Prepaid</>)}</p>
                    <p>Amount : <sup>₹</sup><strong className="price" style={{ color: "red" }}>{object.data.deliveryamount}</strong></p>
                    <p>number of items : <span style={{ color: "red" }}>{object.data.deliverycount}</span> </p>
                    <p>sended from : {object.data.deliveryhubname} Hub</p>
                    <p>Buyer Address : {` ${object.data.deliveryaddress} , ${object.data.deliverypincode}`}</p>
                </div>
                <button className="comfirmdeliverybutton" onClick={() => {
                    updateotpformtoggtl(1)
                }}>Comfirm Delivery</button>
            </div>
            {
                otpformtoggle === 1 ? (
                    <>
                        <div className="finaldeliveryotpcontainer">
                            <div className="otpcontainerform">
                                <i className="fas fa-times" onClick={() => {
                                    updateotpformtoggtl(0)
                                }}></i>
                                <p>Please Ask Customer for final OTP and enter below</p>
                                <input type="number" name="otp" id="otp" placeholder="Enter OTP" value={otp} onChange={(event) => {
                                    updateotp(event.target.value)
                                }} />

                                {
                                    object.data.paymentmode === "Cash" ? (<>
                                        <p>Before Submitting Product/Products ,
                                        </p>
                                        <p>

                                            Please Take Payment of amount : <span style={{ color: "red" }}>{object.data.deliveryamount}</span></p>
                                    </>) : (<>
                                    </>)
                                }
                                <button onClick={finaldeliveryvarification}>Submit</button>
                            </div>
                        </div>

                    </>
                ) : (
                    <>

                    </>
                )
            }
        </>
    )
}

export default ComfirmDelivery
