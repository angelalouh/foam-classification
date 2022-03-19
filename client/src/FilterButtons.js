import React from "react";
import { useNavigate } from "react-router-dom";

function FilterButtons({ setSearchParams }) {
  const navigate = useNavigate();

  function handleFilterClick(event) {
    event.preventDefault();
    setSearchParams({ page: 1 });
    const filterSelected = event.target.innerText;
    navigate(`/${filterSelected}/?page=${1}`);
  }

  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-3">
      <h6 className="text-start pt-1">Filter:</h6>
      <button
        className="btn btn-primary btn-sm"
        type="submit"
        onClick={handleFilterClick}
      >
        all
      </button>
      <button
        className="btn btn-primary btn-sm"
        type="submit"
        onClick={handleFilterClick}
      >
        foaming
      </button>
      <button
        className="btn btn-primary btn-sm"
        type="submit"
        onClick={handleFilterClick}
      >
        non-foaming
      </button>
      <button
        className="btn btn-primary btn-sm"
        type="submit"
        onClick={handleFilterClick}
      >
        unclassified
      </button>
    </div>
  );
}

export default FilterButtons;
