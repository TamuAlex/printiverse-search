
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage = ({ src, alt, className }: LazyImageProps) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    effect="blur"
    className={className}
    loading="lazy"
    wrapperClassName={className}
  />
);
