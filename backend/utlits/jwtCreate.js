import jwt from "jsonwebtoken";

const jwt_Key = process.env.JWT_Key;

const jwtToken_Create = (user) =>{
    try{
        let accessToken = jwt.sign(user, jwt_Key, {expiresIn: 15*60*1000});
        let refreshToken =jwt.sign(user, jwt_Key, {expiresIn: 30*24*60*60*1000});

        return {accessToken, refreshToken};
    }
    catch(err){
        return err.message
    }
}

export default jwtToken_Create;