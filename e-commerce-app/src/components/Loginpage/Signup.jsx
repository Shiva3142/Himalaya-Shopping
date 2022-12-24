import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App'

import '../css/Signup.css'
function Signup(object) {
    // console.log(object);
    let { state, dispatch } = useContext(userContext)
    
    let history = useHistory()
    // console.log(history);
    let [logindetails, updatelogindetails] = useState({
        email: "",
        password: ""
    })
    function setLoginData(event) {
        let name = event.target.name
        let value = event.target.value
        updatelogindetails((predata) => {
            return ({
                ...predata,
                [name]: value
            })
        })
    }
    async function loginValidation(event) {
        event.preventDefault()
        try {
            let { email, password } = logindetails
            let response = await fetch('/login', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            // console.log(response);
            if (response.status === 200) {
                let res = await response.json()
                // console.log(res);
                dispatch({type:"LOGIN",user:true,username:res.username,cartcount:res.cartcount})
                history.goBack()
            }
            else if (response.status === 406) {
                window.alert('invalid credentials')
            }
            else if (response.status === 404) {
                alert('User not found for this email')
            }
        } catch (err) {
            console.log(err);
        }
    }
    function swapForm() {
        object.swapform()
    }
    return (
        <>
            <div className="loginformContainer">
                <div className="loginform">
                    <div className="loginimgContainer">
                        <img src="https://www.undano.com.tr/wp-content/uploads/2016/10/coming-soon-corrected-background-600x800.jpg" alt="" />
                    </div>
                    <form method="POST" onSubmit={loginValidation}>
                        <input type="email" name="email" id="email" placeholder="Enter Email" value={logindetails.email} onChange={setLoginData} required={true} autoComplete="on"/>
                        <input type="password" name="password" id="password" placeholder="Enter Password" value={logindetails.password} onChange={setLoginData} required={true} autoComplete="off" minLength="8"/>
                        <button type="submit">Log In</button>
                        <p>Don`t have an Account <span onClick={swapForm}>Register here</span></p>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Signup
