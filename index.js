const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const twilio = require('twilio');
//implement jwt token
const jwt = require('jsonwebtoken');

// Twilio credentials
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioClient = twilio(accountSid, authToken);

const { addProducts, createBill, addCompany, addUser, paybill, addShop, totalProduct, payShopBill, PostReturnProduct, AddCompanyProducts } = require('./post');
const { getproducts, getBill, getCompany, getUsers, getShop, getTotalProduct, getbillbyshop, ReturnProduct, getCompanyProducts, getCompanyProductsCollection, getProductsByDate, getTotallSellByDate, getCodeCollection, getStoreProductDate } = require('./get');
const { deleteProduct, deleteshop, deleteCompany } = require('./Delete');
const { getProductsByBarCode, getBillsById, getProductsByProductName, getEmployee, getEmployDetails, getemploybille, getProductsByProductNameAndWatt, getBillByDate, getProductByDate, getEmployPaymentByDate, getProductsByPnameComNameWatt, getShopPaymentByDate, getProductById, getShopById, getReturnProducts, getSellByDate, SellProductsByBarCode, getProductsById, getBillById } = require('./getDataById');
const { UpdateProduct, UpdateProductbill, UpdateTotalProduct, Upadate_Product_Remaining_Balance } = require('./Update');

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
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
        const CodeCollection = client.db("shahjalal").collection("code");
        const BillCollection = client.db("shahjalal").collection("CreateBill");
        const CompanyCollection = client.db("shahjalal").collection("Company");
        const UserCollection = client.db("shahjalal").collection("Users");
        const PayCollection = client.db("shahjalal").collection("billpay");
        const TotalProductCollection = client.db("shahjalal").collection("totalproduct");
        const PayShopBillCollection = client.db("shahjalal").collection("payshopbill");
        const ReturnProductCollection = client.db("shahjalal").collection("ReturnProductCollection");
        const CompanyProductsCollection = client.db("shahjalal").collection("AddCompanyProducts");

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

        app.post('/send-sms', (req, res) => {
            const { to, body } = req.body;

            twilioClient.messages
                .create({
                    to,
                    from: '+14327772745',
                    body,
                })
                .then(message => {
                    console.log(`Message sent with SID: ${message.sid}`);
                    res.json({ success: true });
                })
                .catch(error => {
                    console.error(`Error sending message: ${error.message}`);
                    res.status(500).json({ success: false, error: error.message });
                });
        });

        deleteCompany(app, CompanyCollection, ObjectId, verifyJWT)
        addCompany(CompanyCollection, app, verifyJWT)
        SellProductsByBarCode(app, CompanyProductsCollection, verifyJWT)
        getTotallSellByDate(BillCollection, app, verifyJWT)
        getStoreProductDate(BillCollection, app, verifyJWT) 
        getCodeCollection(CodeCollection, app, verifyJWT)
        getProductsById(app, ObjectId, CompanyProductsCollection, verifyJWT)
        getBillById(app, ObjectId, BillCollection, verifyJWT)
        getProductsByDate(CompanyProductsCollection, app, verifyJWT)
        AddCompanyProducts(CompanyProductsCollection, app, verifyJWT)
        getCompanyProductsCollection(CompanyProductsCollection, app, verifyJWT)
        getCompanyProducts(CompanyProductsCollection, app, verifyJWT)
        addShop(ShopCollection, app, verifyJWT)
        getSellByDate(app, BillCollection, verifyJWT)
        getShop(ShopCollection, app, verifyJWT)
        deleteshop(app, ShopCollection, ObjectId, verifyJWT)
        getProductsByProductNameAndWatt(app, ProuductCollection, verifyJWT)
        getbillbyshop(PayShopBillCollection, app, verifyJWT)
        getShopById(app, PayShopBillCollection, verifyJWT)
        Upadate_Product_Remaining_Balance(app, CompanyProductsCollection, ObjectId, verifyJWT)
        getShopPaymentByDate(app, PayShopBillCollection, verifyJWT)
        getProductById(app, ObjectId, CompanyProductsCollection, verifyJWT)
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
        getproducts(CompanyProductsCollection, app, verifyJWT)
        getProductByDate(app, CompanyProductsCollection, verifyJWT)
        getProductsByProductName(app, ProuductCollection, verifyJWT)
        deleteProduct(app, CompanyProductsCollection, ObjectId, verifyJWT)
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
