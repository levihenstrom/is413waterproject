import { useEffect, useState } from "react";
import type { Project } from "./types/Project";
import "./App.css";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      try {
        setError(null);
        const response = await fetch(
          `https://localhost:5000/Water/allprojects?pageHowMany=${pageSize}&pageNum=${pageNum}`,
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: { projects: Project[]; totalNumProjects: number } =
          await response.json();
        setProjects(data.projects);
        setTotalItems(data.totalNumProjects);
      } catch {
        setError(
          "Could not load projects. Ensure backend is running on https://localhost:5000.",
        );
      }
    };

    void fetchProjects();
  }, [pageSize, pageNum]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 className="h2 mb-1">Water Project Dashboard</h1>
          <p className="text-muted mb-0">Total Projects: {totalItems}</p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="pageSizeSelect" className="fw-semibold">
            Projects per page
          </label>
          <select
            id="pageSizeSelect"
            className="form-select"
            style={{ width: "auto" }}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {error ? <div className="alert alert-danger">{error}</div> : null}

      <div className="row g-3">
        {projects.map((project) => (
          <div className="col-12 col-md-6 col-xl-4" key={project.projectId}>
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title h5">{project.projectName}</h2>
                <ul className="list-unstyled small mb-0">
                  <li>
                    <strong>Type:</strong> {project.projectType ?? "N/A"}
                  </li>
                  <li>
                    <strong>Regional Program:</strong>{" "}
                    {project.projectRegionalProgram ?? "N/A"}
                  </li>
                  <li>
                    <strong>Impact:</strong> {project.projectImpact ?? "N/A"}
                  </li>
                  <li>
                    <strong>Phase:</strong> {project.projectPhase ?? "N/A"}
                  </li>
                  <li>
                    <strong>Functionality:</strong>{" "}
                    {project.projectFunctionalityStatus ?? "N/A"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
        <button
          className="btn btn-outline-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum((currentPage) => currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className="btn btn-outline-primary"
            disabled={pageNum === index + 1}
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary"
          disabled={pageNum === totalPages || totalPages === 0}
          onClick={() => setPageNum((currentPage) => currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
