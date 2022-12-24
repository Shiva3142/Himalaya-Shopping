import React, { useState } from 'react'

function Suggetion(object) {
    let [portaldata, updateportaldata] = useState({
        name: "",
        email: "",
        phone: "",
        topic: "",
        suggetion: ""
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
                body:JSON.stringify({...portaldata,type:"Suggetion"})
            })
            object.datasaved()
    
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="suggetioncontainer">
                <h2 className="textcenter">
                    Suggetion Portal
                </h2>
                <div className="suggetionform">
                    <form onSubmit={storedata} method="post">
                        <input type="text" value={portaldata.name} onChange={updateData} required={true} name="name" id="name" placeholder="Enter Your Name" />
                        <input type="email" value={portaldata.email} onChange={updateData} required={true} name="email" id="email" placeholder="Enter Your Email" />
                        <input type="number" value={portaldata.phone} onChange={updateData} required={true} name="phone" id="phone" placeholder="Enter Your Phone Number" />
                        <input type="text" value={portaldata.topic} onChange={updateData} required={true} name="topic" id="topic" placeholder="Enter Your Suggetion Topic" />
                        <textarea value={portaldata.suggetion} onChange={updateData} required={true} name="suggetion" id="suggetion" placeholder="Give Your Suggetion in Brief" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Suggetion
