import mongoose, { Schema } from "mongoose";

const item_Schema = new Schema({
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    itemQuantityAvailable: {
        type: Number,
        required: true
    }
});

const item_Model = mongoose.model('items', item_Schema);

export default item_Model;