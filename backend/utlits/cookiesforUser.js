import Cookies from "./cookiesCreate.js";
import jwtToken_Create from "./jwtCreate.js";

const cookiesForUser = async (res,user) => {
    try{
        const {accessToken, refreshToken} = await jwtToken_Create(user);

        Cookies(res, "AccessToken", accessToken, 15*60*1000);
        Cookies(res, "RefreshToken", refreshToken, 30*24*60*60*1000);
    }
    catch(err){
        return err.message;
    }
}

export default cookiesForUser;