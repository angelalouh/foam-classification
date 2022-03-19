import React from "react";
import { updateReactorFoamingStatus } from "./utils/api";

function ReactorCardButtons({ reactor, loadReactorImages }) {
  function handleFoamingStatusClick(event) {
    event.preventDefault();
    const foamingStatus = event.target.innerText;
    const updatedReactor = {
      ...reactor,
      foaming_status: foamingStatus,
    };

    const abortController = new AbortController();
    updateReactorFoamingStatus(updatedReactor, abortController.signal).then(
      () => loadReactorImages()
    );
    
    return () => abortController.abort();
  }

  return (
    <div className="d-grid gap-2 col-9 mx-auto">
      <button
        id="classification-button"
        className="btn btn-warning"
        type="submit"
        onClick={handleFoamingStatusClick}
      >
        foaming
      </button>
      <button
        id="classification-button"
        className="btn btn-success"
        type="submit"
        onClick={handleFoamingStatusClick}
      >
        non-foaming
      </button>
    </div>
  );
}

export default ReactorCardButtons;
