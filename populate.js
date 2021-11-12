require('dotenv').config()
const { log } = require('console')
const { exit } = require('process')
const connectDB = require('./db/connectDB')
const Product = require('./models/storeModels')
const jsonProducts = require('./products.json')


const start = async () => {
    try{
    await connectDB(process.env.MONGO_URI)
    await Product.deleteMany()
    await Product.create(jsonProducts)
        console.log('Success');
        exit(0)
    }
    catch (error)
    {
        console.log(error);
        exit(1)
    }
}
start()
