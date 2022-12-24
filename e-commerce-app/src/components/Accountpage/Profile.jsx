import React from 'react'
import '../css/Profile.css'
function Profile(object) {
    // console.log(object);
    return (
        <>
            <div className="profilecontainer">
                <div className="profiledetail">

                    <span>Name : </span><div className="profiledata">
                        {object.name}
                        </div>
                </div>
                <div className="profiledetail">
                    <span>Email : </span>
                    <div className="profiledata"> {object.email}</div>
                </div>
                <div className="profiledetail">
                    <span>Contact no. : </span>
                    <div className="profiledata">{object.number}</div>
                </div>
            </div>
        </>
    )
}
export default Profile
