import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(protect); // protect all routes below

router.post("/", addFavorite);           // body: { gifId, gifUrl, title }
router.get("/", getFavorites);           // list favorites
router.delete("/:gifId", removeFavorite);

export default router;
