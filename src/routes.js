import express from "express";
import { getAllVideos } from "./api/videos/index.js";
import { getSearchVideos } from "./api/search/index.js";

const router = express.Router();

router.get("/", getAllVideos)
router.get("/search", getSearchVideos)

export default router;
