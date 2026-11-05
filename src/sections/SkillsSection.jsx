import { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Box, Server, Wrench } from 'lucide-react';
import { skillsData } from '../data';

const iconMap = { Monitor, Box, Server, Wrench };

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function SkillBar({ name, level, color, delay = 0 }) {
  return (
    <motion.div
      className="skill-bar"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={delay}
    >
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 + delay * 0.08, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const active = skillsData.categories[activeCategory];

  return (
    <section id="skills" className="section skills-section">
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
            02. Keahlian & Teknologi
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Keahlian & Teknologi
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Teknologi dan perangkat lunak yang saya gunakan untuk mewujudkan solusi digital berkinerja tinggi.
          </motion.p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="skills-tabs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {skillsData.categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Monitor;
            return (
              <motion.button
                key={cat.name}
                className={`skills-tab glass ${activeCategory === i ? 'skills-tab--active' : ''}`}
                style={{ '--tab-color': cat.color }}
                onClick={() => setActiveCategory(i)}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Icon size={20} style={{ color: cat.color }} />
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="skills-content"
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="skills-bars">
            {active.skills.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={active.color}
                delay={i}
              />
            ))}
          </div>

          {/* Category highlight */}
          <motion.div
            className="skills-highlight glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="skills-highlight-icon"
              style={{ background: `${active.color}22`, border: `1px solid ${active.color}44` }}
            >
              {(() => {
                const Icon = iconMap[active.icon] || Monitor;
                return <Icon size={36} style={{ color: active.color }} />;
              })()}
            </div>
            <h3 className="skills-highlight-name">{active.name}</h3>
            <p className="skills-highlight-count">
              {active.skills.length} Teknologi
            </p>
            <div className="skills-highlight-avg">
              <span>Tingkat Kemahiran</span>
              <strong style={{ color: active.color }}>
                {Math.round(active.skills.reduce((a, s) => a + s.level, 0) / active.skills.length)}%
              </strong>
            </div>
          </motion.div>
        </motion.div>

        {/* All tech icons — decorative */}
        <motion.div
          className="skills-icons-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {skillsData.categories.flatMap((c) => c.skills).slice(0, 12).map((skill, i) => (
            <motion.div
              key={skill.name + i}
              className="skills-icon-chip glass"
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.05 }}
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

