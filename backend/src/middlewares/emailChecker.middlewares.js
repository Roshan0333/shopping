import auth_Model from "../models/auth.models.js";

const emailCheckerforSignUp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isEmail = await auth_Model.findOne({ email: email });

        console.lo

        if (isEmail) {
             return res.status(401).json({ msg: "Email Already Availabel" });
        }

        next();
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


const emailCheckerforLogin = async (req, res, next) => {
    try {
        const { email } = req.body;

        const isEmail = await auth_Model.findOne({ email: email });

        if (!isEmail) {
            return res.status(404).json({ msg: "Email not found" })
        }
        next()
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export {emailCheckerforSignUp, emailCheckerforLogin};