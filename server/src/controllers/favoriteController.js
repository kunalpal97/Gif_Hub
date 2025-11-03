
import Favorite from '../models/favModel.js';


export const addFavorite = async (req , res) => {
    try {
        const user = req.user;

        const { gifId , gidUrl , title } = req.body;
        if(!gifId || !gidUrl){
            return res.status(400).json({
                success : false,
                message : "gifId and gifUrl required"
            });
        }

        const fav = await Favorite.findOneAndUpdate(
            {user : user._id , gifId },
            {user : user._id , gifId , gidUrl , title},
            {upsert : true , new : true , setDefaultsOnInsert : true });

        res.status(201).json({
            success : true,
            favorite : fav ,
        });
    } catch(error){

        console.log("Add favorite error :" , error.message);
        res.status(500).json({
            success : false,
            message : " Failed to add favorite " , error : err.message 
        });

    }
};


export const removeFavorite = async (req , res) => {

    try {

        const user = req.user;
        const { gifId } = req.params;

        await Favorite.findOneAndDelete({
            user : user._id , gifId
        });
        res.json({
            success : true,
            message : "Removed" ,
        });
    } catch(error){

        console.log("Error While removing " , error.message);
        res.status(500).json({
            success : false ,
            message : "Failed to remove " , 
            error : error.message ,
        })

    }
}


export const getFavorite = async (req , res) => {

    try {

        const user = req.user;
        const favs = await Favorite.find({
            user : user._id
        }).sort({ createAt : -1 });
        res.json({
            success : true,
            favorites : favs ,
        })

    } catch(error){

        console.log("get favs error : ", err.message);
        res.status(500).json({
            success : false ,
            message : "failed to get favorites " , 
            error : error.message
        });

    }
};
