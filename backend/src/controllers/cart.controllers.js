import Cart_Model from "../models/cart.models.js";
import Item_Model from "../models/item.models.js";

const addtocart = async (req, res) => {
    try {
        const { itemID, quantity } = req.body;

        const { _id } = req.user;

        const itemDetails = await Item_Model.findById(itemID);

        if (quantity > itemDetails.itemQuantityAvailable) {
            return res.status(200).json({ msg: "I have Less quantity", itemQuantityAvailable: itemDetails.itemQuantityAvailable })
        }

        const userCartPresent = await Cart_Model.findOne({ userID: _id });

        if (!userCartPresent) {
            let userCart = Cart_Model({
                userID: _id,
                itemList: [{
                    itemId: itemID,
                    quantity: quantity
                }]
            })

            await userCart.save();

            return res.status(200).json({ msg: "Item Add in your Cart" });
        }

        const itemPresent = await Cart_Model.findOne(
            {
                userID: _id,
                "itemList.itemId": itemID

            }
        )

        if (!itemPresent) {
            await Cart_Model.findOneAndUpdate(
                { userID: _id, },
                {
                    $push: {
                        itemList: {
                            itemId: itemID,
                            quantity: quantity
                        }
                    }
                }
            )

            return res.status(200).json({ msg: "Item Add in your Cart" });
        }

        await Cart_Model.findOneAndUpdate(
            {
                userID: _id,
                "itemList.itemId": itemID
            },
            {
                $set: { "itemList.$.quantity": quantity }
            }

        )

        return res.status(200).json({ msg: "Successfully" });

    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const totalItemsInCart = async (req, res) => {
    try{
      const {_id} = req.user;
      
      let cartItem = await Cart_Model.findOne({userID: _id});

      let itemList = cartItem.itemList;

      return res.status(200).json({itemList: itemList})
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

export { addtocart, totalItemsInCart };