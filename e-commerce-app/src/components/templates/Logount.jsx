import React, {useContext, useEffect } from 'react'
import { useHistory } from 'react-router';
import { userContext } from '../../App'

function Logount() {
    let { state,dispatch } = useContext(userContext)
    // console.log(state);
    
    let logout=async()=>{

        await fetch('/logout',{
            method:"POST"
        })
    }
    dispatch({type:"LOGOUT",user:false,username:null})
    let history=useHistory()
    useEffect(()=>{
        logout()
    },[])
    history.push("/")
    return(
        <>
        </>
    )
}

export default Logount
