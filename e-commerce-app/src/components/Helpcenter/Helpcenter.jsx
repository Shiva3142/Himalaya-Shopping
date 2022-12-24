import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../templates/Footer'
import Header from '../templates/Header'
import Suggetion from './Suggetion'
import Compaint from './Compaint'
import '../css/Helpcenter.css'
import thanksimg from '../images/helpcentersuccess.jpg'
function Helpcenter() {
    let { type } = useParams()
    console.log(type);
    let [datasaved, updatedatasaved] = useState(0)
    return (
        <>
            <Header />
            <div className="helpcenterContainer">
                {datasaved === 0 ? (<>
                    {
                        type === 'suggetion' ? (
                            <>
                                <Suggetion datasaved={()=>{
                                    updatedatasaved(1)
                                }}/>
                            </>
                        ) : (
                            <>
                                <Compaint datasaved={()=>{
                                    updatedatasaved(1)
                                }}/>
                            </>
                        )
                    }

                </>) : (
                    <>
                        <div className="helpcentersuccess">
                            <img src={thanksimg} alt="saved" />
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Helpcenter
