import { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import "./CategoryFilter.css";

function CategoryFilter({selectedCategories, onCheckboxChange}: {selectedCategories: string[], onCheckboxChange: (categories: string[]) => void}) {
  const [categories, setCategories] = useState<(string | null)[]>([]);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/Water/GetProjectsTypes`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    void fetchCategories();
  }, []);

  function isSelected(category: string | null): boolean {
    return selectedCategories.includes(category ?? "");
  }

  function handleCheckboxChange({ target }: { target: HTMLInputElement }): void {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((category: string) => category !== target.value)
      : [...selectedCategories, target.value];

    onCheckboxChange(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Project Types</h5>
      <div className="category-list">
        {categories.map((category, index) => {
          const id = `category-${index}`;
          return (
            <div key={id} className="category-item">
              <input
                type="checkbox"
                value={category ?? ""}
                id={id}
                checked={isSelected(category)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={id}>{category ?? "(none)"}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
