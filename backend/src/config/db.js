import mongoose from "mongoose";

const DataBase_Config = async () => {
    try{
        let db = mongoose.connect(process.env.MongoDB_URL);
        console.log("Database Connect Successfully");
        return db;
    }
    catch(err){
        console.log(err.message);
    }
}

export default DataBase_Config;