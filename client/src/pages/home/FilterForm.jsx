import { useState } from "react";

const INITIAL_FILTERS = {
  priceLte: "",
  priceGte: "",
  featured: "",
};

export default function FilterForm({ onFilter }) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newFilters = {};
    if (filters.featured === "true") newFilters.featured = true;
    if (filters.featured === "false") newFilters.featured = false;

    if (filters.priceGte) newFilters.priceGte = filters.priceGte;
    if (filters.priceLte) newFilters.priceLte = filters.priceLte;

    onFilter(newFilters);
  };

  function handleReset() {
    setFilters(INITIAL_FILTERS);
  }

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <div className="input-wrapper">
        <label>Price Min:</label>
        <input
          type="number"
          name="priceGte"
          value={filters.priceGte}
          onChange={handleChange}
          placeholder="Enter min price"
        />
      </div>
      <div className="input-wrapper">
        <label>Max Price:</label>
        <input
          type="number"
          name="priceLte"
          value={filters.priceLte}
          onChange={handleChange}
          placeholder="Enter max price"
        />
      </div>

      <div className="input-wrapper">
        <label>Min Rating:</label>
        <select
          name="featured"
          value={filters.featured}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="true">Featured</option>
          <option value="false">Not Featured</option>
        </select>
      </div>

      <button type="submit">Apply Filters</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}
