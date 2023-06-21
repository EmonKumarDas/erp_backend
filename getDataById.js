const getProductsByBarCode = (app, ProuductCollection) => {
    app.get('/BarCodeData/:id', async (req, res) => {
        const CodeId = req.params.id;
        const BarCode = await ProuductCollection.find({}).toArray();
        const result = await BarCode.filter(Product => Product.barcode == CodeId);
        res.send(result);
    })
}

const getProductsByProductName = (app, ProuductCollection) => {
    app.get('/getProductsByProductName/:name', async (req, res) => {
        const Pname = req.params.name;
        const productName = await ProuductCollection.find({}).toArray();
        const result = await productName.filter(Product => Product.productname == Pname);
        res.send(result);
    })
}

const getProductsByProductNameAndWatt = (app, ProuductCollection) => {
    app.get('/getProductsByProductNameAndWatt/:name/:watt', async (req, res) => {
        const Pname = req.params.name;
        const watt = req.params.watt;
        const productName = await ProuductCollection.find({ productname: Pname, watt: watt }).sort({ createdAt: -1 }).toArray();
        res.send(productName);
    })
}

const getBillsById = (app, ObjectId, BillCollection) => {
    app.get('/getbills/:id', async (req, res) => {
        const billId = req.params.id;
        try {
            const bill = await BillCollection.findOne({ _id: new ObjectId(billId) });
            res.send(bill);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error retrieving bill by id');
        }
    });
};

const getEmployee = (PayCollection, app) => {
    app.get("/getemployee", async (req, res) => {
        try {
            const name = req.query.name;
            const number = req.query.number;

            // Create the query using regular expressions
            const query = {
                name: { $regex: new RegExp(name, "i") },
                number: { $regex: new RegExp(number, "i") },
            };

            // Find the documents that match the query
            const documents = await PayCollection.find(query).toArray();
            res.send(documents);
        } catch (err) {
            console.error(err);
            res.status(500).send("An error occurred while processing your request");
        }
    });
};

const getEmployDetails = (app, ObjectId, PayCollection) => {
    app.get('/getemploy/:id', async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await PayCollection.findOne({ _id: new ObjectId(userId) });
            res.send(user);
        } catch (error) {
            console.log(error);
            res.status(500).send('Error retrieving user by id');
        }
    });
};

const getemploybille = (app, PayCollection) => {
    app.get('/getemploybille/:number', async (req, res) => {
        const Pnumber = req.params.number;
        const productName = await PayCollection.find({}).sort({ _id: -1 }).toArray();
        const result = await productName.filter(Product => Product.number == Pnumber);
        res.send(result);
    })
}

const getBillByDate = (app, BillCollection) => {
    app.get('/getbillbydate/:date', async (req, res) => {
        const date = req.params.date;
        const bill = await BillCollection.find({ month: date }).sort({ _id: -1 }).toArray();
        res.send(bill)
    })
}

const getProductByDate = (app, ProuductCollection) => {
    app.get('/getproductbydate/:date', async (req, res) => {
        const date = req.params.date;
        const product = await ProuductCollection.find({ month: date }).sort({ _id: -1 }).toArray();
        res.send(product)
    })
}

const getEmployPaymentByDate = (app, PayCollection) => {
    app.get('/getemploypaymentbydate/:date', async (req, res) => {
        const date = req.params.date;
        const payment = await PayCollection.find({ month: date }).sort({ _id: -1 }).toArray();
        res.send(payment)
    })
}
const getShopPaymentByDate = (app, PayShopBillCollection) => {
    app.get('/getShopPaymentByDate/:date', async (req, res) => {
        const date = req.params.date;
        const payment = await PayShopBillCollection.find({ month: date }).sort({ _id: -1 }).toArray();
        res.send(payment)
    })
}

const getProductsByPnameComNameWatt = (app, TotalProductCollection) => {
    app.get('/getProductsByPnameComNameWatt/:pname/:watt/:cname', async (req, res) => {
        const Pname = req.params.pname;
        const watt = req.params.watt;
        const cname = req.params.cname;
        const productName = await TotalProductCollection.find({ productname: Pname, watt: watt, companyname: cname }).sort({ createdAt: -1 }).toArray();
        res.send(productName);
    })
}

module.exports = { getProductsByBarCode, getEmployPaymentByDate,getShopPaymentByDate, getProductByDate, getemploybille, getProductsByProductNameAndWatt, getBillsById, getProductsByProductName, getEmployee, getEmployDetails, getBillByDate, getProductsByPnameComNameWatt };