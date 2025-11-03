
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


export const protect = async (req , res , next) => {

    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.satus(401).json({
                success : false,
                message : "Not Authorized"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token , process.env.JWT_SECRET || "devsecret");

        // decoded should contain the user id or providerid 

        const user = await User.findById(decoded.id);
        if( !user ){
            return res.status(401).json({
                success : failed,
                message : "User not found",
            });
        }
        req.user = user;
        next()
    } catch(error){
        console.log("Auth Error : " , error.message);

        res.status(401).json({
            success : false,
            message : "Auth failed",
        });
    }
};