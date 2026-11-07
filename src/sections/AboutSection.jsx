import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award, Building2, Briefcase, ExternalLink, Sparkles } from 'lucide-react';
import { aboutData, personalInfo } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Section header */}
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.span className="section-label" variants={fadeUp}>
            01. Tentang Saya
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Profil & Kepemimpinan
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Mahasiswa Teknik Informatika PNL & Founder PT Reyy Digital Group yang memadukan keahlian rekayasa web, administrasi sistem, dan strategi digital.
          </motion.p>
        </motion.div>

        {/* Main about grid */}
        <div className="about-grid">
          {/* Left — Avatar Photo + Stats */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {/* Avatar card with real photo */}
            <div className="about-avatar-wrapper">
              <div className="about-avatar glass">
                {!imgError ? (
                  <img
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    className="about-avatar-img"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="about-avatar-initials">R</div>
                )}
                <div className="about-avatar-ring" />
                <div className="about-avatar-ring about-avatar-ring--2" />
              </div>
            </div>

            {/* Stats */}
            <div className="about-stats">
              {aboutData.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="about-stat glass"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className={`about-stat-value ${stat.value.length > 8 ? 'about-stat-value--sm' : ''}`}>
                    {stat.value}
                  </span>
                  <span className="about-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Description + Company Card + Info */}
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          >
            {/* PT Reyy Digital Group Highlight Banner */}
            <div className="about-company-card glass">
              <div className="about-company-header">
                <div className="about-company-icon">
                  <Building2 size={24} />
                </div>
                <div>
                  <span className="about-company-badge">Perusahaan</span>
                  <h3 className="about-company-name">{personalInfo.company.name}</h3>
                </div>
              </div>
              <p className="about-company-desc">
                {personalInfo.company.description}
              </p>
              <div className="about-company-meta">
                <span className="company-meta-item">
                  <Briefcase size={14} /> Jabatan: <strong>{personalInfo.company.role}</strong>
                </span>
                <span className="company-meta-item">
                  <Sparkles size={14} style={{ color: '#06b6d4' }} /> Motto: <strong style={{ fontStyle: 'italic' }}>"{personalInfo.company.motto}"</strong>
                </span>
                <span className="company-meta-item">
                  <Award size={14} /> Fokus: <strong>Inovasi Web & Produk Digital</strong>
                </span>
              </div>
            </div>

            {aboutData.paragraphs ? (
              aboutData.paragraphs.map((para, idx) => (
                <p key={idx} className="about-desc">{para}</p>
              ))
            ) : (
              <>
                <p className="about-desc">{aboutData.description}</p>
                <p className="about-desc">{aboutData.description2}</p>
              </>
            )}

            <div className="about-info">
              <div className="about-info-item">
                <MapPin size={16} className="about-info-icon" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="about-info-item">
                <GraduationCap size={16} className="about-info-icon" />
                <span>Teknik Informatika — Politeknik Negeri Lhokseumawe</span>
              </div>
            </div>

            <div className="about-cta">
              <a href={personalInfo.cv} className="btn btn--primary" target="_blank" rel="noreferrer">
                Unduh CV Lengkap
              </a>
              <a href="#contact" className="btn btn--outline">
                Hubungi Saya
              </a>
              <a
                href={`https://wa.me/${personalInfo.phoneRaw}`}
                className="btn btn--outline btn--wa"
                target="_blank"
                rel="noreferrer"
              >
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        {/* Education section */}
        <motion.div
          className="education-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.div className="subsection-header" variants={fadeUp}>
            <GraduationCap size={24} className="subsection-icon" />
            <h3 className="subsection-title">Pendidikan Formal</h3>
          </motion.div>

          <div className="education-timeline">
            {aboutData.education.map((edu, i) => (
              <motion.div
                key={i}
                className="education-item glass"
                variants={fadeUp}
                whileHover={{ x: 6, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              >
                <div className="education-dot" />
                <div className="education-content">
                  <div className="education-header">
                    <h4 className="education-degree">{edu.degree}</h4>
                    <span className="education-year">
                      <Calendar size={13} /> {edu.year}
                    </span>
                  </div>
                  <p className="education-school">{edu.school}</p>
                  <p className="education-desc">{edu.description}</p>
                  {edu.gpa && (
                    <span className="education-gpa">{edu.gpa}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
