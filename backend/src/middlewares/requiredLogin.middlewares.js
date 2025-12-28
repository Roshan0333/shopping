import jwt from "jsonwebtoken";
import cookiesForUser from "../../utlits/cookiesforUser.js"

const jwt_key = process.env.JWT_Key
 

const jwt_TokenVerify = async (req, res, next) => {
    try{
        let accessToken = req.cookies.AccesssToken;
        let refreshToken = req.cookies.RefreshToken;

        if(accessToken){
            let jwtToken_Verify = await jwt.verify(accessToken, jwt_key);

            req.user = jwtToken_Verify.user;

            next()

        }
        else{
            if(!refreshToken){
                return res.status(401).json({msg: "Please Login"});
            }
            else{
                let jwtToken_Verify = await jwt.verify(refreshToken, jwt_key);

                req.user = jwtToken_Verify.user;

                cookiesForUser(res, req.user);

                next();
            }
        }
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

export default jwt_TokenVerify;