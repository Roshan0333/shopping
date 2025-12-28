import auth_Model from "../models/auth.models.js";
import cookiesForUser from "../../utlits/cookiesforUser.js";
import {encryptPassword, decryptPassword} from "../../utlits/password_Encrypt&Decrypt.js"

const SignUp = async (req, res) => {
    try{
        const {email, password} = req.body;

        const userDetail = auth_Model({
            email,
            password: await encryptPassword(password)
        });

        await userDetail.save();

        userDetail.password = undefined;

        cookiesForUser(res, userDetail);

        return res.status(200).json({msg:"Id create Successfully"});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

const Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const userDetail = await auth_Model.findOne({email});

        const decryptPasswordResult = await decryptPassword(password, userDetail.password);

        if(!decryptPasswordResult){
            return res.status(401).json({msg: "Incorrect Password"});
        }

        userDetail.password = undefined;

        cookiesForUser(res, userDetail);

        return res.status(200).json({msg: "Access Granted"});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

const ForgetPassword = async (req, res) => {
    try{
        const {email, password} = req.body;

        const userDetail = await auth_Model.findByIdAndUpdate(
            {email},
            {password: await encryptPassword(password)}
        );

        userDetail.password = undefined;

        cookiesForUser(res, userDetail);

        return res.status(200).json({msg:"Your Password Forget Successfully"})
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
}

export {SignUp, Login, ForgetPassword};