import React, { useState } from 'react'
import SubMenu from './SubMenu'

function MainMenu(object) {
    let [submenu,showOrHide]=useState(()=>{
        if (window.innerWidth<768) {
            return false
        }
        else{
            return true
        }
    })
    function showhidesubmenu(event) {
        // console.log(window.innerWidth);
        let screenWidth=window.innerWidth;
        if (screenWidth<700) {
            if (submenu===true) {
                showOrHide(false)
            }
            else{
                showOrHide(true)
            }
        }
    }
    return (
        <>
            <div className="Mainmenuitem" >
                <div className="menuitemname" onClick={showhidesubmenu} >
                    {object.name}
                </div>
                
                {submenu===true?( 
                <div className="SubmenuItems" id="SubmenuItems">
                        <i className="fas fa-arrow-left" onClick={showhidesubmenu}></i>
                    {
                        object.submenu.map((value,index)=>{
                            return <SubMenu productpagehidenavbar={object.productpagehidenavbar} key={index} className="Submenu" name={value} subsubmenu={object.subsubmenu[index]} links={object.links[index]}/>
                        })
                    }
                </div>):(<></>)}
            </div>
        </>
    )
}

export default MainMenu
