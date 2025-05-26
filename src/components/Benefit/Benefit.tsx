import React, { useState, useEffect } from "react";
import './Benefit.css';

const Benefit: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const section = document.querySelector('.gallery-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section className="gallery-section">
      <div className="content-wrapper">
        <div className="text-content">
          <span className="badge">✨Phong Trào Hướng Đạo</span>
          <h2 className="heading">
            SCOUT MOVEMENT
            <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              WE ARE SCOUTS!
            </span>
          </h2>
          <p className="description">
            Phong trào Hướng đạo là một phong trào thanh thiếu niên toàn cầu nhằm xây dựng tình bạn,
              trải nghiệm và kỹ năng sống, định hình tương lai của giới trẻ như những công dân tích cực. Kể
              từ khi được thành lập vào năm 1907, đã có hơn 500 triệu thanh thiếu niên và người lớn tham
              gia và trải nghiệm sức mạnh của giáo dục phi chính quy từ Hướng đạo.

              Ke từ đo, Phong trao Huớng đạo khong ngung phat triển va hiện đang hoạt động tại 176 Tổ
              chức Hướng đạo Quốc gia. Ngày nay, hon 57 triệu thanh thiếu niên, với sự hỗ trợ của hàng
              triệu tình nguyện viên tận tâm, đang tham gia các hoạt động và sự kiện Hướng đạo trên toàn
              thế giới.
          </p>
          {/* <button 
            className="join-button"
            onClick={() => {
              // Add smooth scroll or navigation logic here
              console.log('Navigate to join guide');
            }}
          >
            🚀 HƯỚNG DẪN GIA NHẬP PHONG TRÀO
          </button> */}
        </div>

        <div className="cards-container">
          <div className="card card-1">
            <div className="card-image-container">
              <img
                alt="Two boys walking in a field carrying rope and wearing scout uniforms"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/1721c0db-4b9d-418a-226d-15952d39e2c1.jpg"
                width={400}
                loading="lazy"
              />
            </div>
            <div className="card-content card-content-1">
              <h3>🌲 THIÊN NHIÊN</h3>
              <p>
                Giúp các em hòa nhập thiên nhiên, học dựng lều, nấu nướng, kỹ năng 
                thoát hiểm và khám phá thế giới xung quanh một cách an toàn.
              </p>
            </div>
          </div>

          <div className="card card-2">
            <div className="card-image-container">
              <img
                alt="Group of young people walking outdoors in scout uniforms"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/e2d9815a-bd64-4cc0-40bb-167250ad5423.jpg"
                width={400}
                loading="lazy"
              />
            </div>
            <div className="card-content card-content-2">
              <h3>🌟 PHÁT TRIỂN</h3>
              <p>
                Giúp phát triển tư duy sáng tạo, rèn luyện thể chất và xây dựng 
                lý tưởng cao đẹp, trở thành người có ích cho cộng đồng và xã hội.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;