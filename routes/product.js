const express = require('express');
const Product = require('../models/product');

const productRouter = express.Router();

productRouter.post('/api/add-product',async (req, res) => {
    try {
        const {productName, productPrice, quantity, description, category, subCategory, images} = req.body;
        const product = new Product({productName, productPrice, quantity, description, category, subCategory, images});
        await product.save();
        return res.status(201).send(product);
    } catch(error) {
        res.status(500).json({error});
    }
});

productRouter.get('/api/popular-products',async(req, res) => {
    try{

    const product = await Product.find({popular: true});

    //check if subcategories were found 
    if(!product ||product.length == 0) {
        //if no subcategories are found, respond with a status code 404

        return res.status(404).json({msg:"products not found"});
    } else {
        return res.status(200).json({product});
    }
    } catch (error) {
        res.status(500).json({error});
    }
});

productRouter.get('/api/recommended-products',async(req, res) => {
    try{

    const product = await Product.find({recommend: true});

    //check if subcategories were found 
    if(!product ||product.length == 0) {
        //if no subcategories are found, respond with a status code 404

        return res.status(404).json({msg:"products not found"});
    } else {
        return res.status(200).json({product});
    }
    } catch (error) {
        res.status(500).json({error});
    }
});

module.exports = productRouter;