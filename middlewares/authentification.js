import dotenv from "dotenv";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../Models/user.model.js"

dotenv.config();
const {APP_SECRET} = process.env;

// Password security hash

export const hashPass = (req, res, next) => {
    const { password } = req.body;

    // hashing
    const hashedPass = crypto.createHmac("sha256", APP_SECRET).update(password).digest("hex");

    //replace by new pw
    req.password = hashedPass;

    next();
};

// JWT verification and authorization
export function authVerif(req, res, next){
    if (!req.session.token) {
        return res.status(401).json({
          Unauthorized: 'Please, login with a valid token'
        });
    }
    
    try {
        jsonwebtoken.verify(req.session.token, APP_SECRET);
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Signin mail verification : is mail already used ?
export const userExists = async(email) => {
    try {
        const user = await UserModel.find({ email });
        if(user.length)
           return true;
        else
            return false;
    }
    catch (error) {
        return new Error(`Error: ${error.message}`);
    }
}