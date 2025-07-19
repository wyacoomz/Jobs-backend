import SubCategory from "../models/subcategory.model.js";


//CREATE
export const createSubCategory = async (req, res ) =>{
    const { name, parentCategory } = req.body;
    try{
        const subcategory = await SubCategory.create({ name, parentCategory});
        res.status(201).json(subcategory)
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};


//READ
export const getSubCatogories = async (req, res) => {
    try {
        const subcategory = await SubCategory.find().populate("parentCategory")
        res.json(subcategory);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

//UPDATE 

export const updateSubCategory = async (req, res) =>{
    try{
        const { name, parentCategory} = req.body;
        const subcategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            { name, parentCategory },
            { new: true }
        );
        if(!subcategory) return res.status(404).json({error: "SubCategory not found"});
        res.json(subcategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

//DELETE
export const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
        if (!subcategory) return res.status(404).json({ error: "SubCategory not found" });
        res.json({ message: "Subcategory deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};