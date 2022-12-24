import React, { useEffect, useState } from 'react'
import ShippedProduct from './ShippedProduct'
import ShippingProduct from './ShippingProduct'

function Shipping() {
    let [togglebetweengeneralandperticular, updatetogglebetweengeneralandperticular] = useState(0)
    let [shippingproductdata, updateshippingproductdata] = useState(null)
    async function getshippingdata() {
        try {
            let response = await fetch('/getshippingdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            let result = await response.json()
            console.log(result);
            updateshippingproductdata(result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getshippingdata()
    }, [])
    function refreshdata() {
        getshippingdata()
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
                <h1 style={{ textAlign: "center" }}>List Of Products To Be Shipped </h1>
                {shippingproductdata !== null ? (
                    <>
                        <div className="packagingdatacontainer">
                            {
                                shippingproductdata.data.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Product To Be Shipped 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            shippingproductdata.data.map((value, index) => {
                                                return (
                                                    <ShippingProduct key={index} productdata={value} refreshdata={refreshdata} />
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
                <h1 style={{ textAlign: "center" }}>List Of Products Which are Shipped Recently </h1>
                <div className="packedproductcontainer">
                    {
                        shippingproductdata !== null ? (<>
                            {
                                shippingproductdata.extradata.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Products are Shipped Yet 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            shippingproductdata.extradata.map((value, index) => {
                                                return (
                                                    <ShippedProduct key={index} productdata={value} refreshdata={refreshdata} />
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </>) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Shipping
