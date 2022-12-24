import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory, useParams } from 'react-router';
import '../css/main.css'
import '../css/Header.css'
import { userContext } from '../../App'
import Navbar from './Navbar/Navbar'
import Author from './Author';

function dynamicNav(state) {
    // console.log(state);
    if (state.user === true) {
        return (<>
        
        {/* <li><i class="far fa-comment-dots"></i></li> */}
        <li className="accountname" onClick={()=>{
            let accountoption=document.getElementById('acoption')
            if (accountoption.style.display==='none') {
                accountoption.style.display='block'
            }
            else{
                accountoption.style.display='none'
            }
        }}>{state.username}
            <div className="accountoptions" id="acoption">
                <li><NavLink to="/account">Account</NavLink> </li>
                <li><NavLink to="/logout">Log out</NavLink></li>
            </div>
        </li></>)
    }
    else {
        return (<><li><NavLink to="/login">Login</NavLink></li></>)
    }
}

function Header() {
    let { search_text } = useParams()
    let history=useHistory()
    // console.log(history.location.pathname);
    let { state, dispatch } = useContext(userContext)
    let [searchText,updatesearchText]=useState(search_text)

    function searchTheResult(event) {
        if (event.target.value.trim()!=='') {
            updatesearchText(event.target.value)
            gotoSearchPsage(event.target.value)
        }
        else{
            history.push('/')
        }
    }
    function gotoSearchPsage(searchText) {
        history.push(`/search/${searchText}`)
    }
    let [navbar,hideshowNavbar]=useState(()=>{
        if (window.innerWidth<700) {
            return false
        }
        else{
            return true
        }
    })
    function focus_for_search() {
        if (window.innerWidth>1100) {
            return true
        } else {
            if (history.location.pathname.search('/search/')===0) {
                return true
            }else{
                return false
            }
        }
        // console.log(history.location.pathname.search('/search/'));
    }
    function hidenavbar() {
        hideshowNavbar(false)
    }
    // useEffect(()=>{
    //     focus_for_search()
    // },[])
    return (
        <>
            <div className="header">
                <i className="fas fa-bars" onClick={()=>{
                    hideshowNavbar(true)
                }}></i>
                <div className="heading">
                    <h1><NavLink to="/"> <i className="fas fa-store"></i> Himalaya Shopping </NavLink></h1>
                </div>
                <div className="searchdiv">
                    <input type="search" name="search" id="search" placeholder="Enter Here" autoComplete="off" onChange={searchTheResult} autoFocus={focus_for_search()} value={searchText}/>
                    <button onClick={()=>{
                        if (searchText!=="" && searchText!==undefined && searchText!==null) {
                            history.push(`/search/${searchText}`)
                        }
                    }}><i className="fas fa-search"></i></button>
                </div>
                <div className="headerNav">
                    <li><NavLink to="/cart"><i className="fas fa-shopping-cart">
                        </i>
                        <sup >
                        {
                            state.cart===0?(<></>):(
                                <>
                                    {state.cart}
                                </>
                            )
                        }
                        </sup> 
                        Cart</NavLink></li>
                    {dynamicNav(state)}
                </div>
            </div>
            {navbar===true?(<Navbar hidenavbar={hidenavbar}/>):(<></>)}
            <Author/>
        </>
    )
}

export default Header
