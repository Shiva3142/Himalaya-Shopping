import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Header from '../templates/Header'
import Address from './Address'
import Orders from './Orders'
import Profile from './Profile'

import '../css/Account.css'
import { userContext } from '../../App'
import Loader from 'react-loader-spinner'
import Footer from '../templates/Footer'


function Account() {
    let { state ,dispatch} = useContext(userContext)
    // console.log(state);
    let [acoption, updateuseroption] = useState('profile')
    let [userdata, updateUserData] = useState(null)
    // console.log(acoption);
    // console.log(userdata);

    async function getUserData() {
        let response = await fetch('/account', {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            }
        })
        let data = await response.json()
        // console.log(response);
        console.log(data);
        updateUserData(data)
    }
    useEffect(() => {
        getUserData()
    }, [])
    function refreshData() {
        getUserData()
    }
    let history = useHistory()
    if (state.user === true) {
            return (
                <>
                    <Header />
                    {(userdata!== null) ? (<><div className="accountOptions">
                        <div className="acoptions">
                            <div className="acoption" onClick={() => { updateuseroption('profile') }}><i className="fas fa-address-card"></i> Profile</div>
                            <div className="acoption" onClick={() => { updateuseroption('account') }}><i className="fas fa-user"></i> Address</div>
                            <div className="acoption" onClick={() => { updateuseroption('orders') }}><i className="fas fa-list-alt"></i> Your Orders</div>
                        </div>
                    </div>
                        <div className="accountDetails">
                            {
                                (acoption === "profile" || acoption === "account") ? ((acoption === "profile") ? (<Profile name={userdata.userdata.name} email={userdata.userdata.email} number={userdata.userdata.number} />) : (<Address refreshdata={refreshData} address={userdata.userdata.address} pincode={userdata.userdata.pincode} />)) : (<Orders refreshdata={refreshData} orders={userdata.orderdata} />)
                            }
                        </div></>) : (<>
                            <div className="loaderContainer">
                                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                                <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                                <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                                <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                                loading...
                            </div>
                        </>)}
                <Footer/>

                </>
            )
    }
    else {
        history.push('/login')
        return (
            <>
            </>
        )
    }
}

export default Account
