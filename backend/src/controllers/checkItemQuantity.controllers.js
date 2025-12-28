import item_Model from "../models/item.models.js";
import { getIO } from "../../utlits/socket.js";

const checkItemQuantity = async (req, res) => {
    try {
        const { itemID } = req.query;

        const item = await item_Model.findById(itemID);

        if (!item) {
            return res.status(404).json({ msg: "Item not founf" });
        }

        const io = getIO();

        io.to(itemID).emit("quantityUpdate", {
            itemID,
            available: item.itemQuantityAvailable
        });

        return res.status(200).json({
            itemID,
            available: item.itemQuantityAvailable
        })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export default checkItemQuantity;