const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

//implement jwt token
const jwt = require('jsonwebtoken');

const { addProducts, createBill, addCompany, addUser, paybill, addShop, totalProduct, payShopBill, PostReturnProduct } = require('./post');
const { getproducts, getBill, getCompany, getUsers, getShop, getTotalProduct, getbillbyshop, ReturnProduct } = require('./get');
const { deleteProduct, deleteshop, deleteCompany } = require('./Delete');
const { getProductsByBarCode, getBillsById, getProductsByProductName, getEmployee, getEmployDetails, getemploybille, getProductsByProductNameAndWatt, getBillByDate, getProductByDate, getEmployPaymentByDate, getProductsByPnameComNameWatt, getShopPaymentByDate, getProductById, getShopById, getReturnProducts, getSellByDate } = require('./getDataById');
const { UpdateProduct, UpdateProductbill, UpdateTotalProduct, Upadate_Product_Remaining_Balance } = require('./Update');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello")
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7ckpjwn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// --------------------------jwt start---------------------------------

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            // return res.status(401).send({ message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })
}

// ------------------------------jwt stop--------------------------
async function run() {
    try {
        const ProuductCollection = client.db("shahjalal").collection("product");
        const ShopCollection = client.db("shahjalal").collection("shop");
        const BillCollection = client.db("shahjalal").collection("CreateBill");
        const CompanyCollection = client.db("shahjalal").collection("Company");
        const UserCollection = client.db("shahjalal").collection("Users");
        const PayCollection = client.db("shahjalal").collection("billpay");
        const TotalProductCollection = client.db("shahjalal").collection("totalproduct");
        const PayShopBillCollection  = client.db("shahjalal").collection("payshopbill");
        const ReturnProductCollection = client.db("shahjalal").collection("ReturnProductCollection");

        // jwt
        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await UserCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5d' })
                return res.send({ accessToken: token });
            }
            res.status(403).send({ accessToken: '' })
        });
        
        deleteCompany(app, CompanyCollection, ObjectId, verifyJWT)
        addCompany(CompanyCollection, app, verifyJWT)
        addShop(ShopCollection, app, verifyJWT)
        getSellByDate(app, BillCollection, verifyJWT)
        getShop(ShopCollection, app, verifyJWT)
        deleteshop(app, ShopCollection, ObjectId, verifyJWT)
        getProductsByProductNameAndWatt(app, ProuductCollection, verifyJWT)
        getbillbyshop(PayShopBillCollection, app, verifyJWT)
        getShopById(app, PayShopBillCollection, verifyJWT)
        Upadate_Product_Remaining_Balance(app, ProuductCollection, ObjectId, verifyJWT)
        getShopPaymentByDate(app, PayShopBillCollection, verifyJWT)
        getProductById(app, ObjectId, ProuductCollection, verifyJWT)
        getCompany(CompanyCollection, app, verifyJWT)
        getProductsByPnameComNameWatt(app, TotalProductCollection, verifyJWT)
        totalProduct(TotalProductCollection, app, verifyJWT)
        payShopBill(PayShopBillCollection, app, verifyJWT)
        getTotalProduct(TotalProductCollection, app, verifyJWT)
        UpdateTotalProduct(app, TotalProductCollection, ObjectId, verifyJWT)
        addUser(UserCollection, app, verifyJWT)
        getUsers(UserCollection, app, verifyJWT)
        paybill(PayCollection, app, verifyJWT)
        getEmployPaymentByDate(app, PayCollection, verifyJWT)
        getEmployDetails(app, ObjectId, PayCollection, verifyJWT)
        getemploybille(app, PayCollection, verifyJWT)
        getEmployee(PayCollection, app, verifyJWT)
        addProducts(ProuductCollection, app, verifyJWT)
        getproducts(ProuductCollection, app, verifyJWT)
        getProductByDate(app, ProuductCollection, verifyJWT)
        getProductsByProductName(app, ProuductCollection, verifyJWT)
        deleteProduct(app, ProuductCollection, ObjectId, verifyJWT)
        getProductsByBarCode(app, ProuductCollection, verifyJWT)
        createBill(BillCollection, app, verifyJWT)
        getBill(BillCollection, app, verifyJWT)
        getBillByDate(app, BillCollection, verifyJWT)
        UpdateProductbill(app, BillCollection, ObjectId, verifyJWT)
        UpdateProduct(app, ProuductCollection, ObjectId, verifyJWT)
        getBillsById(app, ObjectId, BillCollection, verifyJWT)
        PostReturnProduct(ReturnProductCollection, app, verifyJWT)
        getReturnProducts(app, ReturnProductCollection, verifyJWT)
        ReturnProduct(ReturnProductCollection, app, verifyJWT) 
    }

    finally { }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})
