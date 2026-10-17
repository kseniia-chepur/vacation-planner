# Backend

Backend API for the Vacation Planner application, built with NestJS and MongoDB.

## Tech Stack

- NestJS
- TypeScript
- MongoDB
- Mongoose

## Project Structure

- `src/trips/` — trip management module

## Configuration

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
```

## Run Locally

```bash
npm install
npm run start:dev
```

The server runs in development mode with automatic reloads.