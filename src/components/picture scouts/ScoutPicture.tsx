import React, { useEffect, useRef, useState } from 'react';
import './ScoutPicture.css';

const images = [
  "/img/scout1.png",
  "/img/scout2.png",
  "/img/scout3.png",
  "/img/scout4.png",
  "/img/scout5.png",
  "/img/scout6.png",
  "/img/scout7.png",
  "/img/scout9.png",
  "/img/scout10.png",
  "/img/scout11.png",
  "/img/scout12.png",
  "/img/scout13.png",
];

const ScoutPicture: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleItems.includes(index)) {
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      itemRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [visibleItems]);

  return (
    <div className="scout-picture-wrapper">
      <h2 className="gallery-title">HÌNH ẢNH SINH HOẠT TẠI MÁI ẤM</h2>
      <div className="gallery-container">
        {images.map((img, index) => (
          <div
            key={index}
            data-index={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`gallery-item ${visibleItems.includes(index) ? 'visible' : ''}`}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <img src={img} alt={`scout-${index}`} />
            <div className="image-counter">
              {index + 1} / {images.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoutPicture;