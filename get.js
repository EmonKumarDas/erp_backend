const getproducts = (ProuductCollection, app) => {
    app.get('/getProducts', async (req, res) => {
        const result = await ProuductCollection.find({}).sort({ _id: -1 }).toArray(); // sort by _id in descending order
        res.send(result);
    })
}


const getBill = (BillCollection, app) => {
    app.get('/getBill', async (req, res) => {
        try {
            const result = await BillCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
            
            res.status(500).send('Error fetching bills');
        }
    })
}

const getCompany = (CompanyCollection, app) => {
    app.get('/getCompany', async (req, res) => {
        try {
            const result = await CompanyCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
           
            res.status(500).send('Error fetching bills');
        }
    })
}

const getUsers = (UsersCollection, app) => {
    app.get('/getUsers', async (req, res) => {
        try {
            const result = await UsersCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
           
            res.status(500).send('Error fetching bills');
        }
    })
}
const getShop = (ShopCollection, app) => {
    app.get('/getshop', async (req, res) => {
        try {
            const result = await ShopCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
            res.status(500).send('Error fetching bills');
        }
    })
}

const getTotalProduct = (TotalProductCollection, app) => {
    app.get('/getTotalProduct', async (req, res) => {
        try {
            const result = await TotalProductCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
            res.status(500).send('Error fetching data');
        }
    })
}
const getbillbyshop = (PayShopBillCollection, app) => {
    app.get('/getbillbyshop', async (req, res) => {
        try {
            const result = await PayShopBillCollection.find({}).sort({ _id: -1 }).toArray();
            res.send(result);
        } catch (error) {
            res.status(500).send('Error fetching data');
        }
    })
}

module.exports = { getproducts, getBill, getCompany, getUsers,getbillbyshop, getShop, getTotalProduct };