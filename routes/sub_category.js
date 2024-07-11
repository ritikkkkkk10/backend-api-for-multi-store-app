const express = require('express');
const SubCategory = require('../models/sub_category');
const subcategoryRouter = express.Router();

subcategoryRouter.post('/api/subcategories', async(req, res) => {
    try {
    const {categoryId, categoryName, image, subCategoryName} = req.body;
    const subcategory = new SubCategory({categoryId,categoryName, image, subCategoryName});
    await subcategory.save();
    res.status(201).send(subcategory);
    } catch (error) {
        res.status(500).json({error});
    }
});

subcategoryRouter.get('/api/category/:categoryName/subcategories',async(req, res) => {
    try{
    //extract the category name from the requested url using Destructuring
    const {categoryName} = req.params;

    const subcategories = await SubCategory.find({categoryName: categoryName});

    //check if subcategories were found 
    if(!subcategories || subcategories.length == 0) {
        //if no subcategories are found, respond with a status code 404

        return res.status(404).json({msg:"subcategories not found"});
    } else {
        return res.status(200).json(subcategories);
    }
    } catch (error) {
        res.status(500).json({error});
    }
});
module.exports = subcategoryRouter;