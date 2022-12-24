import React, { useState } from 'react'
import '../css/Paymentpage.css'
import CreditCardInput from 'react-credit-card-input';

function PaymentPage(object) {
    let [cardNumber, handleCardNumberChange] = useState("")
    let [expiry, handleCardExpiryChange] = useState("")
    let [cvc, handleCardCVCChange] = useState("")
    let [paymentoption, updatepaymentoption] = useState(0)
    let [onlinepaymentsuccess, updateonlinepaymentsuccess] = useState(0)
    let [upiid,updateupiid]=useState("")
    let [cardusername,updatecardusername]=useState("")
    function getbankname(event) {
        let checkedvalue = document.querySelector('input[name="bank"]:checked')
        // console.log(checkedvalue.value);
        if (checkedvalue===null) {
            return null
        } else {
            return checkedvalue.value
        }
    }
    function valudateonlinepayment(event) {
        if (paymentoption===0) {
            // console.log(cardNumber.length);
            // console.log(expiry.length);
            // console.log(cvc.length);
            // console.log(cardusername.trim());
            if (cardNumber.length===19 && expiry.length===7 && cvc.length===3 && cardusername.trim()!=="") {
                updateonlinepaymentsuccess(1)
            } else {
                window.alert('Please Fill All The Details')
            }
        } else if (paymentoption===1) {
            let bankname=getbankname()
            // console.log(bankname);
            if (bankname===null) {
                window.alert('Please Select Bank')
            } else {
                updateonlinepaymentsuccess(1)
            }
        } else if (paymentoption===2) {
            if (upiid==="") {
                window.alert('Please give UPI ID')
            } else {
                updateonlinepaymentsuccess(1)
            }
        }
    }
    return (
        <>
            <div className="paymentpagecontainer">
                {/* <h1>Welcome To Himalaya Shopping Payment Portal</h1> */}

                <div className="paymentLayout">
                    <div className="paymentamountinfo">
                        Total Payable Amount : <span> {object.paybaleamount} </span>
                    </div>
                    <div className="paymentOptionscontainer">
                        <h3>Please Choose Payment Method</h3>
                        <div className="paymentOptions">
                            <div className="thepaymentoptions" onClick={() => {
                                updatepaymentoption(0)
                            }}>
                                <img src="https://static.vecteezy.com/system/resources/previews/000/357/048/non_2x/vector-credit-card-icon.jpg" alt="card payment" />
                                <p>Debit/Credit Card</p>
                            </div>
                            <div className="thepaymentoptions" onClick={() => {
                                updatepaymentoption(1)
                            }}>
                                <img src="https://cdn.iconscout.com/icon/free/png-256/netbanking-credit-debit-bank-transaction-card-32270.png" alt="card payment" />
                                <p>Net Banking</p>
                            </div>
                            <div className="thepaymentoptions" onClick={() => {
                                updatepaymentoption(2)
                            }}>
                                <img src="https://images.freekaamaal.com/post_images/1522818344.PNG" alt="card payment" />
                                <p>UPI Payment</p>
                            </div>
                        </div>
                    </div>

                    <div className="paymentOptionscontainer">


                        {
                            paymentoption === 0 ? (
                                <>
                                    <h3>Please Fill The Details</h3>

                                    <div className="paymentdetailoptions">
                                        <input type="text" name="name" id="name" value={cardusername} onChange={(event)=>{
                                            updatecardusername(event.target.value)
                                        }} placeholder="Name On Card" />
                                        <CreditCardInput
                                            cardNumberInputProps={{
                                                value: cardNumber, onChange: (event) => {
                                                    handleCardNumberChange(event.target.value)
                                                }
                                            }}
                                            cardExpiryInputProps={{
                                                value: expiry, onChange: (event) => {
                                                    handleCardExpiryChange(event.target.value)
                                                }
                                            }}
                                            cardCVCInputProps={{
                                                value: cvc, onChange: (event) => {
                                                    handleCardCVCChange(event.target.value)
                                                }
                                            }}
                                            fieldClassName="input"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {
                                        paymentoption === 1 ? (
                                            <>
                                                <h3>Please Choose Your Bank</h3>

                                                <div className="netbankingoptions">
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank1" value="ICICI Bank" />
                                                        <label htmlFor="bank1" id="bank1label">ICICI Bank</label>
                                                    </div>
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank2" value="Bank Of India" />
                                                        <label htmlFor="bank2" id="bank2label">Bank Of India</label>
                                                    </div>
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank3" value="UNION Bank" />
                                                        <label htmlFor="bank3" id="bank3label">UNION Bank</label>
                                                    </div>
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank4" value="IDBI Bank" />
                                                        <label htmlFor="bank4" id="bank4label">IDBI Bank</label>
                                                    </div>
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank5" value="State Bank Of India" />
                                                        <label htmlFor="bank5" id="bank5label">State Bank Of India</label>
                                                    </div>
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank6" value="AXIS Bank" />
                                                        <label htmlFor="bank6" id="bank6label">AXIS Bank</label>
                                                    </div>
                                                    <div className="bankname">
                                                        <input type="radio" name="bank" id="bank7" value="HDFC Bank" />
                                                        <label htmlFor="bank7" id="bank7label">HDFC Bank</label>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h3>Please Fill The Details</h3>

                                                <div className="upipaymentcontainer">
                                                    <label htmlFor="upi">Enter Your UPI id</label>
                                                    <input type="text" name="upi" id="upi" value={upiid} onChange={(event)=>{
                                                        updateupiid(event.target.value)
                                                    }} placeholder="example@upi" />
                                                    <span>Or</span>
                                                    <span>Scan the QR code</span>
                                                    <img src="https://sites.google.com/a/dhsd7.net/mrs-maurus-technology-classroom/_/rsrc/1548358955234/creating-a-qr-for-your-electronic-portfolio/QR%20CODE%20FOR%20WEBSITE.png" alt="OR code" />
                                                </div>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                    <div className="PayBtn">
                        <span className="lighttext" onClick={() => {
                            object.goback()
                        }}>Cancel</span>
                        <button onClick={valudateonlinepayment}>Pay Now</button>
                    </div>
                </div>
            </div>
            {
                onlinepaymentsuccess === 1 ? (
                    <>
                        <div className="blurbackground"></div>
                        <div className="onlinepaymentnotfound">
                            <div className="backfromonlinepayment">
                                <i className="fas fa-times" onClick={()=>{
                                    updateonlinepaymentsuccess(0)
                                }}></i>
                            </div>
                            <img src="https://www.callcentrehelper.com/images/stories/2018/11/sorry-sign-clipped-760.jpg" alt="" />
                            <h1> <i class="fas fa-laptop-code"></i>  Sorry , Online Payment is Not Availabale   <i className="fas fa-laptop-code"></i> </h1>
                            <h1> Please Try Later </h1>
                        </div>
                    </>
                ) : (
                    <>

                    </>
                )
            }


        </>
    )
}

export default PaymentPage
