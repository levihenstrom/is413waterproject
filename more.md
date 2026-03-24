**Phase 1 & 2 Project Initialization and Setup**

*   **Create the Root Folder:** Create a main folder on your desktop called `Water Project`.
*   **Generate the Backend:** Open the folder in your terminal and run the command `dotnet new webapi -n WaterProject.API -o backend --use-controllers` using the `.net 8.0` framework to generate the Web API.
*   **Generate the Frontend:** In the root terminal, run `npm create vite@latest` and specify the output folder as `front end`. Select the **React** framework and the **TypeScript** variant. Change directory using `cd front end` and run `npm install` to download node modules.

**Formatting and Linting Setup (Frontend)**

*   **Install Prettier:** Inside the `front end` terminal, run `npm install prettier --save-dev`.
*   **Install ESLint Connectors:** Run `npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier` to ensure the tools do not conflict.
*   **Configure Prettier:** Create a file named `prettierrc.json` in the `front end` folder and add these rules: `"semi": true`, `"singleQuote": true`, `"jsxSingleQuote": false`, `"trailingComma": "es5"`, `"printWidth": 80`, `"tabWidth": 2`, and `"endOfLine": "auto"`.
*   **Update ESLint Config:** Open the ESLint configuration file and add `import prettier from 'eslint-plugin-prettier'` at the top. Add `eslint-config-prettier` to the `extends` section, and add `"prettier/prettier"` to the plugins section.

**Database and Entity Framework Setup (Backend)**

*   **Create Data Folder:** Inside the backend project, create a new folder named `Data`. 
*   **Import Database:** Copy the pre-existing SQLite database file (`water project.sqlite`) into the backend project folder.
*   **Configure Connection String:** Open `appsettings.json` and add a connection string named `"water connection"` pointing to `"Data Source=water project.sqlite"`.
*   **Install EF Core Tools:** In the terminal, run `dotnet tool install --global dotnet-ef --version 8.*` to ensure the global Entity Framework tools are installed.
*   **Install EF Packages:** Run `dotnet add package Microsoft.EntityFrameworkCore --version 8.*` and `dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 8.*` to install the required libraries.

**C# Models and Context (Backend)**

*   **Create the Model:** Create a `Project.cs` file in the `Data` folder. The properties must perfectly match the database fields. Add `[Key] public int ProjectID { get; set; }` and `public string ProjectName { get; set; }`. Add the nullable `?` operator to the remaining optional fields: `public string? ProjectType`, `public string? ProjectRegionalProgram`, `public int? ProjectImpact`, `public string? ProjectPhase`, and `public string? ProjectFunctionalityStatus`.
*   **Create the DbContext:** Add a `WaterDbContext.cs` file in the `Data` folder that inherits from `DbContext`. Define the database table representation by adding `public DbSet<Project> Projects { get; set; }`.

**API Configuration and Port Setup**

*   **Wire up the Database:** Open `Program.cs` and add `builder.Services.AddDbContext<WaterDbContext>` using options to point to `.UseSqlite(builder.Configuration.GetConnectionString("water connection"))`.
*   **Configure CORS:** In `Program.cs`, add `builder.Services.AddCors()` and `app.UseCors()` explicitly specifying `.WithOrigins("http://localhost:3000")` to allow the React app to communicate with the server.
*   **Set Backend Ports:** Open `Properties/launchSettings.json`. Remove the default HTTP profile and create a default profile that forces HTTPS to run on port `5000` and HTTP to run on port `4000`.
*   **Set Frontend Ports:** Open `vite.config.ts` and add `server: { port: 3000 }` after the plugins entry to keep the React port consistent.

**Frontend Types and Styling**

*   **Install Bootstrap:** In the `front end` terminal, run `npm install bootstrap`. Import the library globally by adding `import 'bootstrap/dist/css/bootstrap.min.css'` at the top of the `main.tsx` file.
*   **Build the TypeScript Interface:** Inside the `src` folder, create a `types` folder and add a `Project.ts` file. Export an `interface` named `Project` with fields strictly matching the JSON payload in camelCase: `projectID: number;`, `projectName: string;`, `projectType: string;`, `projectRegionalProgram: string;`, `projectImpact: number;`, `projectPhase: string;`, and `projectFunctionalityStatus: string;`.

**Git and GitHub Setup**

*   **Initialize Git:** Open the root `Water Project` folder in the terminal and run `git init`. To ensure the primary branch uses modern naming conventions, run `git config --global init.defaultBranch main`.
*   **Initial Commit:** Stage your files with `git add .` and run `git commit -m "initial commit"`.
*   **Push to Origin:** Link to your remote GitHub repository by running `git remote add origin <repository_url>` and push the code using `git push -u origin main`. 
*   **Create Branches:** Branch out for specific phases by running `git checkout -b phase2` and push the new branch up to GitHub using `git push -u origin phase2`.