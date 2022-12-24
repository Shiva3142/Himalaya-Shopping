import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../templates/Header'
import ProductLayout from './ProductLayout'
import '../css/Products.css'
import Loader from 'react-loader-spinner'
import Footer from '../templates/Footer'

function Search() {
    let [notdata, updatedatastatus] = useState(false)
    let { search_text } = useParams()
    console.log("pram value : "+search_text);
    // let [searchText, updatecatId] = useState(search_text)
    // console.log(searchText);
    let [pdtsData, updatePdtData] = useState(null)
    async function getData(object) {
        updatePdtData(null)
        try {
            let response = await fetch('/getsearchresults', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    searchText: search_text
                })
            })
            let data = await response.json();
            // console.log(response);
            // console.log(search_text);
            // console.log(data);
            // if (response.status === 200) {
            updatePdtData(data)
            // }
            if (response.status === 403) {
                updatedatastatus(true)
                // console.log(notdata);
            }
            else {
                updatedatastatus(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
        // updatecatId(search_text)
    }, [search_text])

    return (
        <>
            <Header />
            <div className="searchString">
                <h2 style={{ textAlign: "center" }}>results for <span style={{ color: "coral" }}>"{search_text}"</span> </h2>
            </div>
            {
                pdtsData !== null ? (
                    <>
                        {
                            notdata === false ? (
                                <>
                                    {
                                        pdtsData.maindata ? (
                                            <>
                                                <div className="productscontainer">
                                                    <div className="ProductsContainer">
                                                        {pdtsData.maindata.map((value, index) => {
                                                            return <ProductLayout key={index} pdtId={value._id} pdtImage={value.image} pdtPrice={value.price} pdtName={value.pdt_name} rating={value.rating} />
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        ) :
                                            (
                                                <>
                                                    <div className="mainProductsDataNotFound">
                                                        <span>🛒Sorry , Data not found 🛒</span>
                                                        <span>🛒Please try with other keyword 🛒</span>
                                                    </div>
                                                </>
                                            )
                                    }
                                    {
                                        pdtsData.extradata ? (
                                            <>
                                                <div className="searchString">
                                                    <h2 style={{ textAlign: "center" }}>Similar Results Related to Your Keywords  </h2>
                                                </div>
                                                <div className="productscontainer">
                                                    <div className="ProductsContainer">
                                                        {pdtsData.extradata.map((value, index) => {
                                                            return <ProductLayout key={index} pdtId={value._id} pdtImage={value.image} pdtPrice={value.price} pdtName={value.pdt_name} rating={value.rating} />
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        ) :
                                            (
                                                <>
                                                </>
                                            )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="ProductsDataNotFound">
                                        <span>🛒Sorry , Data not found 🛒</span>
                                        <span>🛒Please try with other keyword 🛒</span>
                                    </div>
                                </>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div className="loaderContainer">
                            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                            <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                            <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                            <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                            loading...
                        </div>
                    </>
                )
            }
            <Footer />
        </>
    )
}
export default Search
