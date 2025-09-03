# 🎬 Serri Backend Assignment

A backend service that fetches and stores YouTube videos based on a predefined search query. It provides APIs to retrieve the stored videos in a paginated format and search for videos by title or description.

---

## 📁 Project Structure

```
Serri-Backend-Assignment/
├── src/                  # Application source code
├── DockerFile            # Dockerfile for containerization
└── .gitignore            # Git ignore file
```

---

## 🚀 Features

* **Fetch YouTube Videos**: Retrieves videos based on a predefined search query.
* **Store Video Metadata**: Saves video details like title, description, and URL.
* **Search API**: Allows searching for videos by title or description.
* **Pagination Support**: Fetch videos in a paginated manner.
* **Dockerized**: Containerized application for easy deployment.

---

## 🛠️ Tech Stack

* **Node.js**: JavaScript runtime for building the backend.
* **Express.js**: Web framework for building APIs.
* **Postgres**: SQL database for storing video metadata.
* **Docker**: Containerization for consistent deployment.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/saketh3118/Serri-Backend-Assignment.git
cd Serri-Backend-Assignment/src
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

```env
PORT = 8000

YT_API_URL = https://www.googleapis.com/youtube/v3/search
YT_API_KEYS = AIzaSyA5Bw1LmJJlsdV-fIKWd5yff66DadhNMz0,AIzaSyDy1FFPYnFbt4MpyDQK09x3mB0TDYuxSb0
YT_SEARCH_QUERY = cricket

POLL_INTERVAL = 10000

DB_USER = rw_user
DB_PASSWORD = qXLo$z9O7L@R8b
DB_NAME = serri
DB_HOST = localhost
DB_PORT = 5432
```

Replace `DB` with your Postgres credentials.

---

## 🐳 Docker Setup

To run the application using Docker:

1. **Build the Docker Image**

   ```bash
   docker build -t serri-backend .
   ```

2. **Run the Docker Container**

   ```bash
   docker run -d -p 8000:8000 --name serri-backend serri-backend
   ```

The application will be accessible at `http://localhost:8000`.

---

## 📡 API Endpoints

### `GET /api/v1/videos`

Fetches a list of stored videos.

**Response:**

```json
[
  {
    "id": "video_id",
    "title": "Video Title",
    "description": "Video Description",
    "url": "https://www.youtube.com/watch?v=video_id"
  },
  ...
]
```

### `GET /api/v1/videos/search`

Search for videos by title or description.

**Query Parameters:**

* `q`: Search query (required)
* `page`: Page number (default: 1)
* `limit`: Results per page (default: 10)

**Example:**

```bash
GET /api/v1/videos/search?q=Node.js&page=1&limit=10
```

**Response:**

```json
{
  "page": 1,
  "limit": 10,
  "total": 100,
  "videos": [
    {
      "id": "video_id",
      "title": "Node.js Tutorial",
      "description": "Learn Node.js",
      "url": "https://www.youtube.com/watch?v=video_id"
    },
    ...
  ]
}
```

---

## 🧪 Testing

To test the APIs, you can use tools like [Postman](https://www.postman.com/)

---
