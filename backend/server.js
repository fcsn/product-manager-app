import express from 'express';
import mongodb from 'mongodb';

const app = express();
const dbUrl = 'mongodb://localhost/productdb';

mongodb.MongoClient.connect(dbUrl, function(err, db) {
    
    if(err) { console.log(err); return }

    app.get('/api/products', (req, res) => {
    db.collection('products').find({}).toArray((err, products) => {
        res.json({ products });
    });
    });

    app.listen(8080, () => console.log('Server is running on localhost:8080'));

});