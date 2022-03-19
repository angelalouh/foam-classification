import React, { useState } from "react";
import imagePlaceholder from "./image-placeholder.jpg";

function ProgressiveImage({ loadedImage }) {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(imagePlaceholder);

  const handleImageLoaded = () =>
    setTimeout(() => {
      setCurrentSrc(loadedImage);
      setLoading(false);
    }, 500);

  return (
    <img
      src={currentSrc}
      className="card-img-top"
      style={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity 0.8s linear",
      }}
      onLoad={handleImageLoaded}
      alt="reactor"
    />
  );
}

export default ProgressiveImage;
