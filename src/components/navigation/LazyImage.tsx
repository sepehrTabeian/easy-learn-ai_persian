import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '',
  fallbackClassName = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div className={`relative ${className}`} ref={imgRef}>
      {!isInView ? (
        // جای‌نگهدار
        <div className={`bg-gray-200 animate-pulse ${className}`} />
      ) : hasError ? (
        // حالت خطا
        <div className={`bg-gray-100 flex items-center justify-center ${fallbackClassName || className}`}>
          <Globe className="w-6 h-6 text-gray-400" />
        </div>
      ) : (
        <>
          {/* حالت بارگذاری */}
          {!isLoaded && (
            <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} />
          )}
          {/* تصویر واقعی */}
          <img
            src={src}
            alt={alt}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
