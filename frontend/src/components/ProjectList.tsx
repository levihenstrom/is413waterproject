import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import type { Project } from "../types/Project";
import "../App.css";
import { useNavigate } from "react-router-dom";

function ProjectList({selectedCategories, onTotalItemsChange }: {selectedCategories: string[], onTotalItemsChange: (total: number) => void}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPageNum(1);
  }, [selectedCategories]);

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {

      const categoryParams = selectedCategories.map((category) => `projectTypes=${encodeURIComponent(category)}`).join("&");

      try {
        setError(null);
        const response = await fetch(
          `${API_BASE_URL}/Water/allprojects?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length > 0 ? `&${categoryParams}` : ""}`,
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: { projects: Project[]; totalNumProjects: number } =
          await response.json();

        setProjects(data.projects);
        onTotalItemsChange?.(data.totalNumProjects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch {
        setError(
          `Could not load projects. Start the API (e.g. dotnet run in backend) so it listens on ${API_BASE_URL}.`,
        );
      }
    };

    void fetchProjects();
  }, [pageSize, pageNum, selectedCategories, onTotalItemsChange]);

  return (
    <>
      <div className="py-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
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
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {error ? <div className="alert alert-danger">{error}</div> : null}

        <div className="row g-4">
          {projects.map((p) => (
            <div className="col-12" key={p.projectId}>
              <div className="card h-100 project-card">
                <div className="card-body text-center">
                  <h2 className="card-title h5">{p.projectName}</h2>
                  <ul className="list-unstyled small mb-3 project-meta">
                    <li>
                      <strong>Type:</strong> {p.projectType ?? "N/A"}
                    </li>
                    <li>
                      <strong>Regional Program:</strong>{" "}
                      {p.projectRegionalProgram ?? "N/A"}
                    </li>
                    <li>
                      <strong>Impact:</strong> {p.projectImpact ?? "N/A"}
                    </li>
                    <li>
                      <strong>Phase:</strong> {p.projectPhase ?? "N/A"}
                    </li>
                    <li>
                      <strong>Functionality:</strong>{" "}
                      {p.projectFunctionalityStatus ?? "N/A"}
                    </li>
                  </ul>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      navigate(`/donate/${p.projectId}/${encodeURIComponent(p.projectName)}`)
                    }
                  >
                    Add to Cart
                  </button>
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
    </>
  );
}

export default ProjectList;
