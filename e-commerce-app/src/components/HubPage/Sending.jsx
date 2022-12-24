import React, { useEffect, useState } from 'react'
import SendedProduct from './SendedProduct'
import SendingProduct from './SendingProduct'

function Sending(object) {
    let [togglebetweengeneralandperticular, updatetogglebetweengeneralandperticular] = useState(0)
    let [recievingproductdata, updaterecievingproductdata] = useState(null)
    async function getrecievingdata() {
        try {
            let response = await fetch('/gethubrecieveddata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            if (response.status===200) {
                let result = await response.json()
                // console.log(result);
                updaterecievingproductdata(result)
                
            } else {
                object.loginsuccess()
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getrecievingdata()
    }, [])
    function refreshdata() {
        getrecievingdata()
    }
    return (
        <>
            <div>
                <div className="togglesearch">
                    <button onClick={() => {
                        updatetogglebetweengeneralandperticular(0)
                    }}>General Data</button>
                    <button onClick={() => {
                        updatetogglebetweengeneralandperticular(1)
                    }}>History Search</button>
                </div>
                {recievingproductdata !== null ? (
                    <>
                    <h1 style={{ textAlign: "center" }}>Comfirmed The Products are Sended from Your Hub </h1>
                        <div className="packagingdatacontainer">
                            {
                                recievingproductdata.data.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Product To Send 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            recievingproductdata.data.map((value, index) => {
                                                return (
                                                    <SendingProduct key={index} productdata={value} refreshdata={refreshdata} />
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )}
                    {
                        recievingproductdata !== null ? (<>
                <h1 style={{ textAlign: "center" }}>List Of Products Which are Sended Recently </h1>
                <div className="packedproductcontainer">
                            {
                                recievingproductdata.extradata.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Products Are Sended 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            recievingproductdata.extradata.map((value, index) => {
                                                return (
                                                    <SendedProduct key={index} productdata={value} refreshdata={refreshdata} />
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                </div>
                        </>) : (
                            <></>
                        )
                    }
            </div>
        </>
    )
}

export default Sending
