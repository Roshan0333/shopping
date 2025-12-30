import Cookies from "./cookiesCreate.js";
import jwtToken_Create from "./jwtCreate.js";

const cookiesForUser = (res, user) => {
    try {
        const { accessToken, refreshToken } = jwtToken_Create(user);
        Cookies(res, "AccessToken", accessToken, 60 * 60 * 1000);
        Cookies(res, "RefreshToken", refreshToken, 30 * 24 * 60 * 60 * 1000);
    }
    catch (err) {
        console.error("Cookie Error:", err.message);
        throw err;
    }
}

export default cookiesForUser;