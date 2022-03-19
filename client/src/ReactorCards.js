import React from "react";
import ProgressiveImage from "./ProgressiveImage";
import ReactorCardButtons from "./ReactorCardButtons";

function ReactorCards({ currentReactorImages, loadReactorImages }) {
  const reactorCards = currentReactorImages.map((reactorImage) => {
    return (
      <div key={reactorImage.reactor_id} className="col">
        <div className="card shadow-sm h-100">
          <ProgressiveImage loadedImage={reactorImage.image_url} />
          <div className="card-body">
            <h5 className="card-title">Reactor {reactorImage.reactor_id}</h5>
            <p className="card-text">Status: {reactorImage.foaming_status}</p>
            <ReactorCardButtons
              reactor={reactorImage}
              loadReactorImages={loadReactorImages}
            />
          </div>
          <div className="card-footer">
            <small className="text-muted">
              Last Modified: {reactorImage.last_modified}
            </small>
          </div>
        </div>
      </div>
    );
  });

  return <div className="row row-cols-1 row-cols-md-5 g-4">{reactorCards}</div>;
}

export default ReactorCards;
