import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { personalInfo } from '../data';

const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Tentang', href: '#about' },
  { label: 'Keahlian', href: '#skills' },
  { label: 'Proyek', href: '#projects' },
  { label: 'Pengalaman', href: '#experience' },
  { label: 'Sertifikat', href: '#certificates' },
  { label: 'Kontak', href: '#contact' },
];

export default function Navbar({ scrollProgress }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setScrolled(scrollProgress > 0.01);
  }, [scrollProgress]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Spacer for desktop symmetry */}
        <div className="navbar-spacer" />

        {/* Desktop nav */}
        <ul className="navbar-links">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <button
                className={`navbar-link ${activeSection === href.slice(1) ? 'navbar-link--active' : ''}`}
                onClick={() => handleNavClick(href)}
              >
                {label}
                <span className="navbar-link-indicator" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar-actions">
          <a
            href={personalInfo.cv}
            className="btn btn--outline btn--sm"
            target="_blank"
            rel="noreferrer"
          >
            Unduh CV
          </a>
          <button
            className="navbar-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu navigasi"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="mobile-menu-header" style={{ justifyContent: 'flex-end' }}>
              <button onClick={() => setIsOpen(false)} className="mobile-menu-close" aria-label="Tutup menu">
                <X size={24} />
              </button>
            </div>
            <ul className="mobile-menu-links">
              {navLinks.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    className={`mobile-menu-link ${activeSection === href.slice(1) ? 'active' : ''}`}
                    onClick={() => handleNavClick(href)}
                  >
                    <span className="mobile-menu-num">0{i + 1}</span>
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu-footer">
              <a href={personalInfo.cv} className="btn btn--primary" target="_blank" rel="noreferrer">
                Unduh CV Lengkap
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="scroll-progress-bar">
        <motion.div
          className="scroll-progress-fill"
          style={{ scaleX: scrollProgress, transformOrigin: 'left' }}
        />
      </div>
    </>
  );
}
