const UpdateProduct = (app, ProductCollection, ObjectId) => {
    app.put('/UpdateProduct/:id', async (req, res) => {
        const id = req.params.id;
        const newQuantity = req.body.quantity;

        try {
            const result = await ProductCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { quantity: newQuantity } }
            );
            if (result.modifiedCount === 1) {
                res.send(`Successfully updated the product with _id ${id}`);
            } else {
                res.status(404).send(`Product with _id ${id} not found`);
            }
        } catch (err) {
          
            res.status(500).send('Internal server error');
        }
    });
};

// ------------------------**************---------------------------------------

const Upadate_Product_Remaining_Balance = (app, ProductCollection, ObjectId) => {
    app.put('/Upadate_Product_Remaining_Balance/:id', async (req, res) => {
        const id = req.params.id;
        const new_balance = req.body.advance;

        try {
            const result = await ProductCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { advance: new_balance } }
            );
            if (result.modifiedCount === 1) {
               
            } else {
                res.status(404).send(`Product with _id not found`);
            }
        } catch (err) {
        
            res.status(500).send('Internal server error');
        }
    });
};

// ------------------------**************---------------------------------------

const UpdateProductbill = (app, BillCollection, ObjectId) => {
    app.put('/UpdateProductbill/:id', async (req, res) => {
        const id = req.params.id;
        const newadvance = req.body.advance;
        const newbalance = req.body.newbalance;

        try {
            const result = await BillCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { advance: newadvance, newbalance: newbalance } }
            );
            if (result.modifiedCount === 1) {
                res.send(result);
            } else {
                res.status(404).send(`Product with _id ${id} not found`);
            }
        } catch (err) {
       
            res.status(500).send('Internal server error');
        }
    });
};

// ----------------------------*************************-------------------------
const UpdateTotalProduct = (app, TotalProductCollection, ObjectId) => {
    app.put('/UpdateProductQuantity/:id', async (req, res) => {
        const id = req.params.id;
        const newQuantity = req.body.quantity;

        try {
            const result = await TotalProductCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { quantity: newQuantity } }
            );
            if (result.modifiedCount === 1) {
                res.send(result);
            } else {
                res.status(404).send(`Product with _id ${id} not found`);
            }
        } catch (err) {
         
            res.status(500).send('Internal server error');
        }
    });
};

// ----------------------------*************************-------------------------


module.exports = { UpdateProduct, UpdateProductbill, UpdateTotalProduct, Upadate_Product_Remaining_Balance };
