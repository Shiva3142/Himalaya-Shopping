import React, { useState } from 'react'
import OrderProduct from './OrderProduct'
import '../css/Orders.css'
import { NavLink } from 'react-router-dom';
import StarPrinting from '../templates/StarPrinting'
function Orders(object) {
    // console.log(object);
    // console.log(object.orders);
    // console.log(object.orders.length);
    let [full_data, updatefullData] = useState({ isfull_data: false, full_data: null })
    function getTimeDate(object) {
        let timestamp=new Date(object)
        // console.log(timestamp);
        return timestamp.toString().slice(0,25)
    }
    function get_fulldata(object) {
        // console.log(object);
        updatefullData({
            isfull_data: true,
            full_data: object
        })
        // console.log(full_data);
    }
    let [starvalue, updatestarvalue] = useState(0)
    let [feedbackdesc, updatefeedbackdesc] = useState("")
    let [feedbacksuccess, updatefeedbacksuccess] = useState(0);
    async function submitFeedback() {
        if (starvalue > 0) {
            if (feedbackdesc !== "") {
                try {
                    let response = await fetch('getfeedbackforproduct', {
                        method: "POST",
                        headers: {
                            "Content-Type": "Application/json"
                        },
                        body: JSON.stringify({
                            transaction_id: full_data.full_data._id,
                            product_id: full_data.full_data.pdt_id,
                            starvalue,
                            feedbackdesc
                        })
                    })
                    // console.log(response);
                    // console.log(response.status);
                    updatefeedbacksuccess(1)
                    window.alert('Feedback Saved')
                    object.refreshdata()
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                window.alert('Please Tell about tour Feedback')
            }
        }
        else {
            window.alert('Please give stars to product first')
        }
    }
    return (
        <>{object.orders.length > 0 ? (
            <>

                {full_data.isfull_data === false ? (
                    <div className="OrdersContainer">
                        {
                            object.orders.map((value, index) => {
                                return (<OrderProduct key={index} full_data={value} pdtId={value.pdt_id} image={value.image} pdtname={value.product_name} price={value.price} count={value.count} date_of_order={getTimeDate(value.date_of_order)} delivery_date={value.date_of_delivery} dateofdelivery={getTimeDate(value.date_of_delivery)} transaction_id={value._id} get_fulldata={get_fulldata} excepteddeliverydate={value.excepteddeliverydate} />)
                            })
                        }
                    </div>
                ) : (
                    <div className="fullOrderdetails">
                        <div className="backfromFull_Data_of_orders" onClick={() => {
                            updatefullData({
                                isfull_data: false,
                                full_data: null
                            })
                            updatefeedbacksuccess(0)
                        }}>
                            <i className="fas fa-arrow-left"> Back</i>
                        </div>
                        <h3>Order Details</h3>
                        <div className="orderimage">
                            <img src={full_data.full_data.image} alt="" />
                        </div>

                        <div className="orderdetails">
                            <p><NavLink to={`product/${full_data.full_data.pdt_id}`}> {full_data.full_data.product_name}</NavLink></p>
                            <p>price : <sup>₹</sup><strong className="price">{full_data.full_data.price}</strong></p>
                            <p>number of items: {full_data.full_data.count}</p>
                            <p>Date of order : {getTimeDate(full_data.full_data.date_of_order).slice(0,15)}</p>
                            <p>{full_data.full_data.date_of_delivery === null ? (<><span style={{ color: "red" }}>Excepted Delivery {full_data.full_data.excepteddeliverydate.slice(0, 15)}</span></>) : (<>Date of delivery : {getTimeDate(full_data.full_data.date_of_delivery)}</>)}</p>
                            <p>Product Transaction ID : {full_data.full_data._id}</p>
                        </div>
                        {
                            full_data.full_data.otpfordelivery!==null?(
                                <>
                                    <hr />

                                <h4 style={{textAlign:"center",margin:"10px",fontSize:"30px"}}>OTP : <span style={{color:"tomato"}}>{full_data.full_data.otpfordelivery}</span></h4>
                                    <hr />
                                </>
                            ):(<>
                            
                            </>)
                        }
                        <h3>Delivery Address Details</h3>
                        {full_data.full_data.date_of_delivery === null ? (
                            <p className="lighttext">Will be Delivered to this address</p>
                        ) : (
                            <>
                            </>
                        )}
                        <div className="orderdetails">
                            <p>Address : {` ${full_data.full_data.useraddress} , ${full_data.full_data.pincode}`}</p>
                        </div>
                        <h3>Order Tracking</h3>
                        <div className="ordertrackingdetails">
                            <div className="trackingcontent">
                                <div className="orderedorder">
                                    <div className="ordered">
                                        <div className="box1">
                                            Ordered :
                                        </div>
                                        <div className="box2">
                                            <div className="lighttext"> {
                                                ` ${getTimeDate(full_data.full_data.date_of_order)}`
                                            }</div>
                                            <div className="lighttext">
                                                Note : Your Order is successfully Placed
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        full_data.full_data.packingdate === null ? (
                                            <></>
                                        ) : (
                                            <>
                                                <div className="packing">
                                                    <div className="box1">
                                                        Packing :
                                                    </div>
                                                    <div className="box2">
                                                        <div className="lighttext">
                                                            {
                                                                ` ${getTimeDate(full_data.full_data.packingdate)}`
                                                            }
                                                        </div>
                                                        <div className="lighttext">
                                                            Note : {full_data.full_data.ispackednote}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        full_data.full_data.shippingdate === null ? (
                                            <></>
                                        ) : (
                                            <>
                                                <div className="shipping">
                                                    <div className="box1">
                                                        Shipping :
                                                    </div>
                                                    <div className="box2">
                                                        <div className="lighttext">
                                                            {
                                                                `  ${getTimeDate(full_data.full_data.shippingdate)}`
                                                            }
                                                        </div>
                                                        <div className="lighttext">
                                                            Note : {full_data.full_data.isshippednote}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        full_data.full_data.branchreachingdate === null ? (<></>) : (
                                            <>
                                                <div className="nearesthub">
                                                    <span className="lighttext">
                                                        Your Order is reached at HImalaya Shopping`s  {full_data.full_data.branchname} branch at 
                                                        {
                                                            `  ${getTimeDate(full_data.full_data.branchreachingdate)}`
                                                        }
                                                    </span>
                                                    {full_data.full_data.branchleftingdate===null?(<></>):(
                                                        <div className="lighttext">
                                                            Your Order is Left from Our branch for Your Nearest hub at {getTimeDate(full_data.full_data.branchleftingdate)}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        full_data.full_data.nearreachingdate === null ? (<></>) : (
                                            <>
                                                <div className="nearesthub">
                                                    <span className="lighttext">
                                                        Your Order is reached at Your Nearest Delivery Hub at
                                                        {
                                                            `  ${getTimeDate(full_data.full_data.nearreachingdate)}`
                                                        }
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        full_data.full_data.outofdelieverydatetime === null ? (<></>) : (
                                            <>
                                                <div className="outofdelivery">
                                                    <span className="lighttext">
                                                        Your Order is Out Of Delivery at
                                                        {
                                                            `  ${getTimeDate(full_data.full_data.outofdelieverydatetime)}`
                                                        }
                                                        {full_data.full_data.outofdelieverynote === null ? (
                                                            <></>
                                                        ) : (
                                                            <div>{full_data.full_data.outofdelieverynote}</div>
                                                        )}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        full_data.full_data.date_of_delivery === null ? (<>
                                            <div className="lighttext">
                                                Please Wait Upto Delivery ....
                                            </div>
                                        </>) : (
                                            <>
                                                <div className="delivered">
                                                    <div className="box1">
                                                        Delivery :
                                                    </div>
                                                    <div className="box2">
                                                        <div className="lighttext">
                                                            {
                                                                ` at  ${getTimeDate(full_data.full_data.date_of_delivery)}`
                                                            }
                                                        </div>
                                                        <div className="lighttext">
                                                            Your Order is Delivered
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {full_data.full_data.date_of_delivery !== null ? (
                            <>
                                <h3>Feedback Details</h3>
                                <div className="orderfeedbackdetails">
                                    {
                                        feedbacksuccess === 0 ? (
                                            <>
                                                {full_data.full_data.feedbackstars === 0 ? (
                                                    <>
                                                        <h4 className="lighttext">You haven`t given the Feedback for this product , Please can you give the feedback</h4>
                                                        <div className="starRaing">
                                                            <input type="radio" name="star" onChange={() => {
                                                                updatestarvalue(5)
                                                            }} value="5" id="star1" />
                                                            <label htmlFor="star1" id="s1"><i class="fas fa-star"></i></label>
                                                            <input type="radio" name="star" onChange={() => {
                                                                updatestarvalue(4)
                                                            }} value="4" id="star2" />
                                                            <label htmlFor="star2" id="s2"><i class="fas fa-star"></i></label>
                                                            <input type="radio" name="star" onChange={() => {
                                                                updatestarvalue(3)
                                                            }} value="3" id="star3" />
                                                            <label htmlFor="star3" id="s3"><i class="fas fa-star"></i></label>
                                                            <input type="radio" name="star" onChange={() => {
                                                                updatestarvalue(2)
                                                            }} value="2" id="star4" />
                                                            <label htmlFor="star4" id="s4"><i class="fas fa-star"></i></label>
                                                            <input type="radio" name="star" onChange={() => {
                                                                updatestarvalue(1)
                                                            }} value="1" id="star5" />
                                                            <label htmlFor="star5" id="s5"><i class="fas fa-star"></i></label>
                                                        </div>
                                                        {
                                                            starvalue > 0 ? (
                                                                <div className="feedbackaknowledge">
                                                                    Your gives {starvalue} ⭐ to this item
                                                                </div>
                                                            ) : (<></>)
                                                        }
                                                        <div className="fedbacktext">
                                                            <textarea name="feedback" id="feedback" placeholder="Please Elaborate more about your Feedback" value={feedbackdesc} onChange={(object) => {
                                                                updatefeedbackdesc(object.target.value);
                                                            }}></textarea>
                                                        </div>
                                                        <div className="feedbackbtn">
                                                            <button onClick={submitFeedback}>Submit</button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="givenstarRating">
                                                            <StarPrinting rating={full_data.full_data.feedbackstars} />
                                                        </div>
                                                        <div className="feedbackaknowledge">
                                                            Your have Given {full_data.full_data.feedbackstars} ⭐ to this item
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <div className="feedbacksuccessmsg">
                                                    🙏 Thanks for Your Feedback 🙏
                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        ) : (
                            <React.Fragment>

                            </React.Fragment>
                        )}
                    </div>
                )}
            </>
        ) : (
            <div className="notorderedyet">
                <div>👜 You haven`t Ordered any product yet 👜</div>
                <div>(❁´◡`❁)</div>
            </div>
        )}
        </>
    )
}

export default Orders
