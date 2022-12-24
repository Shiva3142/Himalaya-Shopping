import React, { useEffect, useState } from 'react'
import RecievedProduct from './RecievedProduct'
import RecievingProduct from './RecievingProduct'

function Recieving(object) {
    let [togglebetweengeneralandperticular, updatetogglebetweengeneralandperticular] = useState(0)
    let [recievingproductdata, updaterecievingproductdata] = useState(null)
    async function getrecievingdata() {
        try {
            let response = await fetch('/gethubrecievingdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            if (response.status === 200) {
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
                        <h1 style={{ textAlign: "center" }}>Comfirmed The Products are Recieved at Your Hub </h1>
                        <div className="packagingdatacontainer">
                            {
                                recievingproductdata.data.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Product To Confirm 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            recievingproductdata.data.map((value, index) => {
                                                return (
                                                    <RecievingProduct key={index} productdata={value} refreshdata={refreshdata} />
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
                        <h1 style={{ textAlign: "center" }}>List Of Products Which are Recieved Recently </h1>
                        <div className="packedproductcontainer">
                            {
                                recievingproductdata.extradata.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Products Are Reached 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            recievingproductdata.extradata.map((value, index) => {
                                                return (
                                                    <RecievedProduct key={index} productdata={value} refreshdata={refreshdata} />
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

export default Recieving
