import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Header from '../templates/Header'
import ProductLayout from './ProductLayout'
import '../css/Products.css'
import Loader from 'react-loader-spinner'
import Footer from '../templates/Footer'

function Products() {
    let [notdata,updatedatastatus]=useState(true)
    let { pdt_cat_id } = useParams()
    // console.log("pram value : "+pdt_cat_id);
    // let [product_cat_id,updatecatId]=useState(pdt_cat_id)
    // console.log(product_cat_id);
    let [pdtsData, updatePdtData] = useState(null)
    async function getData(object) {
        updatePdtData(null)
        try {
            let response = await fetch('/getproductsdata', {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({
                    product_cat_id: pdt_cat_id
                })
            })
            let data = await response.json();
            // console.log(response);
            // console.log(data);
            if (response.status === 200) {
                updatePdtData(data)
            }
            if (data.length!==0) {
                updatedatastatus(false)
                // console.log(notdata);
            }
            else{
                updatedatastatus(true)

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
        // updatecatId(pdt_cat_id)
    }, [pdt_cat_id])

    return (
        <>
            <Header/>
            
            {(pdtsData!==null)?( (notdata===false)? (
            <div className="productscontainer">
            <div className="ProductsContainer">
                {pdtsData.map((value,index)=>{
                    return <ProductLayout key={index} pdtId={value._id} pdtImage={value.image} pdtPrice={value.price} pdtName={value.pdt_name} rating={value.rating}/>
                })}
            </div>
            
            </div>
            ):(<> 
            <div className="ProductsDataNotFound">
                🛒Data not found🛒
            </div>            
            </>)):(<>
                <div className="loaderContainer">
                    <Loader type="Puff" color="#00BFFF" height={100} width={100} />
                    <Loader type="Audio" color="#00BFFF" height={80} width={80} />
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
                    <Loader type="Bars" color="#00BFFF" height={80} width={80} />
                    loading...
                </div>
            </>)}
            <Footer/>
        </>
    )
}

export default Products
