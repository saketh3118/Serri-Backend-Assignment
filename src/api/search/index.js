import Video from "../../database/model/videoModel.js";
import { Op } from "sequelize";
import { logger } from "../../app.js";

export const getSearchVideos = async (req, res) => {
  try {
    const q = req.query.q || "";
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    logger.info(` ${ "query: ", q, limit, offset }, Search videos request received`);

    const { rows, count } = await Video.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${q}%` } },
          { description: { [Op.iLike]: `%${q}%` } },
        ],
      },
      order: [["published_at", "DESC"]],
      limit,
      offset,
    });

    logger.info(` ${ count } Search videos completed`);

    res.json({ count, limit, offset, items: rows });
  } catch (err) {
    logger.error(`${err} Error while searching videos`);
    res.status(500).json({ error: "Internal server error" });
  }
};
