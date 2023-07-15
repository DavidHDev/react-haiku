import React from "react";

export const Image = ({
  src,
  loading,
  alt,
  fallback,
  ...props
}: {
  src: string;
  loading?: "lazy" | "eager";
  alt: string;
  fallback: string;
  [key: string]: any;
}) => {
  const handleBrokenImage = (event: any) => (event.target.src = fallback);

  return (
    <img
      src={src}
      loading={loading}
      alt={alt}
      onError={handleBrokenImage}
      {...props}
    />
  );
};
