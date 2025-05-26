// Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { to: '/AboutUs', label: 'Về chúng tôi', icon: 'fa-info-circle' },
    { to: '/projects', label: 'Dự án', icon: 'fa-project-diagram' },
    { to: '/DonatePage', label: 'Donate', icon: 'fa-donate' },
    { to: '/contact', label: 'Liên hệ', icon: 'fa-phone' },
  ];

  const socialLinks = [
    { href: '#', label: 'Facebook', icon: 'fa-facebook-f', color: '#1877F2' },
    { href: '#', label: 'Instagram', icon: 'fa-instagram', color: '#E4405F' },
    { href: '#', label: 'YouTube', icon: 'fa-youtube', color: '#FF0000' },
    { href: '#', label: 'Email', icon: 'fa-envelope', color: '#EA4335' },
  ];

  const organizationInfo = {
    name: 'WODO Portfolio',
    fullName: 'Hướng Đạo Việt Nam - Pathfinder Scouts Vietnam',
    memberInfo: 'Thành viên thứ 170 của WOSM',
    developer: 'Hưng Đặng',
  };

  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Trang chủ WODO">
              <h2>{organizationInfo.name}</h2>
            </Link>
            <div className="footer-description">
              <p className="organization-name">{organizationInfo.fullName}</p>
              <p className="organization-info">{organizationInfo.memberInfo}</p>
              <p className="footer-mission">
                Xây dựng thế hệ trẻ có trách nhiệm với cộng đồng và môi trường
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <nav className="footer-nav" role="navigation" aria-label="Menu footer">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="footer-link">
                  <i className={`fa ${link.icon}`} aria-hidden="true"></i>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h3>Kết nối với chúng tôi</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                <span>Việt Nam</span>
              </div>
              <div className="contact-item">
                <i className="fa fa-globe" aria-hidden="true"></i>
                <span>www.wodo.org.vn</span>
              </div>
            </div>
            {/* <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  style={{ '--social-color': social.color } as React.CSSProperties}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab ${social.icon}`} aria-hidden="true"></i>
                </a>
              ))}
            </div> */}
          </div>
        </div>

        {/* Footer Bottom
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} {organizationInfo.name}</p>
              <span className="separator">•</span>
              <p>Developed with ❤️ by <strong>{organizationInfo.developer}</strong></p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                Điều khoản sử dụng
              </Link>
            </div>
          </div> 
        </div>*/}

        {/* Decorative Elements */}
        <div className="footer-decoration" aria-hidden="true">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;