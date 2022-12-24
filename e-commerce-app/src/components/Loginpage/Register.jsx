import React, { useContext, useState } from 'react'
import '../css/Register.css'
import { useHistory } from 'react-router';
import { userContext } from '../../App'

function Register(object) {
    // console.log(object);
    let { state, dispatch } = useContext(userContext)
    let [otptime, updataotptime] = useState(0)
    let [otpsend, updateuptsend] = useState(0)
    let [signupdetails, updatesignupdetails] = useState({
        name: "",
        email: "",
        number: "",
        password: "",
        otp: ""
    })

    function setdata(event) {
        let name = event.target.name;
        let value = event.target.value
        updatesignupdetails((prevalue) => {
            return ({
                ...prevalue,
                [name]: value
            })
        })
    }
    async  function VerifyOTP() {
        try {
            let response=await fetch('/verifyotp',{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                },
                body:JSON.stringify({
                    otp:signupdetails.otp
                })
            })
            return response.status
        } catch (error) {
            console.log(error);
        }
    }
    let history = useHistory()
    async function signupValidation(event) {
        event.preventDefault()
        let doneotpverification=await VerifyOTP()
        if (doneotpverification===200) {
            let { name, email, number, password } = signupdetails;
            try {
                let response = await fetch('/register', {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({
                        name, email, number, password
                    })
                })
                // console.log(response);
                // console.log(response.status);
                if (response.status === 200) {
                    let res = await response.json()
                    // console.log(res);
                    dispatch({ type: "LOGIN", user: true, username: res.username ,cartcount:0})
                    history.goBack()
                }
                else if (response.status === 409) {
                    window.alert('User Already Exists for this number or email')
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            window.alert('Wrong OTP, Please Enter Valid OTP')
        }

    }
    async function signupVarification() {
        updataotptime(1)
        let { name, email, number, password } = signupdetails;
        try {
            let response = await fetch('/registervarification', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    name, email, number, password
                })
            })
            // console.log(response);
            if (response.status === 200) {
                // console.log(res);
                // console.log('go ahead');
                updateuptsend(1)
            }
            else if (response.status === 400) {
                updataotptime(0)
                window.alert('Wrong Email, Please Enter Valid email and mobile')
            }
            else if (response.status === 403) {
                updataotptime(0)
                window.alert('Sorry , Maximum OTP requests are execeeded, Please try after sometime');
            }
            else if (response.status === 409) {
                updataotptime(0)
                window.alert('User Already Exists for this number or email')
            }

        } catch (error) {
            console.log(error);
        }
    }
    function swapForm() {
        object.swapform()
    }
    return (
        <>
            <div className="registerformContainer">

                {otptime === 0 ? (
                    <>
                        <div className="registerform">
                            <div className="registerimgContainer">
                                <img src="https://www.undano.com.tr/wp-content/uploads/2016/10/coming-soon-corrected-background-600x800.jpg" alt="" />
                            </div>
                            <form onSubmit={(event)=>{
                                event.preventDefault()
                                if (signupdetails.password.length>=8) {
                                    signupVarification()
                                } else {
                                    window.alert('password should be grater than or equal to 8 characters')
                                }
                            }
                            }>
                                <input type="text" name="name" id="name" placeholder="Enter Name" value={signupdetails.name} onChange={setdata} required={true} autoComplete="off" />
                                <input type="email" name="email" id="email" placeholder="Enter Email" value={signupdetails.email} onChange={setdata} required={true} autoComplete="off" />
                                <input type="number" name="number" id="phone" placeholder="Enter Phone" value={signupdetails.number} onChange={setdata} required={true} autoComplete="off" />
                                <input type="password" name="password" id="password" placeholder="Enter Password" value={signupdetails.password} onChange={setdata} required={true} autoComplete="off" minLength="8" />
                                <button type="submit">Register</button>
                                <p>minimum length of password to be 8 character</p>
                                <p>Already have an Account <span onClick={swapForm}>Login here</span></p>
                            </form>
                        </div>
                    </>) : (
                    <>
                        <div className="otpForm">
                            <form onSubmit={signupValidation}>
                                <input type="number" name="otp" id="otp" placeholder="Enter the OTP" value={signupdetails.otp} onChange={setdata} required={true} />
                                {otpsend === 1 ? (
                                    <p>OTP is Send On The Entered Email : {signupdetails.email}</p>
                                ) : (<>
                                <p>Please Wait ...</p>
                                </>)}
                                <button type="submit">Submit OTP</button>
                            </form>
                        </div>

                    </>)}



            </div>
        </>
    )
}

export default Register
