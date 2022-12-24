import React from 'react'
import MainMenu from './MainMenu'
import '../../css/Navbar.css'

function Navbar(object) {
    return (
        <>
            <div className="navbar">
                <div className="heideNavbar">
                    <i className="fas fa-times" onClick={()=>{object.hidenavbar()}}></i>
                </div>
                <MainMenu name="Electronics" submenu={['Phone Accessories','Laptop Accessories','Appliances']} subsubmenu={[['Phones'],['Laptops','Drives'],['Television','Refrigerator']]} links={[[1],[3,4],[5,6]]} productpagehidenavbar={object.hidenavbar}/>
                <MainMenu name="Men" submenu={['Clothings','Fashon Accessories']} subsubmenu={[['Shirts'],['Watches']]} links={[[7],[8]]} productpagehidenavbar={object.hidenavbar}/>
                <MainMenu name="Women" submenu={['Clothings']} subsubmenu={[['Lehngas','Dress']]} links={[[9,10]]} productpagehidenavbar={object.hidenavbar}/>
            </div>
        </>
    )
}

export default Navbar
