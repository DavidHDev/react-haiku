import { ImgHTMLAttributes } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { fallback: string };

export const Image = ({ src, loading, alt, fallback, ...props }: Props) => {
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
