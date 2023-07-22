const deleteProduct = (app, CategoryCollection, ObjectId) => {
    app.delete('/deleteProduct/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await CategoryCollection.deleteOne(filter);
        res.send(result);
    })
}

const deleteshop = (app, ShopCollection, ObjectId) => {
    app.delete('/deleteshop/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await ShopCollection.deleteOne(filter);
        res.send(result);
    })
}
module.exports = { deleteProduct, deleteshop };