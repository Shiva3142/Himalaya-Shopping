import React, { createContext, useEffect, useReducer, useState } from 'react'
import { Switch, Route, NavLink } from "react-router-dom";
import Home from './components/Homepage/Home'
import Login from './components/Loginpage/Login'
import Account from './components/Accountpage/Account'
import Cart from './components/Cartpage/Cart'
import Logount from './components/templates/Logount';
// import Header from './components/templates/Header';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Product from './components/Productpage/Product';
import Products from './components/ProductsPage/Products';
import Search from './components/Searchpage/Search';
import Checkout from './components/Checkoutpage/Checkout';
import Admin from './components/Adminpage/Admin';
import Helpcenter from './components/Helpcenter/Helpcenter';
import Branch from './components/BranchPage/Branch';
import Hub from './components/HubPage/Hub';
import DeliveryPage from './components/DeliveryPage/DeliveryPage';

let userContext = createContext()
let homeData = createContext()
let checkoutContext = createContext()

let initialState = {
    user: true,
    username: null,
    cart: 0
}
function reducer(state, action) {
    if (action.type === "LOGIN") {
        return ({
            user: action.user,
            username: action.username,
            cart: action.cartcount
        })
    }
    else if (action.type === "LOGOUT") {
        return ({
            user: action.user,
            username: action.username,
            cart: 0
        })
    }
    else if (action.type === "DeleteCartItem") {
        return ({
            user: state.user,
            username: state.username,
            cart: state.cart - 1
        })
    }
    else if (action.type === "AddCartItem") {
        return ({
            user: state.user,
            username: state.username,
            cart: state.cart + 1
        })
    }
    else if (action.type === "EmptyCart") {
        return ({
            user: state.user,
            username: state.username,
            cart: 0
        })
    }
    return state;
}

let checkoutinitialState = {
    checkout: false
}

function checkoutreducer(state, action) {
    if (action.type === "CHECKOUT") {
        return ({
            checkout: action.checkout
        })
    }
    else if (action.type === "ExitCheckout") {
        return ({
            checkout: action.checkout
        })
    }
    return state;
}
function App() {
    // console.log(window.innerWidth);
    let [loading, updateloading] = useState(true)
    // console.log(loading);
    // console.log('from app.jsx');
    let [state, dispatch] = useReducer(reducer, initialState)
    let [checkout, checkoutdispatch] = useReducer(checkoutreducer, checkoutinitialState)
    // console.log(state);
    let [homedata, updatehomedata] = useState([])
    async function CheckUser() {
        try {
            let response = await fetch('/authunicateuser', {
                method: "POST"
            })
            let res = await response.json()
            // console.log(response);
            // console.log(res);
            if (response.status === 200) {
                dispatch({ type: "LOGIN", user: true, username: res.username, cartcount: res.cartcount })
            }
            else if (response.status === 404) {
                dispatch({ type: "LOGOUT", user: false, username: null })
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getHomedata() {
        updateloading(true)
        try {
            let responce = await fetch('/get',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    }
                })
            let res = await responce.json()
            // console.log(responce);
            // console.log(res);
            updatehomedata(res)
            updateloading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        CheckUser()
        getHomedata()
    }, [])
    // setTimeout(() => {
    //   updateloading(false)
    // }, 1000)
    if (loading === false) {
        return (
            <>
                <userContext.Provider value={{ state, dispatch }}>
                    <checkoutContext.Provider value={{ checkout, checkoutdispatch }}>
                        <Switch>
                            <Route exact path="/">
                                <homeData.Provider value={homedata}>
                                    <Home />
                                </homeData.Provider>
                            </Route>
                            <Route exact path="/admin">
                                <Admin />
                            </Route>
                            <Route exact path="/branch">
                                <Branch />
                            </Route>
                            <Route exact path="/hub">
                                <Hub />
                            </Route>
                            <Route exact path="/delivery">
                                <DeliveryPage />
                            </Route>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/cart">
                                <Cart />
                            </Route>
                            <Route exact path="/account">
                                <Account />
                            </Route>
                            <Route exact path="/checkout">
                                <Checkout />
                            </Route>
                            <Route exact path="/product/:pdt_id">
                                <Product />
                            </Route>
                            <Route exact path="/products/:pdt_cat_id">
                                <Products />
                            </Route>
                            <Route exact path="/search/:search_text">
                                <Search />
                            </Route>
                            <Route exact path="/logout">
                                <Logount />
                            </Route>
                            <Route exact path="/helpcenter/:type">
                                <Helpcenter />
                            </Route>
                            <Route>
                                <div className="Errorpage">
                                    <img src="https://i.pinimg.com/originals/a8/12/1a/a8121abee959e18cbad25ad4046f76d8.gif" alt="ErrorPageImage" />
                                    <div>
                                        <section> ¯\_(ツ)_/¯  <span>Page Not Found</span> ¯\_(ツ)_/¯ </section>
                                        <NavLink to="/">Go To Homepage</NavLink>
                                    </div>
                                </div>
                            </Route>
                        </Switch>
                    </checkoutContext.Provider>
                </userContext.Provider>
            </>
        )
    } else {
        return (
            <>
                <div className="loaderContainer">
                    <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                    <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                    <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                </div>
            </>
        )
    }
}

export default App

export { userContext, homeData, checkoutContext }
