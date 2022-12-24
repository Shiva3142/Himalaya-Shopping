import React from 'react'
import { NavLink } from "react-router-dom";

import '../css/Footer.css'
function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="imformationforms">
                    <div>
                        <span>Connect With Us</span>
                        <NavLink to="/helpcenter/suggetion">Give Suggestions</NavLink>
                        <NavLink to="/helpcenter/complaint">Register Complaint</NavLink>
                    </div>
                    <div className="contactdetails">
                        <span> Contact Us  </span>
                        <div>Email : <a href="mailto:himalayashoppingproject@gmail.com"> himalayashoppingproject@gmail.com</a>  </div>
                        <div>
                        Number : 
                            <a href="tel:+919999999999">+919999999999</a>
                        </div>
                    </div>
                </div>
                <div className="footername">
                    ALL RIGHTS ARE RESERVED
                </div>
            </footer>
        </>
    )
}

export default Footer
