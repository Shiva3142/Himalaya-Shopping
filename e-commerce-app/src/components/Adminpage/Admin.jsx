import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Admin.css'
import AdminLogin from './AdminLogin'
import OrdersDetails from './OrdersDetails'
import TransactionSearch from './TransactionSearch'
import Tracking from './Tracking'
import Packaging from './Packaging'
import Shipping from './Shipping'

function Admin() {
    let [adminlogin, updateadminlogin] = useState(false)
    let [togglebetweengeneralandperticulerdata, changetoggle] = useState(0)
    let [pagetoggle, updateagetoggle] = useState(0)
    async function validateAdmin() {
        try {
            let response = await fetch('/adminauthenicator', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            let res = await response.json();
            // console.log(res);
            if (response.status === 200) {
                updateadminlogin(true)
            } else {
                updateadminlogin(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function adminlogout() {
        try {
            let responce = await fetch('/logout', {
                method: "POST",
            })
            let res = await responce.json()
            // console.log(responce);
            // console.log(res);
            updateadminlogin(false)

        } catch (error) {
            console.log(error);
        }
    }
    function logoutadmin(event) {
        adminlogout()
        // validateAdmin()
    }


    function updateadmin() {
        validateAdmin()
    }
    useEffect(() => {
        validateAdmin()
    }, [])


    return (
        <>
            <div className="admincontainer">
                {adminlogin === true ? (<>
                    <header className="adminheader">
                        <h1>
                            <a href onClick={() => {
                                updateagetoggle(0)
                            }}>Himalaya Shopping Admin Portal</a>
                        </h1>
                        <nav >
                            <a href onClick={logoutadmin} >Logout</a>
                            <NavLink to="/">Visit Site</NavLink>
                            <a href onClick={() => {
                                updateagetoggle(3)
                            }}>Shipping</a>
                            <a href onClick={() => {
                                updateagetoggle(2)
                            }}>Packaging</a>
                            <a href onClick={() => {
                                updateagetoggle(1)
                            }}>Tracking</a>
                        </nav>
                    </header>
                    {
                        pagetoggle === 0 ? (
                            <>
                                <div className="generalandperticuler">
                                    <button onClick={() => {
                                        changetoggle(0)
                                    }}>General Data</button>
                                    <button onClick={() => {
                                        changetoggle(1)
                                    }}>Particuler Transaction Search</button>
                                </div>
                                {togglebetweengeneralandperticulerdata === 0 ? (<OrdersDetails />) : (<TransactionSearch />)}
                            </>
                        ) : (
                            <>
                                {adminpagechanges(pagetoggle)}
                            </>
                        )
                    }
                </>) : (<AdminLogin updateadmin={updateadmin} />)}
            </div>
        </>
    )
}


function adminpagechanges(object) {

    if (object === 1) {
        return (
            <>
                <Tracking />
            </>
        )
    } else if (object === 2) {
        return (
            <>
                <Packaging />
            </>
        )
    } else if (object === 3) {
        return (
            <>
                <Shipping />
            </>
        )
    }
}



export default Admin
