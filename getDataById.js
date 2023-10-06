const getProductsByBarCode = (app, ProuductCollection, verifyJWT) => {
    app.get('/BarCodeData/:id', verifyJWT, async (req, res) => {
        const CodeId = req.params.id;
        const BarCode = await ProuductCollection.find({}).toArray();
        const result = await BarCode.filter(Product => Product.barcode == CodeId);
        res.send(result);
    })
}

const getShopById = (app, PayShopBillCollection, verifyJWT) => {
    app.get('/getShopById/:id', verifyJWT, async (req, res) => {
        const shop_id = req.params.id;
        const shopId = await PayShopBillCollection.find({}).toArray();
        const result = await shopId.filter(Product => Product.productid == shop_id);
        res.send(result);
    })
}

const getProductsByProductName = (app, ProuductCollection, verifyJWT) => {
    app.get('/getProductsByProductName/:name', verifyJWT, async (req, res) => {
        const Pname = req.params.name;
        const productName = await ProuductCollection.find({}).toArray();
        const result = await productName.filter(Product => Product.productname == Pname);
        res.send(result);
    })
}

const getProductsByProductNameAndWatt = (app, ProuductCollection, verifyJWT) => {
    app.get('/getProductsByProductNameAndWatt/:name/:watt', verifyJWT, async (req, res) => {
        const Pname = req.params.name;
        const watt = req.params.watt;
        const productName = await ProuductCollection.find({ productname: Pname, watt: watt }).sort({ createdAt: -1 }).toArray();
        res.send(productName);
    })
}

const getBillsById = (app, ObjectId, BillCollection, verifyJWT) => {
    app.get('/getbills/:id', verifyJWT, async (req, res) => {
        const billId = req.params.id;
        try {
            const bill = await BillCollection.findOne({ _id: new ObjectId(billId) });
            res.send(bill);
        } catch (error) {

            res.status(500).send('Error retrieving bill by id');
        }
    });
};

const getProductById = (app, ObjectId, ProductCollection, verifyJWT) => {
    app.get('/getProductById/:id', verifyJWT, async (req, res) => {
        const productId = req.params.id;
        try {
            const bill = await ProductCollection.findOne({ _id: new ObjectId(productId) });
            res.send(bill);
        } catch (error) {

            res.status(500).send('Error retrieving bill by id');
        }
    });
};

const getEmployee = (PayCollection, app, verifyJWT) => {
    app.get("/getemployee", verifyJWT, async (req, res) => {
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
            res.status(500).send("An error occurred while processing your request");
        }
    });
};

const getEmployDetails = (app, ObjectId, PayCollection, verifyJWT) => {
    app.get('/getemploy/:id', verifyJWT, async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await PayCollection.findOne({ _id: new ObjectId(userId) });
            res.send(user);
        } catch (error) {


        }
    });
};

const getemploybille = (app, PayCollection, verifyJWT) => {
    app.get('/getemploybille/:number', verifyJWT, async (req, res) => {
        const Pnumber = req.params.number;
        const productName = await PayCollection.find({}).sort({ _id: -1 }).toArray();
        const result = await productName.filter(Product => Product.number == Pnumber);
        res.send(result);
    })
}

const getBillByDate = (app, BillCollection, verifyJWT) => {
    app.get('/getbillbydate/:email/:date', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        const date = req.params.date;
        const bill = await BillCollection.find({ email: userEmail, month: date }).sort({ _id: -1 }).toArray();
        res.send(bill)
    })
}


const getReturnProducts = (app, ReturnProductCollection, verifyJWT) => {
    app.get('/getReturnProducts', verifyJWT, async (req, res) => {
        const products = await ReturnProductCollection.find({}).sort({ _id: -1 }).toArray();
        res.send(products)
    })
}

const getSellByDate = (app, BillCollection, verifyJWT) => {
    app.get('/getSellByDate/:date', verifyJWT, async (req, res) => {
        const date = req.params.date;
        const products = await BillCollection.find({ month: date }).sort({ _id: -1 }).toArray();
        res.send(products)
    })
}

const getProductByDate = (app, ProuductCollection, verifyJWT) => {
    app.get('/getproductbydate/:email/:date', verifyJWT, async (req, res) => {
        const date = req.params.date;
        const userEmail = req.params.email;
        const product = await ProuductCollection.find({ email: userEmail, month: date }).sort({ _id: -1 }).toArray();
        res.send(product)
    })
}

const getEmployPaymentByDate = (app, PayCollection, verifyJWT) => {
    app.get('/getemploypaymentbydate/:date', verifyJWT, async (req, res) => {
        const dateParam = req.params.date;
        let filter = {};

        if (dateParam.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // If the provided parameter is in the format "YYYY-MM-DD", use it as a full date filter
            filter = { "date": dateParam };
        }
        else if (dateParam.match(/^\d{4}-\d{2}$/)) {
            // If the provided parameter is in the format "YYYY-MM", construct a regex to match all dates in that month
            const yearMonth = dateParam.split('-');
            const year = yearMonth[0];
            const month = yearMonth[1];
            const date = year + "-" + month;
            filter = {
                "month": { $regex: date }
            };
        }
        else if (dateParam.match(/^\d{4}/)) {
            // If the provided parameter is in the format "YYYY", construct a regex to match all dates in that month
            const yearMonth = dateParam.split('-');
            const year = yearMonth[0];
            const date = year;
            filter = {
                "year": { $regex: date }
            };
        }
        else {
            return res.status(400).send("Invalid date format");
        }

        try {
            const transactions = await PayCollection.find(filter).toArray();
            res.send({ transactions });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    });
};

const getShopPaymentByDate = (app, PayShopBillCollection, verifyJWT) => {
    app.get('/getShopPaymentByDate/:email/:date', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        const dateParam = req.params.date;

        let query = { email: userEmail };

        if (dateParam.length === 4) {
            // Assuming 'dateParam' is a 4-digit year (e.g., '2023')
            query.date = { $regex: `^${dateParam}-` };
        } else if (dateParam.length === 7) {
            // Assuming 'dateParam' is in 'YYYY-MM' format (e.g., '2023-10')
            query.date = { $regex: `^${dateParam}-` };
        } else {
            // Assuming 'dateParam' is in 'YYYY-MM-DD' format (e.g., '2023-10-01')
            query.date = dateParam;
        }

        const payment = await PayShopBillCollection.find(query).sort({ _id: -1 }).toArray();
        res.send(payment);
    })
}

const getProductsByPnameComNameWatt = (app, TotalProductCollection, verifyJWT) => {
    app.get('/getProductsByPnameComNameWatt/:pname/:watt/:cname', verifyJWT, async (req, res) => {
        const Pname = req.params.pname;
        const watt = req.params.watt;
        const cname = req.params.cname;
        const productName = await TotalProductCollection.find({ productname: Pname, watt: watt, companyname: cname }).sort({ createdAt: -1 }).toArray();
        res.send(productName);
    })
}

const SellProductsByBarCode = (app, CompanyProductsCollection, verifyJWT) => {
    app.get('/getProductsById/:productId', verifyJWT, async (req, res) => {
        const productId = req.params.productId;
        try {
            const transactions = await CompanyProductsCollection.find({
                "products.code": productId
            }).toArray();

            // Find the specific product within the matching transactions
            let matchingProduct = null;
            transactions.forEach(transaction => {
                const product = transaction.products.find(p => p.code === productId);
                if (product) {
                    matchingProduct = product;
                }
            });

            res.send(matchingProduct);
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    });
};

const getProductsById = (app, ObjectId, ProductModel, verifyJWT) => {
    app.get('/ProductsById/:id', verifyJWT, async (req, res) => {
        const productId = req.params.id;

        try {
            const product = await ProductModel.findOne({ _id: new ObjectId(productId) });
            if (!product) {
            }
            res.json(product);
        } catch (error) {
        }
    });
};
const getBillById = (app, ObjectId, BillProduct, verifyJWT) => {
    app.get('/getBillById/:id', verifyJWT, async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await BillProduct.findOne({ _id: new ObjectId(productId) });
            if (!product) {
            }
            res.json(product);
        } catch (error) {
        }
    });
};


module.exports = { getProductsByBarCode, getBillById, getProductsById, SellProductsByBarCode, getSellByDate, getReturnProducts, getEmployPaymentByDate, getShopPaymentByDate, getProductByDate, getemploybille, getProductsByProductNameAndWatt, getBillsById, getProductsByProductName, getEmployee, getEmployDetails, getBillByDate, getProductsByPnameComNameWatt, getProductById, getShopById };