require('dotenv').config()
const connectDB = require('../db/connectDB')
const Product = require('../models/store-models')
const getAllProducts = async (req, res) => {
    
    const { company, featured, name, sort, fields, numbericFilters } = req.query
    const queryObject = {}
    if (company)
    {
        queryObject.company = company
    }
    if (featured)
    {
        queryObject.featured = featured
    }
    if (name)
    {
      queryObject.name = {$regex: name, $options: 'i'}  
    }
    if (numericFilters)
    {
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field))
            {
                queryObject[field] = { [operator]: Number(value)}
            }
        }) 
    }
    let results = Product.find(queryObject)
    if (fields)
    {
        const fieldList = fields.split(',').join(' ')
        results = results.select(fieldList)
    }
    
    if (sort)
    {
        const sortList = sort.split(',').join(' ')
        results = results.sort(sortList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    results = results.skip(skip).limit(limit)
    const products = await results.sort()
    
    res.status(200).json({nbHits: products.length , products})
}


module.exports = {
    getAllProducts
}