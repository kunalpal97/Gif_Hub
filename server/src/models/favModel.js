
import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" ,
        required : true,
    },
    gifId : {
        type : String,
        required : true,
    },
    gifUrl : {
        type : true,
        required : true,
    },
    title : String,
    createdAt : {
        type : Date,
        default : Date.now,
    },

});

// prevents duplicates 

favoriteSchema.index({
    user : 1,
    gifId : 1,

    },
    {
        unique : true
    }
);

export default mongoose.model("favorite" , favoriteSchema);