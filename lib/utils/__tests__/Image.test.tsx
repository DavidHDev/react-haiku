import { describe, expect, it } from 'vitest';
import { takeSnapshot } from 'lib/helpers/testHelper';
import { fireEvent, render, screen } from '@testing-library/react';
import { Image } from '../Image';

describe('Image', () => {
  const src = 'https://example.com/image.jpg';
  const fallback = 'https://example.com/fallback.jpg';
  const alt = 'Example Image';

  it('renders the Image component', () => {
    takeSnapshot(<Image alt={alt} src={src} fallback={fallback} />);
    const imgElement = screen.getByAltText(alt);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', src);
  });

  it('renders with loading attribute', () => {
    const loading = 'lazy';
    render(<Image src={src} alt={alt} loading={loading} fallback={fallback} />);
    const imgElement = screen.getByAltText(alt);
    expect(imgElement).toHaveAttribute('loading', loading);
  });

  it('renders with additional props', () => {
    const cutomClass = 'cutom-class';
    render(
      <Image src={src} alt={alt} fallback={fallback} className={cutomClass} />,
    );
    const imgElement = screen.getByAltText(alt);
    expect(imgElement).toHaveClass(cutomClass);
  });

  it('handles broken image by setting fallback src', () => {
    render(<Image src={src} alt={alt} fallback={fallback} />);
    const imgElement = screen.queryByRole('img');
    fireEvent.error(imgElement!);
    expect(imgElement).toHaveAttribute('src', fallback);
  });

  it('should not change src if image loads correctly', () => {
    render(<Image src={src} alt={alt} fallback={fallback} />);
    const imgElement = screen.queryByRole('img');
    fireEvent.load(imgElement!);
    expect(imgElement).toHaveAttribute('src', src);
  });
});
