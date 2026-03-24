# Project Overview

Build a Water Charity tracking application utilizing a .NET 10 C# Web API for the backend and a React single-page application (using Vite and TypeScript) for the frontend.

## Phase 1 & 2 Project Initialization and Setup

- **Create the Root Folder:** Create a main folder on your desktop called `Water Project`.
- **Generate the Backend:** In the root folder, run `dotnet new webapi -n WaterProject.API -o backend --use-controllers`.
- **Generate the Frontend:** In the root folder, run `npm create vite@latest`, choose output folder `frontend`, select **React** and **TypeScript**, then run `npm install` inside `frontend`.

## Formatting and Linting Setup (Frontend)

- **Install Prettier:** Run `npm install prettier --save-dev` in `frontend`.
- **Install ESLint Connectors:** Run `npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`.
- **Configure Prettier:** Create `frontend/prettierrc.json` with:
  - `"semi": true`
  - `"singleQuote": true`
  - `"jsxSingleQuote": false`
  - `"trailingComma": "es5"`
  - `"printWidth": 80`
  - `"tabWidth": 2`
  - `"endOfLine": "auto"`
- **Update ESLint Config:** In `frontend/eslint.config.js`, include:
  - `import prettier from 'eslint-plugin-prettier'`
  - `eslint-config-prettier` in `extends`
  - `"prettier/prettier"` in rules so Prettier formatting is enforced

## Database and Entity Framework Setup (Backend)

- **Create Data Folder:** Inside `backend`, create a `Data` folder.
- **Import Database:** Place `WaterProject.sqlite` in the `backend` folder.
- **Configure Connection String:** In `backend/appsettings.json`, add:
  - `"WaterConnection": "Data Source=WaterProject.sqlite"`
- **Install EF Core Tools (optional but recommended):** `dotnet tool install --global dotnet-ef --version 10.*`
- **Install EF Packages:** Run:
  - `dotnet add package Microsoft.EntityFrameworkCore --version "10.*"`
  - `dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version "10.*"`

## C# Models and Context (Backend)

- **Create the Model:** In `backend/Data/Project.cs`, define properties matching SQLite schema:
  - `ProjectId: int`
  - `ProjectName: string`
  - `ProjectType: string?`
  - `ProjectRegionalProgram: string?`
  - `ProjectImpact: int?`
  - `ProjectPhase: string?`
  - `ProjectFunctionalityStatus: string?`
- **Create the DbContext:** In `backend/Data/WaterDbContext.cs`, inherit from `DbContext` and define `DbSet<Project> Projects`.

## API Configuration and Port Setup

- **Wire up the Database:** In `backend/Program.cs`, register:
  - `builder.Services.AddDbContext<WaterDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection")));`
- **Configure CORS:** In `Program.cs`, configure CORS for `http://localhost:3000` and apply it with `app.UseCors(...)`.
- **Set Backend Ports:** In `backend/Properties/launchSettings.json`, remove default HTTP profile and set HTTPS `5000` + HTTP `4000`.
- **Set Frontend Port:** In `frontend/vite.config.ts`, set `server: { port: 3000 }`.

## Backend API Logic (Controllers)

- **Controller Creation:** Create a `WaterController` and inject `WaterDbContext`.
- **Explicit Routing:** Use explicit routes such as `[HttpGet("allprojects")]` and `[HttpGet("functionalprojects")]`.
- **Pagination Logic:** Use action parameters like `int pageHowMany = 10, int pageNum = 1`.
- **Skip and Take:** Page records with `.Skip((pageNum - 1) * pageHowMany).Take(pageHowMany)`.
- **Returning Multiple Values:** Return both paged data and total count:
  - `return Ok(new { projects = paginatedList, totalNumProjects = totalCount });`

## Frontend Types, Data, and Styling

- **Install Bootstrap:** Run `npm install bootstrap` and import `bootstrap/dist/css/bootstrap.min.css` in `frontend/src/main.tsx`.
- **Build TypeScript Interface:** In `frontend/src/types/Project.ts`, create interface `Project` with camelCase fields matching backend JSON:
  - `projectId: number`
  - `projectName: string`
  - `projectType: string | null`
  - `projectRegionalProgram: string | null`
  - `projectImpact: number | null`
  - `projectPhase: string | null`
  - `projectFunctionalityStatus: string | null`
- **State Management:** In `App.tsx`, use `useState` for `projects`, `pageSize`, `pageNum`, `totalItems`, and `totalPages`.
- **Consume JSON:** Use `useEffect` fetch with query parameters:
  - ``?pageHowMany=${pageSize}&pageNum=${pageNum}``
- **Calculate Pages:** Use `Math.ceil(totalItems / pageSize)`.
- **Render Data:** Use `.map()` to render project cards and set `key={project.projectId}`.
- **Page Size Dropdown:** On change, cast to number and reset page to 1.
- **Build Buttons Dynamically:** Use `[...Array(totalPages)].map((_, index) => ...)`.
- **Previous/Next Buttons:** Disable at boundaries (`pageNum === 1` and `pageNum === totalPages`).

## Git and GitHub Setup

- **Initialize Git:** From the root folder, run `git init` (use `main` as the default branch).
- **Initial Commit:** Run `git add .` then `git commit -m "initial commit"`.
- **Push to Origin:** Run `git remote add origin <repository_url>` and `git push -u origin main`.
- **Create Phase Branches:** Run `git checkout -b phase2` and `git push -u origin phase2`.