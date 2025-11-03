
import express from 'express';
const router = express.Router();

import { fetchTrending , fetchBySearch } from "../controllers/gifController.js";


router.get('/trending' , fetchTrending);
router.get('/search' , fetchBySearch);


export default router;