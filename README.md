# Water Project

Full-stack Water Charity tracking app with:
- Backend: ASP.NET Core Web API (.NET 10) + SQLite + Entity Framework Core
- Frontend: React + TypeScript + Vite + Bootstrap

## Prerequisites

- .NET SDK 10.x
- Node.js 18+ and npm

## Project Structure

- `backend/` - Web API
- `frontend/` - React app
- `backend/WaterProject.sqlite` - SQLite database used by the API

## First-Time Setup

### 1) Backend setup

From the project root:

```bash
cd backend
dotnet restore
dotnet build
```

### 2) Frontend setup

From the project root:

```bash
cd frontend
npm install
```

## Run the App (Development)

You need two terminals.

### Terminal A - Run backend

```bash
cd backend
dotnet run
```

Backend runs on:
- `https://localhost:5000`
- `http://localhost:4000`

### Terminal B - Run frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:
- `http://localhost:3000`

## Build Checks

### Backend build

```bash
cd backend
dotnet build
```

### Frontend lint and build

```bash
cd frontend
npm run lint
npm run build
```

## Notes

- CORS is configured to allow `http://localhost:3000` in backend `Program.cs`.
- In **Development**, HTTPS redirection is turned off so `http://localhost:4000` is not redirected to `https://localhost:5000` (avoids `Failed to fetch` from the self-signed dev certificate).
- The React app calls the API on **`http://localhost:4000`** by default (see `frontend/src/api.ts`). Example:
  - `GET http://localhost:4000/Water/allprojects?pageHowMany=10&pageNum=1`
