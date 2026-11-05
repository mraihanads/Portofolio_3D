import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { certificatesData } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function CertificatesSection() {
  return (
    <section id="certificates" className="section certificates-section">
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
            05. Sertifikat & Kredensial
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Sertifikasi & Kredensial
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Kredensial akademik dan pencapaian profesional yang memvalidasi keahlian teknis serta integritas kerja saya.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="certificates-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {certificatesData.map((cert) => (
            <motion.div
              key={cert.id}
              className="cert-card glass"
              style={{ '--cert-color': cert.color }}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02, borderColor: `${cert.color}66` }}
            >
              {/* Icon */}
              <div
                className="cert-icon"
                style={{
                  background: `${cert.color}18`,
                  border: `1px solid ${cert.color}44`,
                }}
              >
                <span className="cert-emoji">{cert.icon}</span>
                <div
                  className="cert-icon-glow"
                  style={{ background: `radial-gradient(circle, ${cert.color}33, transparent)` }}
                />
              </div>

              {/* Content */}
              <div className="cert-content">
                <div className="cert-header">
                  <h3 className="cert-title">{cert.title}</h3>
                  <Award size={16} style={{ color: cert.color }} />
                </div>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-desc">{cert.description}</p>

                <div className="cert-footer">
                  <div className="cert-meta">
                    <span className="cert-date">
                      <Calendar size={12} /> {cert.date}
                    </span>
                    <span className="cert-id">ID: {cert.credentialId}</span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="cert-accent"
                style={{
                  background: `linear-gradient(90deg, ${cert.color}44, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

