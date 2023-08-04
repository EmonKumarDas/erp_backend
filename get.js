const getproducts = (ProuductCollection, app, verifyJWT) => {
    app.get('/getProducts/:email', async (req, res) => {
        const userEmail = req.params?.email; // Get the email from the URL parameter

        let query = {}; // Default query to get all products

        if (userEmail) {
            // If userEmail is provided, add the email to the query to filter data based on the email
            query = { email: userEmail };
        }

        try {
            const result = await ProuductCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
        }
    });
};


const getBill = (BillCollection, app, verifyJWT) => {
    app.get('/getBill/:email', async (req, res) => {
        const userEmail = req.params.email; // Get the email from the URL parameter

        let query = {}; // Default query to get all bills

        if (userEmail) {
            // If userEmail is provided, add the email to the query to filter data based on the email
            query = { email: userEmail };
        }

        try {
            const result = await BillCollection.find(query).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
        }
    });
};

const getCompany = (CompanyCollection, app, verifyJWT) => {
    app.get('/getCompany/:email', verifyJWT, async (req, res) => {
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
    app.get('/getUsers', verifyJWT, async (req, res) => {
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
    app.get('/ReturnProductCollection/:email', async (req, res) => {
        const userEmail = req.params.email;
        try {
            const result = await ReturnProductCollection.find({ email: userEmail }).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
           
        }
    })
}

module.exports = { getproducts, getBill, getCompany, ReturnProduct, getUsers, getbillbyshop, getShop, getTotalProduct };