import React, { useState } from 'react'

function Compaint(object) {

    let [portaldata, updateportaldata] = useState({
        name: "",
        email: "",
        phone: "",
        complaintfor: "",
        topic: "",
        complaint: ""
    })
    function updateData(event) {
        updateportaldata((preval) => {
            return ({
                ...preval,
                [event.target.name]: event.target.value
            })
        })
    }

async function storedata(event) {
    event.preventDefault()
    try {
        let response=await fetch('/helpcenterdata',{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({...portaldata,type:"Complaint"})
        })
        object.datasaved()
    } catch (error) {
        console.log(error);
    }
}

    return (
        <>
            <div className="conpaintContainer">
                <h2 className="textcenter">
                    Complaint Portal
                </h2>
                <div onSubmit={storedata} className="suggetionform">
                    <form action="/" method="post">
                        <input type="text" value={portaldata.name} onChange={updateData}  required={true} name="name" id="name" placeholder="Enter Your Name" />
                        <input type="email" value={portaldata.email} onChange={updateData}  required={true} name="email" id="email" placeholder="Enter Your Email" />
                        <input type="number" value={portaldata.phone} onChange={updateData}  required={true} name="phone" id="phone" placeholder="Enter Your Phone Number" />
                        <div>
                            <label htmlFor="complaintfor">Choose Reason : </label>
                            <select value={portaldata.complaintfor} onChange={updateData}  required={true} name="complaintfor" id="complaintfor">
                                <option value="">Please Select</option>
                                <option value="aboutProduct">Complaint For Product</option>
                                <option value="aboutWebsite">Complaint For Website</option>
                                <option value="aboutDeveloper">Complaint For Developer</option>
                                <option value="aboutContaint">Complaint For Containt</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <input type="text" value={portaldata.topic} onChange={updateData}  required={true} name="topic" id="topic" placeholder="Enter Your Complaint Topic" />
                        <textarea value={portaldata.complaint} onChange={updateData}  required={true} name="complaint" id="complaint" placeholder="Give Your Complaint in Brief" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Compaint
