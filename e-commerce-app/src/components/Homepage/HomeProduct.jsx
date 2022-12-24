import { NavLink } from 'react-router-dom'
import '../css/HomeProduct.css'
import StarPrinting from '../templates/StarPrinting'
function HomeProduct(object) {
    // console.log(object);
    return (
        <>
            <div className="homeProductcard">
                <div className="homeProductcontainer">
                    <div className="homeProductimg">
                        <img src={object.img} alt="" />
                    </div>
                    <div className="homeProductInfo">
                        <p><NavLink to={`/product/${object.pdtId}`}> {object.productName} </NavLink></p>
                        <p><sup>₹</sup><strong className="price">{object.price}</strong></p>
                        <div className="rating">
                            <StarPrinting rating={object.rating} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomeProduct
