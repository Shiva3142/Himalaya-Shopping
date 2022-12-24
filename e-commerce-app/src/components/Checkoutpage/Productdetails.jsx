import React, { useEffect, useState } from 'react'


function Productdetails(object) {
    let [totalAmount, updatetotalAmount] = useState(0)
    let [checkoutData, updateCheckoutData] = useState(null)
    async function getProductData() {
        try {
            let responce = await fetch('/getcheckoutProductData', {
                method: "POST",
                headers: {
                    "Content-type": "Application/json"
                }
            })
            // console.log(responce);
            let res = await responce.json()
            // console.log(res);
            updateCheckoutData(res)
            let total = 0;
            res.forEach((element) => {
                total = total + element.product_count * element.price
            });
            updatetotalAmount(total)
            object.returntotalamount(total)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    return (
        <>


        
            <div className="checkoutProductsContainer">
                {checkoutData !== null ? (<>  {
                    checkoutData.map((value, index) => {
                        return (
                            <div key={index} className="checkoutProductContainer">
                                <div className="checkoutproductimage">
                                    <img src={value.image} alt="" />
                                </div>
                                <div className="checkoutproductdetails">
                                    <h1>{index + 1}) {value.pdt_name}</h1>
                                    <div>no. of counts : {value.product_count}</div> <div>price : {value.price} </div>
                                </div>
                            </div>
                        )
                    })
                }</>) : (<></>)}
                <h1 style={{textAlign:"center"}}>Total Amount : <sup style={{fontSize:"15px"}}>₹</sup> <span style={{color:"coral"}}>{totalAmount}</span></h1>
            </div>
        </>
    )
}

export default Productdetails
