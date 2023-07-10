import React from "react";

const Image = ({ src, loading, alt, fallback, style }) => {
  const handleBrokenImage = (event) => (event.target.src = fallback);

  return (
    <img
      src={src}
      loading={loading}
      alt={alt}
      onError={handleBrokenImage}
      style={style}
    />
  );
};

export default Image;
