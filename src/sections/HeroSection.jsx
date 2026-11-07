import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '../components/SocialIcons';
import Scene from '../three/Scene';
import { personalInfo } from '../data';

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HeroSection({ mousePosition, isMobile }) {
  const heroRef = useRef(null);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* 3D Canvas */}
      <div className="hero-canvas">
        <Suspense fallback={null}>
          <Scene mousePosition={mousePosition} isMobile={isMobile} />
        </Suspense>
      </div>

      {/* Overlay gradient */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-left">
          {/* Main title */}
          <div className="hero-title-wrapper">
            <motion.h1
              className="hero-title"
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="hero-title-line">CREATIVE</span>
              <span className="hero-title-line hero-title-line--accent">DEVELOPER.</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="hero-subtitle"
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Halo, saya{' '}
            <span className="hero-name">{personalInfo.name}</span>.{' '}
            {personalInfo.tagline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="hero-cta"
            custom={3}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <button className="btn btn--primary btn--lg" onClick={scrollToProjects}>
              <span>Jelajahi Proyek</span>
              <span className="btn-glow" />
            </button>
            <button className="btn btn--outline btn--lg" onClick={scrollToContact}>
              Hubungi Saya
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="hero-social"
            custom={4}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
            <a href={personalInfo.instagram} target="_blank" rel="noreferrer" className="hero-social-link" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hero-social-link" aria-label="Email">
              <Mail size={20} />
            </a>
            <span className="hero-social-line" />
          </motion.div>
        </div>

        {/* Right side — floating info cards */}
        {!isMobile && (
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          >
            <div className="hero-card glass">
              <div className="hero-card-icon">🏢</div>
              <div>
                <p className="hero-card-label">Perusahaan</p>
                <p className="hero-card-value">PT Reyy Digital Group</p>
              </div>
            </div>
            <div className="hero-card glass">
              <div className="hero-card-icon">🎓</div>
              <div>
                <p className="hero-card-label">Pendidikan</p>
                <p className="hero-card-value">PNL</p>
              </div>
            </div>
            <div className="hero-card glass">
              <div className="hero-card-icon">📍</div>
              <div>
                <p className="hero-card-label">Domisili</p>
                <p className="hero-card-value">Aceh Timur, Indonesia</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero-scroll-btn"
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Gulir ke bawah"
      >
        <span className="hero-scroll-text">Gulir</span>
        <ArrowDown size={16} className="hero-scroll-arrow" />
      </motion.button>

      {/* Grid overlay */}
      <div className="hero-grid" />
    </section>
  );
}
