import { useState } from "react";
import "./App.css";
import CategoryFilter from "./CategoryFilter";
import ProjectList from "./ProjectList";
import WelcomeBand from "./WelcomBand";

function App() {
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <WelcomeBand totalItems={totalItems} />
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
    </>
  );
}

export default App;
