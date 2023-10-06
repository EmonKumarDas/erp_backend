const getproducts = (ProuductCollection, app, verifyJWT) => {
    app.get('/getProducts/', verifyJWT, async (req, res) => {
        try {
            const result = await ProuductCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    });
};


const getCodeCollection = (CodeCollection, app, verifyJWT) => {
    app.get('/getCodeCollection/', verifyJWT, async (req, res) => {
        try {
            const result = await CodeCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    });
};


const getBill = (BillCollection, app, verifyJWT) => {
    app.get('/getBill/:email', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        let query = {};
        if (userEmail) {
            query = { email: userEmail };
        }
        try {
            const result = await BillCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(result);
        }
        catch (error) {
        }
    });
};



const getCompany = (CompanyCollection, app, verifyJWT) => {
    app.get('/getCompany/:email', async (req, res) => {
        const userEmail = req.params.email; // Get the email from the URL parameter

        let query = {}; // Default query to get all companies

        if (userEmail) {
            // If userEmail is provided, add the email to the query to filter data based on the email
            query = { email: userEmail };
        }

        try {
            const result = await CompanyCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    });
};


const getUsers = (UsersCollection, app, verifyJWT) => {
    app.get('/getUsers', async (req, res) => {
        try {
            const result = await UsersCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
        }
    })
}


const getShop = (ShopCollection, app, verifyJWT) => {
    app.get('/getshop', verifyJWT, async (req, res) => {
        try {
            const result = await ShopCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    })
}


const getTotalProduct = (TotalProductCollection, app, verifyJWT) => {
    app.get('/getTotalProduct/:email', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        try {
            const result = await TotalProductCollection.find({ email: userEmail }).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    })
}


const getbillbyshop = (PayShopBillCollection, app, verifyJWT) => {
    app.get('/getbillbyshop/:email', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        try {
            const result = await PayShopBillCollection.find({ email: userEmail }).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    })
}


const ReturnProduct = (ReturnProductCollection, app, verifyJWT) => {
    app.get('/ReturnProductCollection/:email', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        try {
            const result = await ReturnProductCollection.find({ email: userEmail }).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    })
}


const getCompanyProducts = (getCompanyProducts, app, verifyJWT) => {
    app.get('/getCompanyProducts/:email', verifyJWT, async (req, res) => {
        const userEmail = req.params.email;
        try {
            const result = await getCompanyProducts.find({ email: userEmail }).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {

        }
    })
}


const getCompanyProductsCollection = (CompanyProductsCollection, app, verifyJWT) => {
    app.get('/CompanyProductsCollection/:email', verifyJWT, async (req, res) => {
        const userMail = req.params.email;
        try {
            const result = await CompanyProductsCollection.find({ email: userMail }).sort({ _id: -1 }).toArray();
            res.send(result);
        }
        catch (error) {

        }
    })
}

const getProductsByDate = (CompanyProductsCollection, app, verifyJWT) => {
    app.get('/getProductsByDate/:date', async (req, res) => {
        const dateParam = req.params.date;
        let filter = {};

        if (dateParam.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // If the provided parameter is in the format "YYYY-MM-DD", use it as a full date filter
            filter = { "payamount.get_date": dateParam };
        }
        else if (dateParam.match(/^\d{4}-\d{2}$/)) {
            // If the provided parameter is in the format "YYYY-MM", construct a regex to match all dates in that month
            const yearMonth = dateParam.split('-');
            const year = yearMonth[0];
            const month = yearMonth[1];
            const date = year + "-" + month;
            filter = {
                "payamount.month": { $regex: date }
            };
        }
        else if (dateParam.match(/^\d{4}/)) {
            // If the provided parameter is in the format "YYYY", construct a regex to match all dates in that month
            const yearMonth = dateParam.split('-');
            const year = yearMonth[0];
            const date = year;
            filter = {
                "payamount.year": { $regex: date }
            };
        }
        else {
            return res.status(400).send("Invalid date format");
        }

        try {
            const transactions = await CompanyProductsCollection.find(filter).toArray();
            let totalAdvance = 0;
            transactions.forEach(transaction => {
                transaction.payamount.forEach(pay => {
                    if (pay.month === dateParam || pay.get_date === dateParam || pay.year === dateParam) {
                        totalAdvance += pay.advance;
                    }
                });
            });

            res.send({ totalAdvance });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    });
};

const getTotallSellByDate = (BillCollection, app, verifyJWT) => {
    app.get('/getTotallSellByDate/:month', verifyJWT, async (req, res) => {
        const month = req.params.month;
        try {
            const transactions = await BillCollection.find({
                "pay_advance_by_date.month": month
            }).toArray();
            let totalAdvance = 0;
            transactions.forEach(transaction => {
                transaction.pay_advance_by_date.forEach(pay => {
                    if (pay.month === month) {
                        totalAdvance += pay.advance;
                    }
                });
            });
            res.send({ totalAdvance });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    })
}



const getStoreProductDate = (BillCollection, app, verifyJWT) => {
    app.get('/getStoreProductDate/:date', async (req, res) => {
        const dateParam = req.params.date;
        let filter = {};

        if (dateParam.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // If the provided parameter is in the format "YYYY-MM-DD", use it as a full date filter
            filter = { "pay_advance_by_date.date": dateParam };
        }
        else if (dateParam.match(/^\d{4}-\d{2}$/)) {
            // If the provided parameter is in the format "YYYY-MM", construct a regex to match all dates in that month
            const yearMonth = dateParam.split('-');
            const year = yearMonth[0];
            const month = yearMonth[1];
            const date = year + "-" + month;
            filter = {
                "pay_advance_by_date.month": { $regex: date }
            };
        }
        else if (dateParam.match(/^\d{4}/)) {
            // If the provided parameter is in the format "YYYY", construct a regex to match all dates in that month
            const yearMonth = dateParam.split('-');
            const year = yearMonth[0];
            const date = year;
            filter = {
                "pay_advance_by_date.year": { $regex: date }
            };
        }
        else {
            return res.status(400).send("Invalid date format");
        }

        try {
            const transactions = await BillCollection.find(filter).toArray();
            let totalAdvance = 0;
            transactions.forEach(transaction => {
                transaction.pay_advance_by_date.forEach(pay => {
                    if (pay.month === dateParam || pay.date === dateParam || pay.year === dateParam) {
                        totalAdvance += pay.advance;
                    }
                });
            });

            res.send({ totalAdvance });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    });
};

module.exports = { getproducts, getStoreProductDate, getBill, getCodeCollection, getCompanyProducts, getProductsByDate, getTotallSellByDate, getCompanyProductsCollection, getCompany, ReturnProduct, getUsers, getbillbyshop, getShop, getTotalProduct };