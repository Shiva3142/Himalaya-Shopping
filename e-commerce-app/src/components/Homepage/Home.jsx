import React, { useContext } from 'react'
import Header from '../templates/Header'
import home from '../images/home.jpg'
import hp from '../images/hp.png'
import timex from '../images/timex.png'
import samsung from '../images/samsung.png'
import sandisk from '../images/sandisk.png'
import whirlpool from '../images/whirlpool.png'
import { homeData } from '../../App'

import '../css/Home.css'
import HomeProduct from './HomeProduct'
import Footer from '../templates/Footer'
function Home() {
    let homedata = useContext(homeData)
    // console.log(homedata);

        return (
            <>
                <Header />

                <div className="homeimg">
                    <img src={home} alt=" " />
                </div>
                <div className="homeheading">
                    <h1>Some Of Our Products</h1>
                </div>
                <div className="homeproductCollection">
                    {homedata[0] ? (<>
                        <div className="homeproducts">
                            <HomeProduct pdtId={homedata[0]._id} img={homedata[0].image} productName={homedata[0].pdt_name} price={homedata[0].price} rating={homedata[0].rating}/>
                            <HomeProduct pdtId={homedata[1]._id} img={homedata[1].image} productName={homedata[1].pdt_name} price={homedata[1].price} rating={homedata[1].rating}/>
                        </div>
                        <div className="homeproducts">
                            <HomeProduct pdtId={homedata[2]._id} img={homedata[2].image} productName={homedata[2].pdt_name} price={homedata[2].price} rating={homedata[2].rating}/>
                            <HomeProduct pdtId={homedata[3]._id} img={homedata[3].image} productName={homedata[3].pdt_name} price={homedata[3].price} rating={homedata[3].rating}/>
                            <HomeProduct pdtId={homedata[4]._id} img={homedata[4].image} productName={homedata[4].pdt_name} price={homedata[4].price} rating={homedata[4].rating}/>

                        </div>
                        <div className="homeproducts">
                            <HomeProduct pdtId={homedata[5]._id} img={homedata[5].image} productName={homedata[5].pdt_name} price={homedata[5].price} rating={homedata[5].rating}/>
                            <HomeProduct pdtId={homedata[6]._id} img={homedata[6].image} productName={homedata[6].pdt_name} price={homedata[6].price} rating={homedata[6].rating}/>
                        </div>
                    </>
                    ) : (<>

                    </>)}
                </div>
                <div className="dealersheading">
                    <h1>Some Of Our Dealers</h1>
                </div>
                <div className="dealersimg">
                    <div className="dealerimg">
                        <img src={hp} alt="" />
                        <img src={timex} alt="" />
                        <img src={sandisk} alt="" />
                    </div>
                    <div className="dealerimg">
                        <img src={samsung} alt="" />
                        <img src={whirlpool} alt="" />
                    </div>
                </div>
                <Footer/>
            </>
        )
    } 

export default Home
