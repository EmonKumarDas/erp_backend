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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            res.status(500).send('Error fetching bills');
        }
    })
}

module.exports = { getproducts, getBill, getCompany, getUsers,getShop };