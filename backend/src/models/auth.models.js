import mongoose, {Schema} from "mongoose";

const auth_Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }
});

const auth_Model = mongoose.model("Auth", auth_Schema);

export default auth_Model;