import Video from "../../database/model/videoModel.js";
import { logger } from "../../app.js";

export const getAllVideos = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const { rows, count } = await Video.findAndCountAll({
      order: [["published_at", "DESC"]],
      limit,
      offset,
    });

    logger.info(`Fetched ${rows.length} videos (offset: ${offset}, limit: ${limit})`);
    res.json({ count, limit, offset, items: rows });

  } catch (err) {
    
    logger.error({ err }, "Error fetching all videos");
    res.status(500).json({ error: "Failed to fetch videos" });
    
  }
};
