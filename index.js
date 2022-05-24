const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rbrmt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toolCollection = client.db("cpu-manufacturer").collection("tools");
        const reviewCollection = client.db("cpu-manufacturer").collection("reviews");
        console.log('database connected')


        app.post('/review', async (req, res) => {
            const newItem = req.body
            const result = await reviewCollection.insertOne(newItem);
            res.send(result)

        })

        app.get('/tool', async (req, res) => {
            const query = {};
            const cursor = toolCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/tool/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await toolCollection.findOne(query)
            res.send(result)
        })

    }
    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello from cpu tech!')
})

app.listen(port, () => {
    console.log(`Cpu App listening on port ${port}`)
})