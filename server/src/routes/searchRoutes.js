import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addSearch,
  getUserSearchHistory,
  clearSearchHistory,
  getTrendingKeywords,
} from "../controllers/searchController.js";

const router = express.Router();

router.use(protect);

router.post("/add", addSearch);  
router.get("/history", getUserSearchHistory);
router.delete("/history", clearSearchHistory);

router.get("/trending", getTrendingKeywords);

export default router;
