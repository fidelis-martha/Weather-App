
# Weather App

A responsive weather application that provides real-time weather information based on your current location or a searched city.

## Features

- Automatic location detection
- Search weather by city
- Current temperature and weather conditions
- Humidity and wind speed information
- Animated clouds
- Light and dark mode
- Redis caching and API rate limiting

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Caching:** Redis
- **Weather API:** Visual Crossing
- **Deployment:** GitHub Pages and Render

## Getting Started

Clone the repository:

```bash
git clone https://github.com/fidelis-martha/Weather-App.git
cd Weather-App
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
WEATHER_API_KEY=your_api_key
REDIS_URL=your_redis_url
```

Start the backend:

```bash
npm start
```

Open another terminal and install frontend dependencies:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

## Challenges & Solutions

During development, I encountered several challenges:

- **API Integration:** Connected the React frontend to the Express backend using a dedicated API service.
- **Redis Caching:** Implemented Redis caching with a 12-hour expiration to reduce repeated API requests.
- **API Rate Limiting:** Used `express-rate-limit` to control excessive requests.
- **Geolocation:** Implemented browser geolocation to detect users' locations and retrieve weather using coordinates.
- **CORS Issues:** Configured CORS to allow communication between the frontend and backend.
- **Deployment:** Configured environment variables and deployed the backend on Render, with the frontend prepared for GitHub Pages.
- **UI Design:** Improved the interface with animated clouds, glass-effect cards, and light and dark themes.

## Author

**Fidelis Egiriga Martha**

[GitHub](https://github.com/fidelis-martha)
