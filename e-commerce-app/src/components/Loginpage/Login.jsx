import React ,{useContext, useState} from 'react'
import Header from '../templates/Header'
import Signup from './Signup'
import Register from './Register'
import { useHistory } from 'react-router';
import { userContext } from '../../App'
import Footer from '../templates/Footer';

function Login() {
    let { state ,dispatch} = useContext(userContext)
    // console.log(state);
    let history=useHistory()
    if (state.user===true) {
        history.push('/')
    }

    let [loginform,swapforms]=useState(true);
    function formCoice() {
        if (loginform===true) {
            swapforms(false)
        }
        else{
            swapforms(true)
        }
    }
    return (
        <>
            <Header/>
            {loginform?<Signup swapform={formCoice}/>:<Register swapform={formCoice}/>}
            <Footer/>

        </>
    )
}

export default Login
