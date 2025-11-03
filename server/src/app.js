
import express from 'express';
import cors from 'cors';    
import bodyParser from 'body-parser';   

import gifRoutes from "./routes/gifRoutes.js"; 
import userRoutes from "./routes/userRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";   

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/' , (req , res) => {
    res.send("🎉 GIF Hub backend is running!");
});


app.use("/api/gifs" , gifRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/favorites" , favoriteRoutes);


export default app;



