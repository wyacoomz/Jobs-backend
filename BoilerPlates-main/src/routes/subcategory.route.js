import express from 'express';
import { 
    createSubCategory,
    getSubCatogories,
    updateSubCategory,
    deleteSubcategory,
 } from '../controllers/subcategory.controller.js';

const router = express.Router();

router.post('/',createSubCategory);
router.get('/',getSubCatogories);
router.put("/id", updateSubCategory);
router.delete("/id", deleteSubcategory);

export default router;