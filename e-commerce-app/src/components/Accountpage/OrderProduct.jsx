import React from 'react'
import '../css/OrderProduct.css'
function OrderProduct(object) {
    // console.log(object);
    // console.log(object.delivery_date);
    return (
        <>
            <div className="orderProductContainer" onClick={()=>{
                object.get_fulldata(object.full_data)
            }}>
                <div className="orderimage">
                    <img src={object.image} alt=""/>
                </div>
                <div className="orderdetails">
                        <p>{object.pdtname}</p>
                        <p>Date of order : {object.date_of_order.slice(0,15)}</p>
                        <p>{object.delivery_date===null?(<><span style={{color:"red"}}>Excepted Delivery {object.excepteddeliverydate.slice(0,15)}</span></>):(<>Date of delivery : {object.dateofdelivery.slice(0,15)}</>)}</p>
                    </div>
            </div>
        </>
    )
}

export default OrderProduct
