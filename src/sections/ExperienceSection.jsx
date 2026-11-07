import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
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
            04. Pengalaman
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Pengalaman Kerja & Kepemimpinan
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Perjalanan profesional yang memadukan kepemimpinan bisnis di PT Reyy Digital Group, pengembangan platform ID-Store.net, bisnis produk digital, affiliate marketing, dan kepemimpinan organisasi.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline">
          <div className="timeline-line" />
          {experienceData.map((exp, i) => (
            <motion.div
              key={exp.id}
              className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            >
              {/* Timeline node */}
              <div
                className="timeline-node"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 20px ${exp.color}66`,
                }}
              >
                <Briefcase size={16} />
              </div>

              {/* Card */}
              <motion.div
                className="timeline-card glass"
                style={{ '--exp-color': exp.color }}
                whileHover={{ scale: 1.02, borderColor: `${exp.color}66` }}
              >
                <div className="timeline-card-header">
                  <div>
                    <span className="exp-type">{exp.type}</span>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company" style={{ color: exp.color }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>

                <p className="exp-desc">{exp.description}</p>

                <div className="exp-achievements">
                  <h4>Pencapaian Utama</h4>
                  <ul>
                    {exp.achievements.map((a, ai) => (
                      <li key={ai} className="exp-achievement">
                        <CheckCircle2 size={14} style={{ color: exp.color }} />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="exp-tech">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="tech-chip"
                      style={{ borderColor: `${exp.color}44` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="timeline-card-accent"
                  style={{ background: `linear-gradient(90deg, ${exp.color}44, transparent)` }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

