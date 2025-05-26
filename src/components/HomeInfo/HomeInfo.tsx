import React, { useEffect, useState, useRef } from 'react';
import './HomeInfo.css';

interface Stat {
  img: string;
  value: string;
  label: string;
  description: string;
  targetNumber: number;
}

const stats: Stat[] = [
  {
    img: '/public/img/users.png',
    value: '57K+',
    label: 'Scouts and volunteers',
    description: 'Cộng đồng đang phát triển mạnh mẽ',
    targetNumber: 57000
  },
  {
    img: '/public/img/national.png',
    value: '176+',
    label: 'National Scout Organizations',
    description: 'Tin cậy và an toàn tuyệt đối',
    targetNumber: 176
  },
  {
    img: '/public/img/community.png',
    value: '2.7B+',
    label: 'Hours of community service',
    description: 'Mạng lưới kết nối rộng khắp',
    targetNumber: 2700000000
  },
  {
    img: '/public/img/project.png',
    value: '16M+',
    label: 'Service projects and actions',
    description: 'Tạo ra tác động tích cực',
    targetNumber: 16000000
  }
];

const HomeInfo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(new Array(stats.length).fill(0));
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const formatNumber = (num: number, originalValue: string): string => {
    if (originalValue.includes('K')) {
      return `${Math.floor(num / 1000)}K+`;
    } else if (originalValue.includes('M')) {
      return `${(num / 1000000).toFixed(1)}M+`;
    } else if (originalValue.includes('B')) {
      return `${(num / 1000000000).toFixed(1)}B+`;
    } else {
      return `${num}+`;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
          startCountAnimation();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startCountAnimation = () => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(prevValues =>
        prevValues.map((_, index) => Math.round(stats[index].targetNumber * easeOutCubic))
      );

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  };

  const handleStatHover = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    event.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const addRippleEffect = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      animation: ripple 0.6s ease-out;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <section 
      ref={sectionRef}
      className="home-info container"
      role="region"
      aria-labelledby="stats-title"
    >
      <div className="info-header">
        <p className="info-subtitle">Một phong trào Giáo dục Thanh thiếu niên Toàn cầu</p>
        <h2 id="stats-title" className="info-title">Những con số ấn tượng</h2>
        <p className="info-description">
          Tầm nhìn của Hướng đạo là trở thành phong trào thanh thiếu niên truyền cảm hứng và toàn diện nhất thế giới
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <article
            key={index}
            className="stats-item"
            onMouseMove={handleStatHover}
            onClick={addRippleEffect}
            tabIndex={0}
            role="button"
            aria-label={`${stat.label}: ${stat.value}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stats-icon-wrapper">
              <div className="stats-icon-bg" />
              <img 
                // Loại bỏ "/public" trong đường dẫn để phù hợp với thư mục public của dự án
                src={stat.img.replace('/public', '')} 
                alt={`${stat.label} icon`} 
                className="stats-icon"
                loading="lazy"
              />
            </div>
            
            <div className="stats-content">
              <h3 className="stats-value">
                {isVisible ? formatNumber(animatedValues[index], stat.value) : '0'}
              </h3>
              <p className="stats-label">{stat.label}</p>
              <p className="stats-description">{stat.description}</p>
            </div>
            
            <div 
              className="floating-particle"
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '50%',
                top: `${20 + index * 10}%`,
                right: `${30 + index * 15}%`,
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.5}s`
              }}
            />
          </article>
        ))}
      </div>

      <div 
        className="floating-shape"
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite',
          zIndex: -1
        }}
      />
      <div 
        className="floating-shape"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
          borderRadius: '30%',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: -1
        }}
      />
      
      <style>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .stats-item {
          position: relative;
          overflow: hidden;
        }
        
        .stats-item::before {
          content: '';
          position: absolute;
          top: var(--mouse-y, 50%);
          left: var(--mouse-x, 50%);
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.3s ease, height 0.3s ease;
          pointer-events: none;
        }
        
        .stats-item:hover::before {
          width: 200px;
          height: 200px;
        }
      `}</style>
    </section>
  );
};

export default HomeInfo;