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
        const updatePayamount = req.body.updatePayamount;

        try {
            const result = await ProductCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { advance: new_balance, payamount: updatePayamount } }
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
        const get_update_data = req.body.get_update_date;

        try {
            const result = await BillCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: { advance: newadvance, newbalance: newbalance, pay_advance_by_date: get_update_data } }
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
