import bcrypt from "bcrypt";

const saltRound = 15

const encryptPassword = async (plainPassword) => {
    try{
        let password = await bcrypt.hash(plainPassword, saltRound);

        return password
    }
    catch(err){
        return err.message;
    }
}

const decryptPassword = async (plainPassword, hashPassword) => {
    try{
        let passswordVerify = await bcrypt.compare(plainPassword, hashPassword);

        return passswordVerify;
    }
    catch(err){
        return err.message
    }
}

export {encryptPassword, decryptPassword};