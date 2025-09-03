import { DataTypes } from "sequelize";
import sequelize from "../postgresDB/db.js";

const Video = sequelize.define("Video", {
  video_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  channel_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  channel_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumbnails: {
    type: DataTypes.JSONB,
  },
}, {
  tableName: "videos",
  schema: "youtube",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Video;
