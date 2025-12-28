import mongoose, { Schema } from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const cart_Schema = new Schema({
    userID: {
        type: ObjectId,
        ref: "auth"
    },
    itemList: [{
        itemId: {
            type: ObjectId,
            ref: "items"
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
})

const cart_Model = mongoose.model("Cart", cart_Schema);

export default cart_Model;