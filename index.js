const express = require('express')
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('Hello from cpu tech!')
})

app.listen(port, () => {
    console.log(`Cpu App listening on port ${port}`)
})