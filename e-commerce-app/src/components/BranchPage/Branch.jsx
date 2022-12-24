import React, { useEffect, useState } from 'react'
import History from './History'
import Recieving from './Recieving'
import Sending from './Sending'
import '../css/Branch.css'
import { NavLink } from 'react-router-dom'
import Loginpage from './Loginpage'

function Branch() {
    let [pagetoggle, updateagetoggle] = useState(0)
    let [branchassigneddata, updatebranchassigneddata] = useState(null)
    let [authenicateuser, updateauthenicateuser] = useState(0)
    let [username, updateusername] = useState("")
    // let [shownavbar, updateshonavbar] = useState(1)

    async function authenicatebranch() {
        try {
            let response = await fetch('/authenicatebranch', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            console.log(response);
            if (response.status === 200) {
                let result = await response.json()
                console.log(result);
                updateusername(result.name)
                updateauthenicateuser(1)
                getBranchassigndata()
                // if (window.innerWidth < 768) {
                //     updateshonavbar(0)
                // }
            } else {
                updateauthenicateuser(0)

            }
        } catch (error) {
            console.log(error);
        }
    }


    async function getBranchassigndata() {
        try {
            let response = await fetch('/branchassigingdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            if (response.status===200) {
                let result = await response.json()
                console.log(result);
                updatebranchassigneddata(result)
            } else {
                authenicatebranch()
            }
        } catch (error) {
            console.log(error);
        }
    }
    function getTimeDate(object) {
        let timestamp = new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0, 25)
    }
    async function branchlogout() {
        try {
            let response = await fetch('/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            authenicatebranch()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        authenicatebranch()
    }, [])

    function loginsuccess() {
        authenicatebranch()
    }





    return (
        <>
            {
                authenicateuser === 1 ? (
                    <>
                        <div className="admincontainer">
                            <header className="adminheader">
                                <h1>
                                    <a href onClick={() => {
                                        updateagetoggle(0)
                                    }}>Himalaya Shopping Branch Portal</a>
                                </h1>
                                <nav >
                                    <a href onClick={branchlogout} >Logout</a>
                                    <a href onClick={() => {
                                        updateagetoggle(3)
                                    }}>History</a>
                                    <a href onClick={() => {
                                        updateagetoggle(2)
                                    }}>Sending</a>
                                    <a href onClick={() => {
                                        updateagetoggle(1)
                                    }}>Recieving</a>
                        <a href>{username} Branch</a>

                                </nav>
                            </header>
                            {
                                pagetoggle === 0 ? (
                                    <>
                                        <div className="branchmainpagecontainer">
                                            <h1 style={{ textAlign: "center" }}>Products That Are Assigned To Your Branch</h1>
                                            <div className="branchassignedcontainer">
                                                {
                                                    branchassigneddata === null ? (<>

                                                    </>) : (
                                                        <>
                                                            {
                                                                branchassigneddata.length === 0 ? (
                                                                    <h1 style={{ textAlign: "center" }}>🤔 None Of The Products are Assigned To Your Branch Yet 🤔</h1>
                                                                ) : (
                                                                    <>

                                                                        {
                                                                            branchassigneddata.map((value, index) => {
                                                                                return (

                                                                                    <div key={index} className="branchhomeproduct">
                                                                                        <div className="adminproductdetail">
                                                                                            <p>Product Transaction ID : {value._id}</p>
                                                                                            <p>price : <sup>₹</sup><strong className="price">{value.price}</strong></p>
                                                                                            <p>number of items : {value.count}</p>
                                                                                            <p>Date of order : {getTimeDate(value.date_of_order)}</p>
                                                                                            {/* <p>Buyer : {value.username}</p> */}
                                                                                            <p>Shipped at : <span style={{ color: 'red' }}>{getTimeDate(value.shippingdate)}</span></p>
                                                                                            <p>Shipped for : <span style={{ color: 'red' }}>{value.branchname} branch</span></p>
                                                                                            <p>Buyer Address : {` ${value.useraddress} , ${value.pincode}`}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </>
                                                                )
                                                            }

                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {adminpagechanges(pagetoggle,loginsuccess)}
                                    </>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <Loginpage  loginsuccess={loginsuccess}/>
                    </>
                )
            }

        </>
    )
}
function adminpagechanges(object,loginsuccess) {

    if (object === 1) {
        return (
            <>
                <Recieving loginsuccess={loginsuccess}/>
            </>
        )
    } else if (object === 2) {
        return (
            <>
                <Sending loginsuccess={loginsuccess}/>
            </>
        )
    } else if (object === 3) {
        return (
            <>
                <History loginsuccess={loginsuccess}/>
            </>
        )
    }
}
export default Branch
