const addProducts = (ProuductCollection, app, verifyJWT) => {
  app.post('/addProducts', verifyJWT, async (req, res) => {
    try {
      const category = req.body;
      // Convert all properties of category to lowercase
      const categoryLower = Object.keys(category).reduce((obj, key) => {
        obj[key.toLowerCase()] = typeof category[key] === 'string' ? category[key].toLowerCase() : category[key];
        return obj;
      }, {});
      // Add current date to the bill document
      const now = new Date();
      categoryLower.date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      categoryLower.month = `${now.getFullYear()}-${now.getMonth() + 1}`;
      const result = await ProuductCollection.insertOne(categoryLower);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting category into database');
    }
  });
};
// --------------********** add Product **************------------------------
const totalProduct = (ProuductCollection, app, verifyJWT) => {
  app.post('/totalProduct', verifyJWT, async (req, res) => {
    try {
      const category = req.body;
      // Convert all properties of category to lowercase
      const categoryLower = Object.keys(category).reduce((obj, key) => {
        obj[key.toLowerCase()] = typeof category[key] === 'string' ? category[key].toLowerCase() : category[key];
        return obj;
      }, {});
      const result = await ProuductCollection.insertOne(categoryLower);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting category into database');
    }
  });
};


const createBill = (BillCollection, app, verifyJWT) => {
  app.post('/createBill', verifyJWT, async (req, res) => {
    try {
      const bill = req.body;
      const billLower = Object.keys(bill).reduce((obj, key) => {
        if (typeof bill[key] === 'string') {
          obj[key.toLowerCase()] = bill[key].toLowerCase();
        }
        else {
          obj[key.toLowerCase()] = bill[key];
        }
        return obj;
      }, {});

      const result = await BillCollection.insertOne(billLower);
      res.send(result);
    } catch (err) {
      console.error(err);
    }
  });
};


const addCompany = (CompanyCollection, app, verifyJWT) => {
  app.post('/addcompany', verifyJWT, async (req, res) => {
    try {
      const company = req.body;
      const result = await CompanyCollection.insertOne(company);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting company into database');
    }
  })
}
const PostReturnProduct = (ReturnProductCollection, app, verifyJWT) => {
  app.post('/PostReturnProduct', verifyJWT, async (req, res) => {
    try {
      const ReturnProduct = req.body;
      const result = await ReturnProductCollection.insertOne(ReturnProduct);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting company into database');
    }
  })
}

const addUser = (UserCollection, app, verifyJWT) => {
  app.post('/addUser', verifyJWT, async (req, res) => {
    try {
      const user = req.body;
      const result = await UserCollection.insertOne(user);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting user into database');
    }
  })
}

const addShop = (ShopCollection, app, verifyJWT) => {
  app.post('/addshop', verifyJWT, async (req, res) => {
    try {
      const shop = req.body;
      const result = await ShopCollection.insertOne(shop);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting shop into database');
    }
  })
}

const paybill = (PayCollection, app, verifyJWT) => {
  app.post('/paybill', verifyJWT, async (req, res) => {
    try {
      const paybill = req.body;
      const result = await PayCollection.insertOne(paybill);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting bill into database');
    }
  })
}

const payShopBill = (PayShopBillCollection, app, verifyJWT) => {
  app.post('/payshopbill', verifyJWT, async (req, res) => {
    try {
      const paybill = req.body;

      const billLower = Object.keys(paybill).reduce((obj, key) => {
        if (typeof paybill[key] === 'string') {
          obj[key.toLowerCase()] = paybill[key].toLowerCase();
        } else {
          obj[key.toLowerCase()] = paybill[key];
        }
        return obj;
      }, {});

      const result = await PayShopBillCollection.insertOne(billLower);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting bill into database');
    }
  })
}

const AddCompanyProducts = (AddCompanyProductsCollection, app, verifyJWT) => {
  app.post('/AddCompanyProducts', verifyJWT, async (req, res) => {
    try {
      const products = req.body;
      const result = await AddCompanyProductsCollection.insertOne(products);
      res.send(result);
    } catch (err) {

      console.error(err);
      res.status(500).send('Error inserting bill into database');
    }
  })
}




module.exports = { addProducts, createBill, AddCompanyProducts, PostReturnProduct, addCompany, payShopBill, addUser, paybill, totalProduct, addShop };

