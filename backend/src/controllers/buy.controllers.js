import cart_Model from "../models/cart.models.js";
import item_Model from "../models/item.models.js";
import { getIO } from "../../utlits/socket.js";

const buyItem = async (req, res) => {
    try {
        const { itemID, quantity } = req.body;

        let itemDetail = await item_Model.findById(itemID);

        if(itemDetail.itemQuantityAvailable < quantity){
            return res.status(400).json({msg: "This Quantity is not available"})
        }

        let item = await item_Model.findByIdAndUpdate(
            itemID,
            { $inc: { itemQuantityAvailable: -quantity } }
        );

        const io = getIO();
        io.to(itemID).emit("quantityUpdate", {
            itemID,
            available: item.itemQuantityAvailable
        });

        return res.status(200).json({ msg: "Place Order Successfully" });

    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const cart_BuyItem = async (req, res) => {
    try {
        const { itemList } = req.body;

        const { _id } = req.user;

        const io = getIO();

        for (let i = 0; i < itemList.length; i++) {

            let item = itemList[i];

            let itemDetails = await item_Model.findById(item.itemId);

            if (item.quantity > itemDetails.itemQuantityAvailable) {
                return res.status(400).json({ msg: "Insuffient Quantity", available: itemDetails.itemQuantityAvailable });
            }

            let items = await item_Model.findByIdAndUpdate(
                item.itemId,
                { $inc: { itemQuantityAvailable: -item.quantity } }
            );

            await cart_Model.findOneAndUpdate(
                { userID: _id },
                { $pull: { itemList: { itemId: item.itemId } } }
            )

            io.to(items.itemId).emit("quantityUpdate", {
                itemID: items.itemId,
                available: itemDetails.itemQuantityAvailable
            });
        }

        return res.status(200).json({ msg: "Your Order Place Successfully" })
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export { buyItem, cart_BuyItem };