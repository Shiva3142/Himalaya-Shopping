import React, { createContext, useContext } from 'react'
import { useHistory } from 'react-router'
import Header from '../templates/Header'
import { userContext } from '../../App'
import CartContent from './CartContent'
import Footer from '../templates/Footer'
import '../css/Cart.css'

function Cart() {
    let { state, dispatch } = useContext(userContext)

    let history = useHistory()
    if (state.user === true) {
        return (
            <>
                <Header />
                <div className="cartdatasection">
                    <CartContent />
                </div>
                <Footer />

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

export default Cart
