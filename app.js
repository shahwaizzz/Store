require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./routes/store-routes')
const connectDB = require('./db/connectDB')
const notFound = require('./middlewares/not-found.js')
app.use(express.json())
app.get('/', (req, res) => {
    res.status(200).send('<h1>HomePage')
})

app.use('/api/v1/products', route)

app.use(notFound)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(6000, console.log('Server running'))
    } catch (error) {
        console.log(error);
    }
}
start()