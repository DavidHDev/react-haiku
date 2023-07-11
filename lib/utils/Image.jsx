import React from "react";

export const Image = ({
  src,
  loading,
  alt,
  fallback,
  style,
  width,
  height,
  className,
}) => {
  const handleBrokenImage = (event) => (event.target.src = fallback);

  return (
    <img
      src={src}
      loading={loading}
      alt={alt}
      onError={handleBrokenImage}
      style={style}
      width={width}
      height={height}
      className={className}
    />
  );
};
