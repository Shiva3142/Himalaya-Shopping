import React, { useState } from 'react'
import '../css/Address.css'
import { useHistory } from 'react-router';


function Address(object) {
    // console.log(object);
    let history=useHistory()
    let [updateaddress, swapaddress] = useState(false)
    let [address,updateaddressvalue]=useState({
        address:"",
        pincode:""
    })
    let [renderaddress,updateUseraddress]=useState({
        address:object.address,
        pincode:object.pincode
    })
    function enterdata(event) {
        let name=event.target.name
        let value=event.target.value
        updateaddressvalue((prevalue)=>{
            return({
                ...prevalue,
                [name]:value
            })
        })
    }
    async function submitAddressData(event){
        event.preventDefault()  
        try {
            let responce= await fetch('/updateaddress',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    address:address.address,
                    pincode:address.pincode
                })
            })
            // console.log(responce);
            if (responce.status===200) {
                history.push('/account')
                // console.log('pushed');
                swapaddress(false)
            }
            updateUseraddress({
                address:address.address,
                pincode:address.pincode
            })
            window.alert('Address Updated')
            object.refreshdata()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
    {
        (!updateaddress?(<div className="addressContainer">
                <div className="addressdetail">
                    <span>Address : </span><div className="addressdata">
                        {renderaddress.address===null?('Address Not Updated'):(renderaddress.address)}
                    </div>
                </div>
                <div className="addressdetail">
                    <span>Pincode : </span><div className="addressdata">
                        {renderaddress.pincode===0?('Pincode Not Updated'):(renderaddress.pincode)}
                    </div>
                </div>
                <div className="updateaddresslink">
                    Wanted to update address
                    <span onClick={()=>{
                        swapaddress(true)
                    }}> Change Address</span>
                </div>
            </div>):(<div className="addressContainer">
                <div className="updateaddressdetail">
                    <form onSubmit={submitAddressData}>

                    <textarea type="text" name="address" id="address" placeholder="Enter Address" onChange={enterdata} value={address.address} required={true}/>
                    <input type="number" name="pincode" id="pincode" placeholder="Enter Pincode" onChange={enterdata} value={address.pincode} required={true}/><div className="swapbutton">

                    <button type="button" onClick={()=>{
                        swapaddress(false)
                    }}>Back</button>
                    <button type="submit">Submit</button>
                    </div>
                    </form>
                </div>
            </div>))
    }
        </>
    )
}

export default Address
