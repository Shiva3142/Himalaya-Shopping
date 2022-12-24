import React, { useEffect, useState } from 'react'
import PackagingProduct from './PackagingProduct'
import PackedProduct from './PackedProduct'

function Packaging() {
    let [togglebetweengeneralandperticular, updatetogglebetweengeneralandperticular] = useState(0)
    let [packagingproductdata, updatepackagingproductdata] = useState(null)
    async function getPackagingdata() {
        try {
            let response = await fetch('/getpackagingdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            let result = await response.json()
            console.log(result);
            updatepackagingproductdata(result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPackagingdata()
    }, [])
    function refreshdata() {
        getPackagingdata()
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
                <h1 style={{ textAlign: "center" }}>List Of Products To Be Packed </h1>
                {packagingproductdata !== null ? (
                    <>
                        <div className="packagingdatacontainer">
                            {
                                packagingproductdata.data.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Product To Be Packed 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            packagingproductdata.data.map((value, index) => {
                                                return (
                                                    <PackagingProduct key={index} productdata={value} refreshdata={refreshdata} />
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
                <h1 style={{ textAlign: "center" }}>List Of Products Which are Packed Recently </h1>
                <div className="packedproductcontainer">
                    {
                        packagingproductdata !== null ? (<>
                            {
                                packagingproductdata.extradata.length === 0 ? (
                                    <>
                                        <h3 style={{ textAlign: "center" }}>🤔 None Of The Products are Packed Yet 🤔</h3>
                                    </>
                                ) : (
                                    <>
                                        {
                                            packagingproductdata.extradata.map((value, index) => {
                                                return (
                                                    <PackedProduct key={index} productdata={value} refreshdata={refreshdata} />
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

export default Packaging
