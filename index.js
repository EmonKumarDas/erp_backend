const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
//implement jwt token
const jwt = require('jsonwebtoken');
const { addProducts, createBill, addCompany, addUser, paybill, addShop } = require('./post');
const { getproducts, getBill, getCompany, getUsers, getShop } = require('./get');
const { deleteProduct } = require('./Delete');
const { getProductsByBarCode, getBillsById, getProductsByProductName, getEmployee, getEmployDetails, getemploybille, getProductsByProductNameAndWatt, getBillByDate, getProductByDate, getEmployPaymentByDate } = require('./getDataById');
const { UpdateProduct, UpdateProductbill } = require('./Update');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello")
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qwt8kth.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const ProuductCollection = client.db("shahjalal").collection("product");
        const ShopCollection = client.db("shahjalal").collection("shop");
        const BillCollection = client.db("shahjalal").collection("CreateBill");
        const CompanyCollection = client.db("shahjalal").collection("Company");
        const UserCollection = client.db("shahjalal").collection("Users");
        const PayCollection = client.db("shahjalal").collection("billpay");

        addCompany(CompanyCollection, app)
        addShop(ShopCollection, app)
        getShop(ShopCollection, app)
        getProductsByProductNameAndWatt(app, ProuductCollection)
        getCompany(CompanyCollection, app)
        addUser(UserCollection, app)
        getUsers(UserCollection, app)
        paybill(PayCollection, app)
        getEmployPaymentByDate(app, PayCollection)
        getEmployDetails(app, ObjectId, PayCollection)
        getemploybille(app, PayCollection)
        getEmployee(PayCollection, app)
        addProducts(ProuductCollection, app)
        getproducts(ProuductCollection, app)
        getProductByDate(app, ProuductCollection)
        getProductsByProductName(app, ProuductCollection)
        deleteProduct(app, ProuductCollection, ObjectId)
        getProductsByBarCode(app, ProuductCollection)
        createBill(BillCollection, app)
        getBill(BillCollection, app)
        getBillByDate(app, BillCollection)
        UpdateProductbill(app, BillCollection, ObjectId)
        UpdateProduct(app, ProuductCollection, ObjectId)
        getBillsById(app, ObjectId, BillCollection)
    }
    finally { }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`listening on ${port}`);
})
