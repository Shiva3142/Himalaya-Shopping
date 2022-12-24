const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const nodemailer = require("nodemailer");
const emailExistence = require("email-existence");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(
    session({
        secret: "ShivkumarChauhan",
        resave: false,
        saveUninitialized: true,
        maxAge: Date.now() + 150000,
    })
);

dotenv.config({
    path: "./config.env",
});
const Database = process.env.DATABASE;
const Password = process.env.PASSWORD;
let port = process.env.PORT || 80;

let emailsender = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "himalayashoppingproject@gmail.com",
        pass: Password,
    },
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("e-commerce-app/build"));
    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "e-commerce-app", "build", "index.html")
        );
    });
}

mongoose.connect(Database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

db = mongoose.connection;
db.once("open", () => {
    console.log("connected to database");
});

let userschema = new mongoose.Schema({
    name: String,
    email: String,
    number: Number,
    password: String,
    address: {
        type: String,
        default: null,
    },
    pincode: {
        type: Number,
        default: 0,
    },
});
// console.log(userschema);

let productschema = new mongoose.Schema({
    pdt_id: Number,
    pdt_name: String,
    price: Number,
    type: String,
    availablity: String,
    image: String,
    images: Object,
    specification: Object,
    cat_id: Number,
    pro_cat_id: Number,
    Sub_cat_id: Number,
    pdt_desc: String,
    rating: Number,
});
// console.log(productschema);

function getexcepteddate(object = 10) {
    let date = new Date();
    date.setDate(date.getDate() + object);
    return date.toString();
}

let orderproductschema = new mongoose.Schema({
    pdt_id: String,
    product_name: String,
    image: String,
    count: Number,
    price: Number,
    deliveryStatus: {
        type: Boolean,
        default: false,
    },
    excepteddeliverydate: String,
    paymentMode: String,
    username: String,
    useremail: String,
    useraddress: String,
    pincode: Number,
    date_of_order: {
        type: Date,
        default: Date,
    },
    ispackednote: {
        type: String,
        default: null,
    },
    packingdate: {
        type: Date,
        default: null,
    },
    isshippednote: {
        type: String,
        default: null,
    },
    shippingdate: {
        type: Date,
        default: null,
    },
    branchname: {
        type: String,
        default: null,
    },
    branchreachingdate: {
        type: Date,
        default: null,
    },
    branchleftingdate: {
        type: Date,
        default: null,
    },
    nearreachingdate: {
        type: Date,
        default: null,
    },
    hubname: {
        type: String,
        default: null,
    },
    outofdelieverydatetime: {
        type: Date,
        default: null,
    },
    outofdelieverynote: {
        type: String,
        default: null,
    },
    otpfordelivery: {
        type: Number,
        default: null,
    },
    date_of_delivery: {
        type: Date,
        default: null,
    },
    feedbackstars: {
        type: Number,
        default: 0,
    },
});
// console.log(orderproductschema);

let feedbackschema = new mongoose.Schema({
    username: String,
    product_id: String,
    stars: Number,
    feedbackdesc: String,
    feedbackDate: {
        type: String,
        default: Date(),
    },
});

let cartdetailsschema = new mongoose.Schema({
    useremail: String,
    product_count: Number,
    pdt_id: String,
    pdt_name: String,
    price: String,
    image: String,
});

let helpcenterschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    topic: String,
    complaintfor: {
        type: String,
        default: null,
    },
    complaint: {
        type: String,
        default: null,
    },
    suggetion: {
        type: String,
        default: null,
    },
    type: String,
});

let admindataschema = new mongoose.Schema({
    adminemail: String,
    adminpassword: String,
});

let branchdetailsschema = new mongoose.Schema({
    branchname: String,
    branchheadname: String,
    branchheademail: String,
    branchheadpassword: String,
    branchcontachnumber: Number,
    branchpincodeslist: {
        type: String,
    },
});
let hubdetailsschema = new mongoose.Schema({
    hubname: String,
    hubheadname: String,
    hubheademail: String,
    hubheadpassword: String,
    hubcontachnumber: Number,
    hubpincodeslist: {
        type: String,
    },
});
let deliveryboydetailsschema = new mongoose.Schema({
    deliveryboyname: String,
    deliveryboyemail: String,
    deliveryboypassword: String,
    deliveryboycontachnumber: Number,
    deliveryboypincodeslist: {
        type: String,
    },
    numberofdeliveriestobedone: {
        type: Number,
        default: 0,
    },
});
let deliverydetailsschema = new mongoose.Schema({
    transaction_id: String,
    paymentmode: String,
    delivered_by: String,
    deliveryboyid: String,
    deliveredto: String,
    deliveryamount: Number,
    deliverycount: Number,
    deliveryaddress: String,
    deliverypincode: Number,
    deliverybranchname: String,
    deliveryhubname: String,
    otp_for_delivery: Number,
    status: {
        type: Boolean,
        default: false,
    },
});
let userdetails = mongoose.model("userdetails", userschema);
let products = mongoose.model("products", productschema);
let orderdetails = mongoose.model("ordersdetaills", orderproductschema);
let cartdetails = mongoose.model("cartdetails", cartdetailsschema);
let admindetails = mongoose.model("admindetails", admindataschema);
let feedbackdetails = mongoose.model("feedbackdetails", feedbackschema);
let helpcenterdetails = mongoose.model("helpcenterdetails", helpcenterschema);
let branchdetails = mongoose.model("branchdetails", branchdetailsschema);
let hubdetails = mongoose.model("hubdetails", hubdetailsschema);
let diliveryboysdetails = mongoose.model(
    "diliveryboysdetails",
    deliveryboydetailsschema
);
let deliverydetails = mongoose.model("deliverydetails", deliverydetailsschema);
const redirectlogin = (req, res, next) => {
    if (!req.session.useremail) {
        res.status(407).send("user is not logged in");
    } else {
        next();
    }
};

const redirecthome = (req, res, next) => {
    if (req.session.useremail) {
        res.status(403).send("bad request");
    } else {
        next();
    }
};

app.post("/authunicateuser", (req, res) => {
    if (req.session.useremail) {
        cartdetails
            .find({
                useremail: req.session.useremail,
            })
            .count((err, count) => {
                // console.log(count);
                res.status(200).send({
                    username: req.session.username,
                    cartcount: count,
                });
            });
    } else {
        res.status(404).send({
            user: false,
        });
    }
});

app.post("/get", (req, res) => {
    // console.log(req.sessionID);
    if (req.session.username) {
        // console.log(req.session.username);
    }
    console.log("home requested");
    products.aggregate(
        [
            {
                $sample: {
                    size: 7,
                },
            },
        ],
        (err, data) => {
            res.setHeader("Content-Type", "Application/json");
            res.status(200).send(data);
            // console.log(data);
            if (err) {
                console.log(err);
            }
        }
    );
});

// products.aggregate([{$sample:{size:7}}],(err,data)=>{
//     console.log(data);
//     console.log(err);
// })

app.post("/login", redirecthome, (req, res) => {
    // console.log(req.body);
    let entry = {
        email: req.body.email.toLowerCase(),
        password: req.body.password,
    };
    // console.log(entry);
    userdetails.findOne(
        {
            email: entry.email,
        },
        (err, data) => {
            // console.log(data);
            if (data !== null) {
                bcrypt.compare(
                    entry.password,
                    data.password,
                    function (err, result) {
                        if (result === true) {
                            req.session.username = data.name.split(" ")[0];
                            req.session.userid = data.user_id;
                            req.session.useremail = data.email;
                            // console.log(req.session.username);
                            req.session.save((err) => {
                                if (err) {
                                    console.log("error on session saving", err);
                                } else {
                                    cartdetails
                                        .find({
                                            useremail: req.session.useremail,
                                        })
                                        .count((err, count) => {
                                            res.json({
                                                username:
                                                    data.name.split(" ")[0],
                                                user_id: data.user_id,
                                                cartcount: count,
                                            });
                                        });
                                }
                            });
                        } else {
                            res.status(406).send("invalid credentials");
                        }
                    }
                );
            } else {
                res.status(404).send({
                    message: "user not found",
                });
            }
        }
    );
});

app.post("/registervarification", redirecthome, (req, res) => {
    // console.log(req.sessionID);
    // console.log(req.body);
    userdetails.findOne(
        {
            $or: [
                {
                    email: req.body.email,
                },
                {
                    number: req.body.number,
                },
            ],
        },
        (err, data) => {
            if (data === null) {
                emailExistence.check(
                    req.body.email.toLowerCase(),
                    function (error, response) {
                        // console.log(error);
                        // console.log('res: ' + response);
                        if (response === true) {
                            if (req.session.sessionID === req.sessionID) {
                                req.session.otplimit = req.session.otplimit + 1;
                                req.session.save((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                if (req.session.otplimit <= 3) {
                                    let email = req.body.email.toLowerCase();
                                    let otp = Math.floor(
                                        Math.random() * 10000000
                                    );
                                    req.session.otp = otp;
                                    req.session.save((err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                    let maildetails = {
                                        from: "himalayashoppingproject@gmail.com",
                                        to: email,
                                        subject: "OTP for varification",
                                        text: `Your OTP for varification for registration on Himalaya Shopping is : ${otp} `,
                                    };
                                    emailsender.sendMail(
                                        maildetails,
                                        (err, details) => {
                                            if (err) {
                                                // console.log(err);
                                                res.status(400).send({
                                                    message:
                                                        "Bad request email not found",
                                                });
                                            } else {
                                                // console.log(details.response);
                                                res.status(200).send({
                                                    massage: "done",
                                                });
                                            }
                                        }
                                    );
                                } else {
                                    res.status(403).send({
                                        massage:
                                            "otp limit is execeed please try after sometime",
                                    });
                                }
                            } else {
                                let email = req.body.email.toLowerCase();
                                let otp = Math.floor(Math.random() * 10000000);
                                req.session.sessionID = req.sessionID;
                                req.session.otplimit = 1;
                                req.session.otp = otp;
                                req.session.save((err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                let maildetails = {
                                    from: "himalayashoppingproject@gmail.com",
                                    to: email,
                                    subject: "OTP for varification",
                                    text: `Your OTP for varification for registration on Himalaya Shopping is : ${otp} `,
                                };
                                emailsender.sendMail(
                                    maildetails,
                                    (err, details) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(400).send({
                                                message:
                                                    "Bad request email not found",
                                            });
                                        } else {
                                            // console.log(details.response);
                                            res.status(200).send({
                                                massage: "done",
                                            });
                                        }
                                    }
                                );
                            }
                        } else {
                            res.status(400).send({
                                message: "Bad request email not found",
                            });
                        }
                    }
                );
            } else {
                res.status(409).send("done");
            }
        }
    );
});

app.post("/verifyotp", (req, res) => {
    // console.log(parseInt(req.body.otp));
    // console.log(req.session);
    // console.log(req.session.otp);
    if (parseInt(req.body.otp) === req.session.otp) {
        res.status(200).send("done");
    } else {
        res.status(400).send("done");
    }
});

app.post("/register", redirecthome, (req, res) => {
    // console.log(req.body);
    bcrypt.hash(req.body.password, 12, function (err, hash) {
        // console.log(hash);
        let entry = {
            name: req.body.name.toLowerCase(),
            email: req.body.email.toLowerCase(),
            number: req.body.number,
            password: hash,
        };
        // console.log(entry);
        let userdetail = new userdetails(entry);
        userdetail.save((err, data) => {
            if (err) {
                console.log(err);
            }
            req.session.username = data.name.split(" ")[0];
            req.session.userid = data.user_id;
            req.session.useremail = data.email;
            // console.log(req.session.username);
            req.session.save((err) => {
                if (err) {
                    console.log("error on saving", err);
                }
            });
            res.json({
                username: data.name.split(" ")[0],
                user_id: data.user_id,
            });
        });
    });
});

app.post("/getproductdata", (req, res) => {
    // console.log(req.body);
    products.findOne(
        {
            _id: req.body.product_id,
        },
        (err, data) => {
            // console.log(data);
            if (data) {
                feedbackdetails.find(
                    {
                        product_id: req.body.product_id,
                    },
                    (err, review_data) => {
                        if (review_data.length > 0) {
                            res.status(200).json({
                                product_data: data,
                                review_data: review_data,
                            });
                        } else {
                            res.status(200).json({
                                product_data: data,
                                review_data: null,
                            });
                        }
                    }
                );
            } else {
                res.status(403).send({
                    message: "data not available",
                });
            }
        }
    );
});

app.post("/getproductsdata", (req, res) => {
    // console.log(req.body);
    products.find(
        {
            pro_cat_id: req.body.product_cat_id,
        },
        (err, data) => {
            // console.log(data);
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(403).send({
                    message: "data not available",
                });
            }
        }
    );
});

app.post("/getsearchresults", (req, res) => {
    // console.log(req.body);
    search_string = '"' + req.body.searchText + '"';
    products.find(
        {
            $text: {
                $search: search_string,
            },
        },
        (err, data) => {
            // console.log(data);
            if (data.length > 0) {
                res.status(200).json({
                    maindata: data,
                    extradata: null,
                });
            } else {
                products.find(
                    {
                        $text: {
                            $search: req.body.searchText,
                        },
                    },
                    (err, extradata) => {
                        // console.log(extradata);
                        if (extradata.length > 0) {
                            res.status(200).json({
                                maindata: null,
                                extradata: extradata,
                            });
                        } else {
                            res.status(403).send([
                                {
                                    message: "data not available",
                                },
                            ]);
                        }
                    }
                );
            }
        }
    );
});

app.post("/addtocart", redirectlogin, (req, res) => {
    // console.log(req);
    // console.log(req.body);
    products.findOne(
        {
            _id: req.body.product_id,
        },
        (err, data) => {
            cartdetails.findOne(
                {
                    useremail: req.session.useremail,
                    pdt_id: req.body.product_id,
                },
                (err, cart) => {
                    // console.log(cart);
                    if (cart === null) {
                        // console.log(data);
                        entry = {
                            useremail: req.session.useremail,
                            product_count: 1,
                            pdt_id: data._id,
                            pdt_name: data.pdt_name,
                            price: data.price,
                            image: data.image,
                        };
                        // console.log(entry);
                        let cartdata = new cartdetails(entry);
                        cartdata.save((err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(200).send({
                            message: "addes to cart",
                        });
                    } else {
                        res.status(409).send({
                            message: "product is already in the cart",
                        });
                    }
                }
            );
        }
    );
});

app.post("/getcartdata", redirectlogin, (req, res) => {
    cartdetails.find(
        {
            useremail: req.session.useremail,
        },
        (err, data) => {
            // console.log(data);
            if (data.length === 0) {
                res.status(404).send([]);
            } else {
                res.status(200).json(data);
            }
        }
    );
});

app.post("/deletecartitem", redirectlogin, (req, res) => {
    // console.log(req.body);
    cartdetails.deleteOne(
        {
            _id: req.body.item_id,
        },
        (err, data) => {
            // console.log(data);
            if (data.deleteedCount === 1) {
                res.status(200).send({
                    message: "hello",
                });
            } else {
                res.status(404).send({
                    message: "not deleted",
                });
            }
            // console.log(err);
        }
    );
});

app.post("/updatecount", redirectlogin, (req, res) => {
    // console.log(req.body);
    cartdetails.updateOne(
        {
            _id: req.body.item_id,
        },
        {
            $set: {
                product_count: req.body.count,
            },
        },
        (err, data) => {
            // console.log(data);
            res.status(200).send({
                message: "done updated count",
            });
        }
    );
});

app.post("/account", redirectlogin, (req, res) => {
    // console.log(req.body);
    userdetails.findOne(
        {
            email: req.session.useremail,
        },
        (err, data) => {
            // console.log(data);
            orderdetails
                .find(
                    {
                        useremail: req.session.useremail,
                    },
                    (err, orders) => {
                        // console.log(orders);
                        res.status(200).json({
                            userdata: {
                                name: data.name,
                                address: data.address,
                                pincode: data.pincode,
                                email: data.email,
                                number: data.number,
                            },
                            orderdata: orders,
                        });
                    }
                )
                .sort({
                    date_of_order: -1,
                });
        }
    );
});

app.post("/updateaddress", redirectlogin, (req, res) => {
    // console.log(req.body);
    userdetails.updateOne(
        {
            email: req.session.useremail,
        },
        {
            $set: {
                address: req.body.address,
                pincode: req.body.pincode,
            },
        },
        (err, data) => {
            // console.log(data);
            if (err) {
                console.log(err);
            } else {
                res.status(200).send("address updated");
            }
        }
    );
});

app.post("/getcheckoutProductData", redirectlogin, (req, res) => {
    cartdetails.find(
        {
            useremail: req.session.useremail,
        },
        (err, data) => {
            // console.log(data);
            res.send(data);
        }
    );
});

app.post("/getcheckoutaddress", redirectlogin, (req, res) => {
    userdetails.findOne(
        {
            email: req.session.useremail,
        },
        (err, data) => {
            // console.log(data);
            res.json({
                name: data.name,
                address: data.address,
                pincode: data.pincode,
            });
        }
    );
});

app.post("/placetheorder", redirectlogin, (req, res) => {
    // console.log(req.body);
    cartdetails.find(
        {
            useremail: req.session.useremail,
        },
        (err, data) => {
            let recieptemail = req.session.useremail;
            let recieptbody = `Dear user \nYour Order details are as follows\n`;
            let htmlbody = ` 
        <p style="padding: 1px;
margin: 0px;">Dear User</p>
    <p style="padding: 1px;
margin: 0px;">Your Order Details are as follows</p>
    <h4 style="padding: 1px;
margin: 0px;margin-top:7px;">Buyer Name : ${req.body.username}</h4>
    <p style="font-size: 13px;padding: 1px;
            margin: 0px;margin-bottom:20px">Delivery Address : ${req.body.useraddress} , ${req.body.userpincode}</p>
        `;
            let totalamount = 0;
            let i = 1;
            excepteddate = 10;
            if (
                req.body.userpincode - 400000 > 0 &&
                req.body.userpincode - 400000 < 20000
            ) {
                excepteddate = 5;
            } else if (
                req.body.userpincode - 400000 > 0 &&
                req.body.userpincode - 400000 < 100000
            ) {
                excepteddate = 9;
            } else {
                excepteddate = 15;
            }
            data.forEach((value) => {
                let entry = {
                    pdt_id: value.pdt_id,
                    product_name: value.pdt_name,
                    image: value.image,
                    count: value.product_count,
                    price: value.price,
                    paymentMode: req.body.paymentoption,
                    username: req.body.username,
                    useremail: req.session.useremail,
                    useraddress: req.body.useraddress,
                    pincode: req.body.userpincode,
                    excepteddeliverydate: getexcepteddate(excepteddate),
                };
                totalamount = totalamount + entry.price * entry.count;
                // console.log(entry);
                let orderdetail = new orderdetails(entry);
                recieptbody =
                    recieptbody +
                    `\n${i}) ${orderdetail.product_name}\n\tNo. of counts : ${orderdetail.count}\n\tPrice per count : ${orderdetail.price}\n\tBuyer name : ${orderdetail.username}\n\tDelivery Address : ${orderdetail.useraddress} ,${orderdetail.pincode}\n\tproduct Transaction Id : ${orderdetail._id}\n`;
                // console.log(orderdetail);
                htmlbody =
                    htmlbody +
                    `
            <div class="messagecontainer" style="display: flex;
            align-items: center;
            padding: 1px;
            margin: 1px;
            border: 1px solid aqua;">
                    <div class="imagecontainer"  style="display: flex;justify-content:center;align-items:center;margin:5px;">
                        <img src=${orderdetail.image} width="70" alt="img">
                    </div>
                    <div class="details" >
                        <h4 style="padding: 2px 1px;
                        margin: 0px;">${orderdetail.product_name}</h4>
                        <p style="padding: 1px;
                        margin: 0px;">Price per count : ${orderdetail.price}</p>
                        <p style="padding: 1px;
                        margin: 0px;">No. of count : ${orderdetail.count}</p>
                        <p style="padding: 1px;
                        margin: 0px;">Order Id : ${orderdetail._id}</p>
                    </div>
                </div>
            `;
                orderdetail.save((error, data) => {
                    if (error) {
                        console.log(error);
                    }
                });
                // console.log(value.pdt_name);
                i++;
            });
            let paidstatus = "Payable";
            if (req.body.paymentoption === "Cash") {
                paidstatus = "Payable";
            } else {
                paidstatus = "Paid";
            }
            htmlbody =
                htmlbody +
                `
        <div style="text-align: center;margin:10px">Total ${paidstatus} Amount : <span style="color: coral;font-weight:bold;font-size:150%;">${totalamount}</span></div>
    <h5 style="text-align: right;padding: 1px;
    margin: 0px; ">Thanks for using are website</h5>
    <h5 style="text-align: right; padding: 1px;
    margin: 0px;">From Himalaya shopping</h5>
        `;
            recieptbody =
                recieptbody +
                `\nTotal ${paidstatus} Amount : ${totalamount}\n\n\nThanks for using are website\nfrom Himalaya Shopping`;
            // console.log("Email for reciept : "+recieptemail);
            // console.log(recieptbody);
            // console.log(htmlbody);
            let maildetails = {
                from: "Himalaya Shopping",
                to: recieptemail,
                subject: "Reciept of order",
                text: recieptbody,
                html: htmlbody,
            };
            emailsender.sendMail(maildetails, (err, details) => {
                if (err) {
                    console.log(err);
                } else {
                    // console.log(details.response);
                }
            });
            cartdetails.deleteMany(
                {
                    useremail: req.session.useremail,
                },
                (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
    );
    res.status(200).send("placed");
});

app.post("/getfeedbackforproduct", redirectlogin, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.transaction_id,
        },
        {
            $set: {
                feedbackstars: req.body.starvalue,
            },
        },
        (err, acknowledge) => {
            if (err) {
                console.log(err);
            }
            // console.log(acknowledge);
        }
    );
    feedbackdetails.find(
        {
            product_id: req.body.product_id,
        },
        (err, data) => {
            // console.log(data);
            let overallrating = 0;
            let count = 0;
            if (data.length > 0) {
                // console.log('if');
                data.forEach((element) => {
                    overallrating = overallrating + element.stars;
                    count++;
                });
                overallrating = overallrating + req.body.starvalue;
                count++;
                overallrating = overallrating / count;
            } else {
                // console.log('else');
                overallrating = req.body.starvalue;
            }
            // console.log(overallrating);
            // console.log(count);
            products.updateOne(
                {
                    _id: req.body.product_id,
                },
                {
                    $set: {
                        rating: overallrating,
                    },
                },
                (err, acknowledge) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        }
    );
    let entry = {
        username: req.session.username,
        product_id: req.body.product_id,
        stars: req.body.starvalue,
        feedbackdesc: req.body.feedbackdesc,
    };
    let feedback = new feedbackdetails(entry);
    feedback.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send({
        message: "done",
    });
});

app.post("/helpcenterdata", (req, res) => {
    // console.log(req.body);
    let helpcenterdata = new helpcenterdetails(req.body);
    // console.log(helpcenterdata);
    helpcenterdata.save((err) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).send("done");
});

app.post("/adminauthenicator", (req, res) => {
    if (req.session.admin) {
        res.status(200).send({
            message: "admin is llogged in",
        });
    } else {
        res.status(404).send({
            message: "admin is not loggged in",
        });
    }
});

function adminredirect(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.status(404).send({
            message: "admin is not loggged in",
        });
    }
}

app.post("/adminlogin", (req, res) => {
    // console.log(req.body);
    admindetails.findOne(
        {
            adminemail: req.body.adminemail.toLowerCase(),
            adminpassword: req.body.adminpassword,
        },
        (err, data) => {
            if (data === null) {
                // console.log(err);
                // console.log('error in login');
                res.status(404).send({
                    massage: "invalid credentials",
                });
            } else {
                req.session.admin = true;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                // console.log('admin logged in');
                res.status(200).send({
                    message: "done",
                });
            }
        }
    );
});

app.post("/admintobedeliveredproducts", adminredirect, (req, res) => {
    orderdetails
        .find(
            {
                deliveryStatus: false,
            },
            (err, data) => {
                res.json(data);
            }
        )
        .sort({
            date_of_order: -1,
        });
});

app.post("/admindeliveredproducts", adminredirect, (req, res) => {
    orderdetails
        .find(
            {
                deliveryStatus: true,
            },
            (err, data) => {
                res.json(data);
            }
        )
        .sort({
            date_of_delivery: -1,
        });
});

app.post("/gettransactiondata", adminredirect, (req, res) => {
    orderdetails.find(
        {
            _id: req.body.pdt_transaction_id,
        },
        (err, data) => {
            res.json(data);
        }
    );
});

app.post("/getpackagingdata", adminredirect, (req, res) => {
    // console.log(req.body);
    orderdetails
        .find(
            {
                packingdate: null,
            },
            (err, data) => {
                // console.log(data);
                orderdetails
                    .find(
                        {
                            packingdate: {
                                $ne: null,
                            },
                            shippingdate: null,
                        },
                        (error, extradata) => {
                            // console.log(extradata);
                            res.status(200).json({
                                data,
                                extradata,
                            });
                        }
                    )
                    .sort({
                        packingdate: -1,
                    });
            }
        )
        .sort({
            date_of_order: 1,
        });
});
app.post("/getshippingdata", adminredirect, (req, res) => {
    // console.log(req.body);
    orderdetails
        .find(
            {
                shippingdate: null,
                packingdate: {
                    $ne: null,
                },
            },
            (err, data) => {
                // console.log(data);
                orderdetails
                    .find(
                        {
                            shippingdate: {
                                $ne: null,
                            },
                            branchreachingdate: null,
                        },
                        (error, extradata) => {
                            // console.log(extradata);
                            res.status(200).json({
                                data,
                                extradata,
                            });
                        }
                    )
                    .sort({
                        shippingdate: -1,
                    });
            }
        )
        .sort({
            date_of_order: 1,
        });
});

app.post("/updatepackagingstatus", adminredirect, (req, res) => {
    // console.log(req.body);
    req.body.ids.forEach((element, index) => {
        orderdetails.updateOne(
            {
                _id: element,
            },
            {
                $set: {
                    packingdate: Date(),
                    ispackednote: req.body.note,
                },
            },
            (err, status) => {
                // console.log(err);
                // console.log(status);
                if (!err) {
                    res.status(200).send("updated");
                } else {
                    res.status(400).send("not done");
                }
            }
        );
    });
});
app.post("/updateshippingstatus", adminredirect, (req, res) => {
    // console.log(req.body);
    req.body.ids.forEach((element, index) => {
        branchdetails.findOne(
            {
                $text: {
                    $search: req.body.pincode.toString(),
                },
            },
            (err, data) => {
                // console.log(data);
                orderdetails.updateOne(
                    {
                        _id: element,
                    },
                    {
                        $set: {
                            shippingdate: Date(),
                            isshippednote: req.body.note,
                            branchname: data.branchname,
                        },
                    },
                    (err, status) => {
                        if (!err) {
                            res.status(200).send("updated");
                        } else {
                            res.status(400).send("not done");
                        }
                    }
                );

                // console.log(err);
                // console.log(status);
            }
        );
    });
});

app.post("/undothepackedstatus", adminredirect, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.id,
        },
        {
            $set: {
                packingdate: null,
                ispackednote: null,
            },
        },
        (err, status) => {
            // console.log(err);
            // console.log(status);
            if (!err) {
                res.status(200).send("updated");
            } else {
                res.status(400).send("not done");
            }
        }
    );
});

app.post("/undotheshippedstatus", adminredirect, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.id,
        },
        {
            $set: {
                shippingdate: null,
                isshippednote: null,
                branchname: null,
            },
        },
        (err, status) => {
            // console.log(err);
            // console.log(status);
            if (!err) {
                res.status(200).send("updated");
            } else {
                res.status(400).send("not done");
            }
        }
    );
});

app.post("/adminlogout", (req, res) => {
    req.session.destroy((err) => {
        // console.log("admin session is destroyed");
    });
    res.status(200).send({
        massage: "admin is logoutted",
    });
});

// branch apis

function redirectloginbranch(req, res, next) {
    if (req.session.branchheademail) {
        next();
    } else {
        console.log("unauthorised");
        res.status(401).send("please login first");
    }
}

app.post("/authenicatebranch", (req, res) => {
    if (req.session.branchheademail) {
        console.log(req.session.branchname);
        console.log(req.session.branchname);
        res.status(200).send({
            name: req.session.branchname,
        });
    } else {
        res.status(400).send("please login first");
    }
});

app.post("/branchlogin", (req, res) => {
    console.log(req.body);
    branchdetails.findOne(
        {
            branchheademail: req.body.email.toLowerCase(),
            branchheadpassword: req.body.password,
        },
        (err, data) => {
            // console.log(data);
            if (data === null || data.length === 0) {
                res.status(404).send("not found");
            } else {
                req.session.branchheademail = data.branchheademail;
                req.session.branchname = data.branchname;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.status(200).send("done login");
            }
        }
    );
});

app.post("/branchassigingdata", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    orderdetails.find(
        {
            branchname: req.session.branchname,
            branchreachingdate: null,
            shippingdate: {
                $ne: null,
            },
        },
        (err, data) => {
            // console.log(data);
            res.status(200).json(data);
        }
    );
});

app.post("/getrecievingdata", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    orderdetails.find(
        {
            branchname: req.session.branchname,
            branchreachingdate: null,
            shippingdate: {
                $ne: null,
            },
        },
        (err, data) => {
            // console.log(data);
            orderdetails.find(
                {
                    branchname: req.session.branchname,
                    branchreachingdate: {
                        $ne: null,
                    },
                    branchleftingdate: null,
                },
                (err, extradata) => {
                    // console.log(extradata);
                    res.status(200).json({
                        data,
                        extradata,
                    });
                }
            );
        }
    );
});
app.post("/updatebranchrecievedstatus", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    req.body.ids.forEach((element, index) => {
        orderdetails.updateOne(
            {
                _id: element,
            },
            {
                $set: {
                    branchreachingdate: Date(),
                },
            },
            (err, status) => {
                // console.log(err);
                // console.log(status);
                if (!err) {
                    res.status(200).send("updated");
                } else {
                    res.status(400).send("not done");
                }
            }
        );
    });
});
app.post("/updatereachingingstatus", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.id,
        },
        {
            $set: {
                branchreachingdate: null,
            },
        },
        (err, status) => {
            // console.log(err);
            // console.log(status);
            if (!err) {
                res.status(200).send("updated");
            } else {
                res.status(400).send("not done");
            }
        }
    );
});
app.post("/getrecieveddata", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    orderdetails.find(
        {
            branchname: req.session.branchname,
            branchleftingdate: null,
            branchreachingdate: {
                $ne: null,
            },
        },
        (err, data) => {
            // console.log(data);
            orderdetails.find(
                {
                    branchname: req.session.branchname,
                    branchleftingdate: {
                        $ne: null,
                    },
                    nearreachingdate: null,
                },
                (err, extradata) => {
                    // console.log(extradata);
                    res.status(200).json({
                        data,
                        extradata,
                    });
                }
            );
        }
    );
});
app.post("/updatebranchsendingstatus", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    hubdetails.findOne(
        {
            $text: {
                $search: req.body.pincode,
            },
        },
        (err, data) => {
            // console.log(data);
            orderdetails.updateOne(
                {
                    _id: req.body.id,
                },
                {
                    $set: {
                        branchleftingdate: Date(),
                        hubname: data.hubname,
                    },
                },
                (err, status) => {
                    // console.log(err);
                    // console.log(status);
                    if (!err) {
                        res.status(200).send("updated");
                    } else {
                        res.status(400).send("not done");
                    }
                }
            );
        }
    );
});

app.post("/updatesendingstatus", redirectloginbranch, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.id,
        },
        {
            $set: {
                branchleftingdate: null,
                hubname: null,
            },
        },
        (err, status) => {
            // console.log(err);
            // console.log(status);
            if (!err) {
                res.status(200).send("updated");
            } else {
                res.status(400).send("not done");
            }
        }
    );
});

// hub apis

function rediderctloginhub(req, res, next) {
    if (req.session.hubheademail) {
        next();
    } else {
        console.log("unauthorised");
        res.status(40).send("please login first");
    }
}

app.post("/authenicatehub", (req, res) => {
    if (req.session.hubheademail) {
        // console.log(req.session.hubname);
        res.status(200).send({
            name: req.session.hubname,
        });
    } else {
        res.status(400).send("please login first");
    }
});

app.post("/hublogin", (req, res) => {
    console.log(req.body);
    hubdetails.findOne(
        {
            hubheademail: req.body.email.toLowerCase(),
            hubheadpassword: req.body.password,
        },
        (err, data) => {
            console.log(data);
            if (data === null || data.length === 0) {
                res.status(404).send("not found");
            } else {
                req.session.hubheademail = data.hubheademail;
                req.session.hubname = data.hubname;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.status(200).send("done login");
            }
        }
    );
});

app.post("/hubassigingdata", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    orderdetails.find(
        {
            hubname: "Navi Mumbai",
            nearreachingdate: null,
            branchleftingdate: {
                $ne: null,
            },
        },
        (err, data) => {
            // console.log(data);
            res.status(200).json(data);
        }
    );
});

app.post("/gethubrecievingdata", rediderctloginhub, (req, res) => {
    console.log(req.body);
    orderdetails.find(
        {
            hubname: "Navi Mumbai",
            nearreachingdate: null,
            branchleftingdate: {
                $ne: null,
            },
        },
        (err, data) => {
            // console.log(data);
            orderdetails.find(
                {
                    hubname: "Navi Mumbai",
                    nearreachingdate: {
                        $ne: null,
                    },
                    outofdelieverydatetime: null,
                },
                (err, extradata) => {
                    // console.log(extradata);
                    res.status(200).json({
                        data,
                        extradata,
                    });
                }
            );
        }
    );
});

app.post("/updatehubrecievingstatus", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    req.body.ids.forEach((element, index) => {
        orderdetails.updateOne(
            {
                _id: element,
            },
            {
                $set: {
                    nearreachingdate: Date(),
                },
            },
            (err, status) => {
                // console.log(err);
                // console.log(status);
                if (!err) {
                    res.status(200).send("updated");
                } else {
                    res.status(400).send("not done");
                }
            }
        );
    });
});

app.post("/updatehubreachingstatus", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.id,
        },
        {
            $set: {
                nearreachingdate: null,
            },
        },
        (err, status) => {
            // console.log(err);
            // console.log(status);
            if (!err) {
                res.status(200).send("updated");
            } else {
                res.status(400).send("not done");
            }
        }
    );
});
app.post("/gethubrecieveddata", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    orderdetails.find(
        {
            hubname: "Navi Mumbai",
            outofdelieverydatetime: null,
            nearreachingdate: {
                $ne: null,
            },
        },
        (err, data) => {
            // console.log(data);
            orderdetails.find(
                {
                    hubname: "Navi Mumbai",
                    outofdelieverydatetime: {
                        $ne: null,
                    },
                    date_of_delivery: null,
                },
                (err, extradata) => {
                    // console.log(extradata);
                    res.status(200).json({
                        data,
                        extradata,
                    });
                }
            );
        }
    );
});
app.post("/getdeliceryboyslisttodeliver", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    diliveryboysdetails.find(
        {
            $text: {
                $search: req.body.pincode,
            },
        },
        (err, data) => {
            if (data.length === 0) {
                res.status(400).send("not found");
            } else {
                let list = [];
                data.forEach((element) => {
                    list.push({
                        name: element.deliveryboyname,
                        ordernumbers: element.numberofdeliveriestobedone,
                        id: element._id,
                    });
                });
                // console.log(list);
                res.status(200).json({
                    list,
                });
            }
        }
    );
});

app.post("/updatehubsendingstatus", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    orderdetails.findOne(
        {
            _id: req.body.id,
        },
        (err, data) => {
            let otp = Math.floor(Math.random() * 10000000);
            let entry = {
                transaction_id: req.body.id,
                paymentmode: data.paymentMode,
                delivered_by: req.body.willdeliveredby,
                deliveryboyid: req.body.deliveryboyid,
                deliveredto: data.username,
                deliveryaddress: data.useraddress,
                deliverypincode: data.pincode,
                deliverybranchname: data.branchname,
                deliveryhubname: data.hubname,
                deliveryamount: data.price * data.count,
                deliverycount: data.count,
                otp_for_delivery: otp,
            };
            // console.log(entry);
            let deliverydetail = new deliverydetails(entry);
            deliverydetail.save((err) => {
                if (err) {
                    console.log(err);
                }
                orderdetails.updateOne(
                    {
                        _id: data._id,
                    },
                    {
                        $set: {
                            otpfordelivery: otp,
                            outofdelieverydatetime: Date(),
                            outofdelieverynote: `OTP for Your Product is ${otp} , It is needed at time of Delivery comfirmation`,
                        },
                    },
                    (err, status) => {
                        if (err) {
                            console.log(err);
                        }
                        diliveryboysdetails.updateOne(
                            {
                                _id: req.body.deliveryboyid,
                            },
                            {
                                $inc: {
                                    numberofdeliveriestobedone: 1,
                                },
                            },
                            (err, status) => {
                                if (!err) {
                                    res.status(200).send("Done");
                                }
                            }
                        );
                    }
                );
            });
        }
    );
});

app.post("/updatehubsendedstatus", rediderctloginhub, (req, res) => {
    // console.log(req.body);
    orderdetails.updateOne(
        {
            _id: req.body.id,
        },
        {
            $set: {
                outofdelieverydatetime: null,
                outofdelieverynote: null,
                otpfordelivery: null,
            },
        },
        (err, status) => {
            // console.log(err);
            // console.log(status);
            if (!err) {
                deliverydetails.findOne(
                    {
                        transaction_id: req.body.id,
                    },
                    (err, data) => {
                        diliveryboysdetails.updateOne(
                            {
                                _id: data.deliveryboyid,
                            },
                            {
                                $inc: {
                                    numberofdeliveriestobedone: -1,
                                },
                            },
                            (err, status) => {
                                // console.log(status);
                                if (!err) {
                                    deliverydetails.deleteOne(
                                        {
                                            transaction_id: req.body.id,
                                        },
                                        (err, status) => {
                                            if (!err) {
                                                res.status(200).send("Done");
                                            } else {
                                                res.status(400).send(
                                                    "not done"
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                );
            }
        }
    );
});

// Delivery Boy apis

app.post("/authenicatedeliverboy", (req, res) => {
    if (req.session.deliveryboyid) {
        console.log(req.session.deliverboy);
        console.log(req.session.deliverboy);
        res.status(200).send({
            name: req.session.deliverboy,
        });
    } else {
        res.status(400).send("please login first");
    }
});

app.post("/deliveryboylogin", (req, res) => {
    // console.log(req.body);
    diliveryboysdetails.findOne(
        {
            deliveryboyemail: req.body.email.toLowerCase(),
            deliveryboypassword: req.body.password,
        },
        (err, data) => {
            // console.log(data);
            if (data === null || data.length === 0) {
                res.status(404).send("not found");
            } else {
                req.session.deliveryboyid = data._id;
                req.session.deliverboy = data.deliveryboyname;
                req.session.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.status(200).send("done login");
            }
        }
    );
});

app.post("/getdeliveryassigndata", (req, res) => {
    deliverydetails.find(
        {
            deliveryboyid: req.session.deliveryboyid,
            status: false,
        },
        (err, data) => {
            // console.log(data);
            res.status(200).json(data);
        }
    );
});

app.post("/finaldeliveryvarification", (req, res) => {
    // console.log(req.body);

    orderdetails.findOne(
        {
            _id: req.body.transaction_id,
        },
        (er, data) => {
            // console.log(data.otpfordelivery);
            // console.log(req.body.otp);
            if (data.otpfordelivery === parseInt(req.body.otp)) {
                orderdetails.updateOne(
                    {
                        _id: req.body.transaction_id,
                    },
                    {
                        $set: {
                            otpfordelivery: null,
                            outofdelieverynote: null,
                            date_of_delivery: Date(),
                            deliveryStatus: true,
                        },
                    },
                    (err, status) => {
                        if (!err) {
                            deliverydetails.updateOne(
                                {
                                    _id: req.body.deliveryid,
                                },
                                {
                                    status: true,
                                },
                                (errr, status) => {
                                    if (!errr) {
                                        diliveryboysdetails.updateOne(
                                            {
                                                _id: req.session.deliveryboyid,
                                            },
                                            {
                                                $inc: {
                                                    numberofdeliveriestobedone:
                                                        -1,
                                                },
                                            },
                                            (errrr, status) => {
                                                if (!errrr) {
                                                    res.status(200).send(
                                                        "sone"
                                                    );
                                                } else {
                                                    res.status(403).send(
                                                        "error occured"
                                                    );
                                                }
                                            }
                                        );
                                    } else {
                                        res.status(403).send("error occured");
                                    }
                                }
                            );
                        } else {
                            res.status(403).send("error occured");
                        }
                    }
                );
            } else {
                // console.log("else");
                res.status(403).send("otp error");
            }
        }
    );
});

app.post("/getdeliveredproductfordeliveredproduct", (req, res) => {
    console.log(req.session);
    deliverydetails
        .find(
            { status: true, deliveryboyid: req.session.deliveryboyid },
            (err, data) => {
                if (!err) {
                    // console.log(data);
                    res.status(200).json(data);
                } else {
                    res.status(404).send("err");
                }
            }
        )
        .sort({
            _id: -1,
        });
});

app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        console.log("session destroyed");
    });
    res.status(200).send("session destroyed");
});

app.listen(port, () => {
    console.log("done \ngo and see at http://127.0.0.1:" + port);
});
