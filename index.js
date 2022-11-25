const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//database connection here

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9rpk71q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

async function run() {
    try {
        const UsedMobileDealCollection = client.db("UsedMobileDeal").collection("categoryList");
        const BlogCollection= client.db("UsedMobileDeal").collection("BlogCollection");
        const ProductCollection= client.db("UsedMobileDeal").collection("ProductCollection");
        
        app.get('/phonecategory', async (req, res) => {
            const query = {}
            const result = await UsedMobileDealCollection.find(query).toArray();
            res.send(result);
            
        })
        app.get('/blogs', async (req, res) => {
            const query = {}
            const result = await BlogCollection.find(query).toArray();
            res.send(result);
            
        })
        app.get('/products', async (req, res) => {
            const query = {}
            const allproduct = await ProductCollection.find(query).toArray();
            res.send(allproduct);
            
        })
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = {}
            const allproduct = await ProductCollection.find(query).toArray();
            const product = allproduct.filter(pro=>pro.proId == id)
            res.send(product);
            
        })

        
    }
    finally {
        
    }
}

run().catch(err => console.log(err))


app.get('/', async (req, res) => {
    res.send('Used Mobile Deal server is running');
})

app.listen(port, () => console.log(`Used Mobile Deal running on ${port}`))