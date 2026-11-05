import { ArrowUp } from 'lucide-react';
import { GithubIcon, InstagramIcon, TwitterIcon } from './SocialIcons';
import { personalInfo } from '../data';

const socialLinks = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub' },
  { icon: InstagramIcon, href: personalInfo.instagram, label: 'Instagram' },
  { icon: TwitterIcon, href: personalInfo.twitter, label: 'Twitter' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container footer-content">
        <div className="footer-left">
          <p className="footer-tagline">
            Founder PT Reyy Digital Group · Teknik Informatika PNL
          </p>
        </div>

        <div className="footer-center">
          <p className="footer-copy">
            © 2026 Muhammad Raihan. Seluruh hak cipta dilindungi.
          </p>
          <p className="footer-made">
            Dibuat dengan ❤️, React & Three.js
          </p>
        </div>

        <div className="footer-right">
          <div className="footer-social">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <button className="footer-top-btn" onClick={scrollToTop} aria-label="Kembali ke atas">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
