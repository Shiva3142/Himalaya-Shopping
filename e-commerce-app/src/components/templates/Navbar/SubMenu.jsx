import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
function SubMenu(object) {
    // console.log(object.subsubmenu);
    let [subsubmenu, showOrHidesubmenu] = useState(()=>{
        if (window.innerWidth<700) {
            return false
        }
        else{
            return true
        }
    })
    function showhidesubmenu(event) {
        // console.log(window.innerWidth);
        let screenWidth = window.innerWidth;
        if (screenWidth < 700) {
            if (subsubmenu === true) {
                showOrHidesubmenu(false)
            }
            else {
                showOrHidesubmenu(true)
            }
        }
    }

    return (
        <>
            <div className="Submenuitem">
                <div className="submenuitemname" onClick={showhidesubmenu} >
                    {object.name}
                </div>
                {subsubmenu === true ? (
                    <div className="SubSubmenuItems" id="SubSubmenuItems">
                        <i className="fas fa-arrow-left" onClick={showhidesubmenu}></i>
                        <>
                        {object.subsubmenu.map((value,index)=>{
                            return <NavLink key={index} to={`/products/${object.links[index]}`} onClick={()=>{
                                if (window.innerWidth<700) {
                                    object.productpagehidenavbar()
                                }
                            }}>{value}</NavLink>
                        })}
                        </>
                    </div>) : (<></>)
                }
            </div>
        </>
    )
}

export default SubMenu
