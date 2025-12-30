const Cookies = (res, tokenType, token, isExpire) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: isExpire
    }
    )
}

export default Cookies;