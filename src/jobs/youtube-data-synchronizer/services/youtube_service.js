import axios from "axios";
import dotenv from "dotenv";
import { logger } from "../../../app.js";
import Video from "../../../database/model/videoModel.js";

dotenv.config();

const API_KEYS = process.env.YT_API_KEYS.split(",");
let currentKeyIndex = 0;

function getApiKey() {
  return API_KEYS[currentKeyIndex];
}

function rotateKey() {
  currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
  logger.info("Rotated API key: ", getApiKey());
}

export async function fetchLatestVideos(query = process.env.YT_SEARCH_QUERY) {
  try {
    const res = await axios.get(process.env.YT_API_URL, {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        order: "date",
        maxResults: 100,
        key: getApiKey(),
      },
    });

    const items = res.data.items;

    for (const v of items) {
      await Video.upsert({
        video_id: v.id.videoId,
        title: v.snippet.title,
        description: v.snippet.description,
        published_at: v.snippet.publishedAt,
        channel_id: v.snippet.channelId,
        channel_title: v.snippet.channelTitle,
        thumbnails: v.snippet.thumbnails,
      });
    }

    logger.info(`Inserted/updated ${items.length} videos`);
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 429) {
      logger.error("Quota exceeded, rotating key...");
      rotateKey();
    } else {
      logger.error("YouTube API error:", err.message);
    }
  }
}
