import { ArrowUp, Mail, MessageSquare } from 'lucide-react';
import { GithubIcon, InstagramIcon } from './SocialIcons';
import { personalInfo } from '../data';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-content">
        <div className="footer-left">
          <p className="footer-brand-name">{personalInfo.name}</p>
          <p className="footer-tagline">
            Founder PT Reyy Digital Group · Teknik Informatika PNL
          </p>
        </div>

        <div className="footer-center">
          <p className="footer-motto">"{personalInfo.company.motto}"</p>
          <p className="footer-copy">
            © 2026 {personalInfo.name}. Seluruh hak cipta dilindungi.
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-social">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={`https://wa.me/${personalInfo.phoneRaw}`}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageSquare size={17} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-social-link"
              aria-label="Email"
              title="Kirim Email"
            >
              <Mail size={17} />
            </a>
          </div>

          <div className="footer-divider-v" />

          <button
            className="footer-top-btn"
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            title="Kembali ke atas"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
