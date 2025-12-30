import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const jwt_Key = process.env.JWT_Key;


const jwtToken_Create = (user) =>{
    try{
        let accessToken = jwt.sign({user}, jwt_Key, {expiresIn: "1h"});
        let refreshToken =jwt.sign({user}, jwt_Key, {expiresIn: "30d"});

        return {accessToken, refreshToken};
    }
    catch(err){
        console.error("Cookie Error:", err.message);
        throw err;
    }
}

export default jwtToken_Create;