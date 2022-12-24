import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function ShippingProduct(object) {
    console.log(object);
    let [shownoteinput,updatenoteinput]=useState(0)
    let [selectboxvalue,updateselectboxvalue]=useState("")
    let [note,updatenote]=useState("Your Item is successfully Shipped at himalaya Shopping ")
    function getTimeDate(object) {
        let timestamp = new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0, 25)
    }
    async function updatePackagingstatus() {
        try {
            let response=await fetch('/updateshippingstatus',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    pincode:object.productdata.pincode,
                    ids:[object.productdata._id],
                    note
                })
            })
            object.refreshdata()
        } catch (error) {
            console.log(error);
        }
    }
    function updatestatus(event) {
        if (note!=="") {
            updatePackagingstatus()
        } else {
            window.alert('Please Specify the Note')
        }
    }
    return (
        <>
        <div className="packagingproductsection">
            <div className="packagingproductcontainer">
                <div className="selectcheckbox">
                    <input type="checkbox" name="id" id="id" />
                </div>
                <div className="packagingproductdetails">
                    <div className="adminproduct">
                        <div className="adminproductimage">
                            <img src={object.productdata.image} alt="" />
                        </div>
                        <div className="adminproductdetail">
                            <p><NavLink to={`product/$`} style={{ color: "Black", fontWeight: "BOLD", fontSize: "18px" }}>{object.productdata.product_name}</NavLink></p>
                            <p>price : <sup>₹</sup><strong className="price">{object.productdata.price}</strong></p>
                            <p>number of items : {object.productdata.count}</p>
                            <p>Date of order : {getTimeDate(object.productdata.date_of_order)}</p>
                            <p>Product Transaction ID : {object.productdata._id}</p>
                            <p>Buyer : {object.productdata.username}</p>
                            <p style={{ color: 'red' }}>Not Yet Shipped</p>
                            <p>Buyer Address : {` ${object.productdata.useraddress} , ${object.productdata.pincode}`}</p>
                        </div>
                    </div>
                </div>
                <div className="changepackagingstatus">
                    <select name="packagingoption" id="packagingoption" value={selectboxvalue}onChange={(event)=>{
                            updateselectboxvalue(event.target.value)
                            if (event.target.value!=="") {
                                updatenoteinput(1)
                            } else {
                                updatenoteinput(0)
                            }
                    }}>
                        <option value="">Not Yet Shipped</option>
                        <option value="Shipped">Change to Shipped</option>
                    </select>
                </div>
            </div>
            {
                shownoteinput===1?(
            <div className="noteentry">
                <input type="text" name="note" id="note" placeholder="Please specify the note" value={note} onChange={(event)=>{
                    updatenote(event.target.value)
                }} />
                <button onClick={updatestatus}>Change Status</button>
            </div>
                ):(
                    <></>
                )
            }
        </div>
        </>
    )
}

export default ShippingProduct
