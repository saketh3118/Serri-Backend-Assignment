import { fetchLatestVideos } from "./services/youtube_service.js";
import { logger } from "../../app.js";

const interval = parseInt(process.env.POLL_INTERVAL);

export function startYoutubeDataSyncJob() {
  logger.info("YouTube fetch worker started, interval: ", interval / 1000, "s");

  setInterval(() => {
    fetchLatestVideos();
  }, interval);
}
