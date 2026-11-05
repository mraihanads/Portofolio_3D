import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { projectsData } from '../data';

const categories = ['Semua', ...Array.from(new Set(projectsData.map((p) => p.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      className="project-card glass"
      style={{ '--project-color': project.color }}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.96 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => onClick(project)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card header */}
      <div className="project-card-header">
        <div
          className="project-card-icon"
          style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}
        >
          <span style={{ color: project.color, fontSize: '1.5rem' }}>
            {getCategoryEmoji(project.category)}
          </span>
        </div>
        <div className="project-card-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="project-icon-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="project-icon-btn"
              onClick={(e) => e.stopPropagation()}
              aria-label="Live site"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <span className="project-category">{project.category}</span>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-tech">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="tech-chip" style={{ borderColor: `${project.color}44` }}>
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="tech-chip">+{project.tech.length - 4}</span>
        )}
      </div>

      <div className="project-card-footer">
        <span className="project-view-more">
          Lihat Detail <ChevronRight size={14} />
        </span>
        <div
          className="project-card-line"
          style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function getCategoryEmoji(cat) {
  const map = {
    'Full Stack': '⚡',
    'Aplikasi Web': '💻',
    'Sistem & Jaringan': '🖥️',
    'Web 3D Interaktif': '🪐',
    'AI & Computer Vision': '👁️',
    'Bisnis Digital': '📈',
  };
  return map[cat] || '🚀';
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content glass"
        style={{ '--project-color': project.color }}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header">
          <div
            className="modal-icon"
            style={{ background: `${project.color}22`, border: `1px solid ${project.color}44` }}
          >
            <span style={{ color: project.color, fontSize: '2rem' }}>
              {getCategoryEmoji(project.category)}
            </span>
          </div>
          <div>
            <span className="project-category">{project.category}</span>
            <h2 className="modal-title">{project.title}</h2>
          </div>
        </div>

        <p className="modal-desc">{project.longDescription}</p>

        <div className="modal-tech">
          <h4>Teknologi Digunakan</h4>
          <div className="project-tech">
            {project.tech.map((t) => (
              <span key={t} className="tech-chip" style={{ borderColor: `${project.color}44` }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {(project.github || project.live) && (
          <div className="modal-actions">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline"
              >
                <GithubIcon size={16} /> Repositori GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn--primary"
              >
                <ExternalLink size={16} /> Kunjungi Situs
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeCategory === 'Semua'
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.span className="section-label" variants={fadeUp}>
            03. Proyek Pilihan
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Portofolio & Karya
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Koleksi solusi digital yang saya kembangkan — mencakup marketplace, sistem rekrutmen cerdas, sistem inventaris, infrastruktur server, hingga pengalaman web 3D.
          </motion.p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="projects-filter"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
