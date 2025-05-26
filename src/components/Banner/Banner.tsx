import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import './Banner.css';

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseRAF = useRef<number | null>(null);

  // (Unused movingTexts removed)
  const overlayLogos = useMemo(
    () => [
      { src: '/img/dien-hai.png', alt: 'Điện Hải Logo' },
      { src: '/img/gialong.png', alt: 'Gia Long Logo' },
      { src: '/img/vungtau.png', alt: 'Vũng Tàu Logo' },
      { src: '/img/rakhoi.png', alt: 'Ra Khơi Logo' },
    ],
    []
  );

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    console.error('Failed to load banner image');
  }, []);

  // Optimized mouse parallax effect using requestAnimationFrame
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (mouseRAF.current !== null) return;
    mouseRAF.current = requestAnimationFrame(() => {
      if (!e.currentTarget) {
        mouseRAF.current = null;
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      // Tính toán vị trí chuột tương đối, nhân hệ số để tạo hiệu ứng nhẹ nhàng
      const x = ((e.clientX - rect.left) - rect.width / 2) / rect.width;
      const y = ((e.clientY - rect.top) - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 20, y: y * 20 });
      mouseRAF.current = null;
    });
  }, []);

  // Intersection Observer for performance (if needed in tương lai, có thể mở lại phần này)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Nếu cần thiết, bạn có thể thao tác khi banner vào/ra khỏi view.
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const bannerElement = document.querySelector('.banner');
    if (bannerElement) {
      observer.observe(bannerElement);
    }

    return () => {
      if (bannerElement) observer.unobserve(bannerElement);
    };
  }, []);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = [
      '/img/BWC2_LOGO.png',
      '/img/hdvn_info.jpg',
      ...overlayLogos.map(logo => logo.src),
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [overlayLogos]);

  return (
    <section
      className={`banner ${className}`}
      role="banner"
      aria-label="Banner chính"
      onMouseMove={handleMouseMove}
    >
      {/* Floating decorative elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>

      {/* Main Banner Image */}
      <div className="banner-image-container">
        {!imageError ? (
          <img
            src="/img/BWC2_LOGO.png"
            alt="Banner WODO - Hướng Đạo Việt Nam"
            className={`banner-image ${isLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="eager"
            fetchPriority="high"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(${isLoaded ? 1 : 1.1})`
            }}
          />
        ) : (
          <div className="banner-fallback" role="img" aria-label="Banner placeholder">
            <div className="banner-fallback-content">
              <h2>WODO</h2>
              <p>Hướng Đạo Việt Nam</p>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Left Logo Group */}
      <div
        className="left-logo-group"
        role="complementary"
        style={{
          transform: `translateY(-50%) translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
        }}
      >
        <img
          src="/img/hdvn_info.jpg"
          alt="Logo Hướng Đạo Việt Nam"
          className="logo main-logo"
          loading="lazy"
        />
        <div className="left-logo-text-group">
          <h3 className="left-logo-text1">HƯỚNG ĐẠO VIỆT NAM</h3>
          <h4 className="left-logo-text1 english">Pathfinder Scouts Vietnam</h4>
          <p className="left-logo-text2">Thành viên thứ 170 của WOSM</p>
        </div>
      </div>

      {/* Enhanced Right Overlay Logos */}
      <div
        className="overlay-logos"
        role="complementary"
        aria-label="Các logo đối tác"
        style={{
          transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`
        }}
      >
        {overlayLogos.map((logo, index) => (
          <div key={index} className="logo-wrapper">
            <img
              src={logo.src}
              alt={logo.alt}
              className="logo overlay-logo"
              loading="lazy"
              style={{
                animationDelay: `${1 + index * 0.3}s`,
                transform: `translate(${mousePosition.x * (0.1 + index * 0.05)}px, ${mousePosition.y * (0.1 + index * 0.05)}px)`
              }}
            />
          </div>
        ))}
      </div>

      {/* Enhanced Loading Indicator */}
      {!isLoaded && !imageError && (
        <div className="banner-loading" aria-label="Đang tải banner">
          <div className="loading-spinner"></div>
          <p>Đang tải...</p>
        </div>
      )}
    </section>
  );
};

export default Banner;