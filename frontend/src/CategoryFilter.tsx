import { useEffect, useState } from "react";

function CategoryFilter() 
{

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {   
                const response = await fetch('https://localhost:5000/Water/GetProjectsTypes');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                console.log("Categories:", data);
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

  return (
    <div>
      <h1>Category Filter</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
