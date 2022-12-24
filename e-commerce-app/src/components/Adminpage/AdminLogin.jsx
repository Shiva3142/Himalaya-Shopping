import React, { useState } from 'react'
import Adminloginpageimage from '../images/adminloginpageimage.jpg'



function AdminLogin(object) {

    let [logindata, updatelogindata] = useState({
        email: "",
        password: ""
    })
    function filllogindata(event) {
        updatelogindata((prevalue) => {
            return ({
                ...prevalue,
                [event.target.name]: event.target.value
            })
        })
    }
    async function Loginadmin() {
        try {
            let response = await fetch('/adminlogin', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    adminemail: logindata.email,
                    adminpassword: logindata.password
                })
            })
            // console.log(response);
            let res = await response.json()
            // console.log(res);
            if (response.status === 200) {
                console.log("login successful");
                object.updateadmin()
            } else {
                // console.log("invalid credentials");
                window.alert("invalid credentials")
            }
        } catch (error) {
            console.log(error);
        }
    }
    function AdminLoginvalidation(event) {
        event.preventDefault()
        Loginadmin()
    }

    return (
        <>
            <div className="AdminLongpage">
                <div className="adminloginContainer">
                    <div className="adminloginpageimage">
                        <img src={Adminloginpageimage} alt="" />
                    </div>
                    <div className="adminloginpagedetails">
                        <h1>Admin Login</h1>
                        <form onSubmit={AdminLoginvalidation} className="adminloginpageinputs">
                            <div className="inputfield useremail">
                                <i class="fas fa-user-shield"></i>
                                <input type="email" name="email" id="adminemail" placeholder="Enter Email" onChange={filllogindata} value={logindata.email} required />
                            </div>
                            <div className="inputfield adminpasseord">
                                <i class="fas fa-key"></i>
                                <input type="password" name="password" id="adminpassword" placeholder="Enter Password" onChange={filllogindata} value={logindata.password} required />
                            </div>
                            <div className="adminformsubmitbtn">
                                <button type="submit">Log In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
