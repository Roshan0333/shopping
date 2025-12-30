import item_Model from "../models/item.models.js";

const item_post = async (req, res) => {
    try {
        const { price, description, category,itemQuantityAvailable } = req.body;
        const productImage = (req.file) ? req.file.buffer.toString("base64") : null;

        const itemDetails = item_Model({
            image: productImage,
            price,
            description,
            category,
            itemQuantityAvailable

        })

        await itemDetails.save();

        return res.status(200).json({ msg: "Item uploaded Successfully" });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}


const get_itemByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        const itemLists = await item_Model.find({ category: category });


        if (itemLists.length === 0) {
            return res.status(200).json({ msg: "No item found" });
        }

        return res.status(200).json({ msg: "Successfully", itemLists: itemLists });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getItem_ById = async (req,res) => {
    try{
        let {itemId} = req.query;

        let itemDetail = await item_Model.findById(itemId);

        return res.status(200).json({itemDetail: itemDetail})
    }
    catch(err){
        return res.status(500).json({error: err.message})
    }
}

export { item_post, get_itemByCategory, getItem_ById };
