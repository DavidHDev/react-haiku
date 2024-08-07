import { ImgHTMLAttributes, SyntheticEvent } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & { fallback: string };

export const Image = ({ src, loading, alt, fallback, ...props }: Props) => {
  const handleBrokenImage = (event: SyntheticEvent<HTMLImageElement, Event>) =>
    (event.currentTarget.src = fallback);

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
