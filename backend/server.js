import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/productdb';

function validate(data) {
    let errors = {};
    if (data.subject === '') errors.subject = "Can't be empty";
    if (data.detail === '') errors.detail = "Can't be empty";
    if (data.quantity === '') errors.quantity = "Can't be empty";
    const isValid = Object.keys(errors).length === 0
    return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {
    
    if(err) { console.log(err); return }

    app.get('/api/products', (req, res) => {
        db.collection('products').find({}).toArray((err, products) => {
            res.json({ products });
        });
    });

    app.delete('/api/products/:_id', (req, res) => {
        db.collection('products').deleteOne({ _id: new mongodb.ObjectId(req.params._id)}, (err, r) => {
            if(err) {res.status(500).json({ errors: {global: err}}); return; }

            res.json({});
        })
    });
    
    app.post('/api/products', (req, res) => {
        const { errors, isValid } = validate(req.body);
        if(isValid) {
            const { subject, detail, quantity } = req.body;
            db.collection('products').insert({ subject, detail, quantity }, (err, result) => {
                if(err) {
                    res.status(500).json({ errors: { global: "Somthing went wrong"}});
                } else {
                    res.json({ product: result.ops[0] });
                }
            })
        } else {
            res.status(400).json({ errors });
        }
    })



    app.put('/api/products/:_id', (req, res) => {
        const { errors, isValid } = validate(req.body);

        if (isValid) {
            const { subject, detail, quantity } = req.body;
            db.collection('products').findOneAndUpdate(
                { _id: new mongodb.ObjectId(req.params._id) },
                { $set: { subject, detail, quantity } },
                { returnOriginal: false },
                (err, result) => {
                    if (err) { res.status(500).json({ errors: { global: err }}); return; }

                    res.json({ product: result.value });
                }
            );
        } else {
            res.status(400).json({ errors });
        }
    });
    
    

    app.get('/api/products/:_id', (req, res) => {
        db.collection('products').findOne({ _id: new mongodb.ObjectId(req.params._id)}, (err, product) => {
            res.json({ product });
        })
    });

    app.use((req, res) => {
        res.status(404).json({
            errors: {
            global: "Still working on it. Please try again later when we implement it"
            }
        });
    })

    app.listen(8080, () => console.log('Server is running on localhost:8080'));

});