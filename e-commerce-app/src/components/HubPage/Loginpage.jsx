import React, { useState } from 'react'

function Loginpage(object) {
    let [formdetails, updateformdetails] = useState({
        email: "",
        password: ""
    })
    function updateforminputdetails(event) {
        updateformdetails((prevalue) => {
            return ({
                ...prevalue,
                [event.target.name]: event.target.value
            })
        })

    }
    async function loginquery(event) {
        event.preventDefault()
        try {
            let response = await fetch('/hublogin', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    email: formdetails.email,
                    password: formdetails.password
                })
            })
            if (response.status === 200) {
                object.loginsuccess()
            } else if (response.status === 404) {
                window.alert('Wrong Credentials')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="loginpagesection">
                <div className="loginpagesectionform">
                    <form method="post" onSubmit={loginquery} className="loginformdetailscontainer">
                        <h1>Branch Login Portal</h1>
                        <input type="email" name="email" id="email" placeholder="Enter Email" value={formdetails.email} onChange={updateforminputdetails} required={true} />
                        <input type="password" name="password" id="password" placeholder="Enter Password" value={formdetails.password} onChange={updateforminputdetails} minLength="8" required={true} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Loginpage
