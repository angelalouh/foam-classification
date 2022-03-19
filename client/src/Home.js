import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import ReactorCards from "./ReactorCards";
import FilterButtons from "./FilterButtons";
import { listReactorImages } from "./utils/api.js";

function App() {
  const [currentReactorImages, setCurrentReactorImages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  let { filter_selected } = useParams();
  const navigate = useNavigate();

  const reactorImagesPerPage = 20;
  let currentPage;

  if (searchParams.has("page")) {
    currentPage = searchParams.get("page");
  } else {
    currentPage = 1;
  }

  useEffect(loadReactorImages, [currentPage, filter_selected]);

  function loadReactorImages() {
    const abortController = new AbortController();

    listReactorImages(
      { page: currentPage, limit: reactorImagesPerPage },
      filter_selected,
      abortController.signal
    ).then((response) => {
      setCurrentReactorImages(response);
    });

    if (document.activeElement.id !== "classification-button") {
      window.scrollTo(0, 0);
    }

    return () => abortController.abort();
  }

  const handlePageChange = (pageNumber) => {
    if (!filter_selected) {
      filter_selected = "all";
    }
    
    setSearchParams({ page: pageNumber });
    navigate(`/${filter_selected}/?page=${pageNumber}`);
    window.scrollTo(0, 0);
  };

  return (
    <main className="m-4">
      <div className="mb-5">
        <h1>Foam Classification</h1>
      </div>

      <FilterButtons setSearchParams={setSearchParams} />

      {!currentReactorImages.data ? (
        <p className="fw-bold fs-4">Loading Reactor Cards...</p>
      ) : (
        <>
          <ReactorCards
            currentReactorImages={currentReactorImages.data}
            loadReactorImages={loadReactorImages}
          />

          <div className="d-flex justify-content-center mt-4">
            <Pagination
              aria-label="Page navigation example"
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="Prev"
              nextPageText="Next"
              firstPageText="First"
              lastPageText="Last"
              activePage={Number(currentPage)}
              itemsCountPerPage={reactorImagesPerPage}
              totalItemsCount={currentReactorImages.total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
