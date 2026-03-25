import { useState } from "react";
import ProjectList from "../components/ProjectList";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomBand";

function ProjectsPage() {

  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container">
        <div className="row">
          <div className="col-12">
            <WelcomeBand totalItems={totalItems} showTotal />
            <h2 className="text-center mb-3">Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CategoryFilter selectedCategories={selectedCategories} onCheckboxChange={setSelectedCategories} />
          </div>
          <div className="col-md-8">
            <ProjectList selectedCategories={selectedCategories} onTotalItemsChange={setTotalItems} />
          </div>
        </div>
      </div>
    );
}

export default ProjectsPage;