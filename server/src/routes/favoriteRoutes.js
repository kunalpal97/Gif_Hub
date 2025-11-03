
import express from 'express';
import { protect } from '../middlewares/authMiddleware';
import { addFavorite, getFavorite ,  removeFavorite} from '../controllers/favoriteController';


const router = express.Router();

router.use(protect);

router.post("/" , addFavorite);

router.get("/" , getFavorite);

router.delete("/:gifId" , removeFavorite);

export default router;