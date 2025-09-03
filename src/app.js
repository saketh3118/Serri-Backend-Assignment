import express from "express";
import dotenv from "dotenv";
import sequelize from "./database/postgresDB/db.js";
import Video from "./database/model/videoModel.js";
import videoRoutes from "./routes.js";
import { startYoutubeDataSyncJob } from "./jobs/youtube-data-synchronizer/index.js";
import pino from "pino";
import path from "path";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Parse incoming JSON requests


const PORT = process.env.PORT;
const logFile = path.join(process.cwd(), "app.log");

// Configure Pino logger for async file logging
export const logger = pino({
    timestamp: () => `,"time":"${new Date().toLocaleString()}"`,
    formatters: {
      level(label) { return { level: label }; },
    },
  },
  // Write logs to a file, create directories if they don't exist
  pino.destination({ dest: logFile, mkdir: true })
);


async function start() {
  try {

    await sequelize.authenticate();
    await sequelize.sync(); // Sync all models with database
    
    logger.info("Database connected");

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Start YouTube data synchronization worker
    startYoutubeDataSyncJob();
    logger.info("YouTube Data Sync Worker started");

  } catch (err) {
    logger.error(`Error in starting the server: ${err}`);
  }
}

start();

// Routes for API
app.use("/videos", videoRoutes);
app.get("/health", (req, res) => res.json({ status: "ok" }));