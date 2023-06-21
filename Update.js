
// const UpdateProduct = (app, ProductCollection) => {
//     app.put('/UpdateProduct/:barCode', async (req, res) => {
//         const barcode = req.params.barCode;
//         const newQuantity = req.body.quantity; // assuming the quantity will be passed in the request body
//         try {
//             const result = await ProductCollection.updateOne({ barcode }, { $set: { quantity: newQuantity } });
//             if (result.modifiedCount === 1) {
//                 res.send(`Successfully updated the product with barcode ${barcode}`);
//             } else {
//                 res.status(404).send(`Product with barcode ${barcode} not found`);
//             }
//         } catch (err) {
//             console.log(err);
//             res.status(500).send('Internal server error');
//         }
//     });
// }


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
            console.log(err);
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
            console.log(err);
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
            console.log(err);
            res.status(500).send('Internal server error');
        }
    });
};

// ----------------------------*************************-------------------------


module.exports = { UpdateProduct, UpdateProductbill, UpdateTotalProduct };
