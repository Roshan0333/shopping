const Cookies = (res, tokenType, token, isExpire) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        expires: isExpire
    }
    )
}

export default Cookies;