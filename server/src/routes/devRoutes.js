
import express from 'express';

import User from "../models/userModel.js"

import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/create" , async (req , res) => {

    const {name , email } = req.body;
    const user = await User.findOneAndUpdate({email} , {name, email} , {upsert : true , new : true});

    const token = jwt.sign({id : user._id } , process.env.JWT_SCERET || 'devsceret', { expiresIn : "7d"});

    res.json({
        user , token 
    });

})

export default router;
