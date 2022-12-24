import React, { useEffect, useState } from 'react'
import Loginpage from './Loginpage';
import '../css/DeliveryPage.css'
import ComfirmDelivery from './ComfirmDelivery';
import History from './History';

function DeliveryPage() {
    let [pagetoggle, updateagetoggle] = useState(0)
    let [authenicateuser, updateauthenicateuser] = useState(0)
    let [deliveryassigndata, updatedeliveryassigndata] = useState(null)
    let [username, updateusername] = useState("")
    let [shownavbar, updateshonavbar] = useState(1)
    async function authenicatedeliverboy() {
        try {
            let response = await fetch('/authenicatedeliverboy', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            console.log(response);
            if (response.status === 200) {
                let result = await response.json()
                console.log(result);
                updateusername(result.name)
                updateauthenicateuser(1)
                getdeliveryassigndata()
                if (window.innerWidth < 768) {
                    updateshonavbar(0)
                }
            } else {
                updateauthenicateuser(0)

            }
        } catch (error) {
            console.log(error);
        }
    }
    function hidenavbar() {
        if (window.innerWidth < 768) {
            hidenavbar(0)
        } else {

        }
    }
    async function getdeliveryassigndata() {
        try {
            let response = await fetch('/getdeliveryassigndata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            let result = await response.json()
            console.log(result);
            updatedeliveryassigndata(result)
        } catch (error) {
            console.log(error);
        }
    }
    async function deliverylogout() {
        try {
            let response = await fetch('/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            authenicatedeliverboy()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        authenicatedeliverboy()
    }, [])
    function loginsuccess() {
        authenicatedeliverboy()
    }
    function updatefinaldeliverydata() {
        getdeliveryassigndata()
    }
    return (
        <>
            {
                authenicateuser === 1 ? (
                    <>
                        <header className="adminheader deliverypageheader">
                            <h1>
                                <i className="fas fa-bars" onClick={() => {
                                    updateshonavbar(1)
                                }}></i>
                                <a href onClick={() => {
                                    updateagetoggle(0)
                                }}>
                                    Himalaya Shopping Delivery Portal</a>
                            </h1>
                            {
                                shownavbar === 1 ? (
                                    <>
                                        <nav >
                                            <i className="fas fa-times" onClick={() => { updateshonavbar(0) }}></i>
                                            <a href onClick={deliverylogout} >Logout</a>
                                            <a href onClick={() => {
                                                hidenavbar()
                                                updateagetoggle(2)
                                            }}>History</a>
                                            <a href onClick={() => {
                                                hidenavbar()
                                                updateagetoggle(1)
                                            }}>Deliver</a>
                                            <a href> Hello {username.split(" ")[0]}</a>
                                        </nav>
                                    </>
                                ) : (
                                    <></>
                                )
                            }
                        </header>
                        {
                            pagetoggle === 0 ? (
                                <>
                                    <h1 style={{ textAlign: "center" }}>Products that assign to You</h1>
                                    {
                                        deliveryassigndata === null ? (
                                            <>
                                            </>
                                        ) : (<>
                                            <div className="deliverryassignpagadata">
                                                {
                                                    deliveryassigndata.length === 0 ? (
                                                        <>
                                                            <h1 style={{ textAlign: "center" }}>🤔 None Of The Products are Assigned To You Yet 🤔</h1>

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
                                </>) : (
                                <>
                                    {
                                        pagetoggle === 1 ? (
                                            <>
                                                <div className="finaldeliverycontainer">
                                                    <h1 style={{ textAlign: "center" }}>Choose Products to Delivered</h1>
                                                    <div className="finalproductcontainer">
                                                        <div className="deliveryproductcontainer">
                                                            {
                                                                deliveryassigndata.length === 0 ? (
                                                                    <>
                                                            <h1 style={{ textAlign: "center" }}>🤔 None Of The Products are Assigned To You Yet 🤔</h1>

                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            deliveryassigndata.map((value, index) => {
                                                                                return (
                                                                                    <ComfirmDelivery key={index} data={value} updatefinaldeliverydata={updatefinaldeliverydata} />
                                                                                )
                                                                            })
                                                                        }

                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <History />
                                            </>
                                        )
                                    }
                                </>
                            )
                        }


                    </>
                ) : (
                    <>

                        <Loginpage loginsuccess={loginsuccess} />
                    </>
                )
            }
        </>
    )
}


function adminpagechanges(object) {

    if (object === 1) {
        return (
            <>

            </>
        )
    } else if (object === 2) {
        return (
            <>
                history
            </>
        )
    }
}




export default DeliveryPage
