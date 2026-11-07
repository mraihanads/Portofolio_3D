import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '../components/SocialIcons';
import { personalInfo } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const contactCards = [
  {
    icon: Phone,
    label: 'WhatsApp / Telepon',
    title: 'Chat Langsung via WhatsApp',
    value: personalInfo.phone,
    description: 'Respon cepat untuk konsultasi proyek web, kerja sama digital, atau kebutuhan sistem.',
    actionLabel: 'Chat WhatsApp',
    href: `https://wa.me/${personalInfo.phoneRaw}`,
    color: '#10b981',
    badge: 'Respon Cepat',
  },
  {
    icon: Mail,
    label: 'Email Resmi',
    title: 'Kirim Email Resmi',
    value: personalInfo.email,
    description: 'Terbuka untuk diskusi formal, penawaran proyek korporat, dan kemitraan PT Reyy Digital Group.',
    actionLabel: 'Kirim Email',
    href: `mailto:${personalInfo.email}`,
    color: '#3b82f6',
    badge: 'Resmi',
  },
  {
    icon: MapPin,
    label: 'Domisili & Lokasi',
    title: 'Lokasi & Ketersediaan',
    value: personalInfo.location,
    description: 'Berbasis di Aceh Timur, Indonesia. Siap melayani kerja sama jarak jauh (Remote) maupun onsite.',
    actionLabel: 'Buka Peta',
    href: 'https://maps.google.com/?q=Idi+Rayeuk,+Aceh+Timur',
    color: '#8b5cf6',
    badge: 'Remote & Onsite',
  },
];

const socialProfiles = [
  {
    name: 'GitHub',
    handle: '@mraihanads',
    url: personalInfo.github,
    icon: GithubIcon,
    color: '#ffffff',
    desc: 'Repositori kode & open-source',
  },
  {
    name: 'Instagram',
    handle: '@mraihan__01',
    url: personalInfo.instagram,
    icon: InstagramIcon,
    color: '#e1306c',
    desc: 'Aktivitas & dokumentasi visual',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section contact-section">
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
            05. Kontak
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Mari Berkolaborasi
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Punya ide proyek, kebutuhan sistem digital, atau peluang kemitraan dengan PT Reyy Digital Group? Silakan hubungi saya langsung melalui saluran resmi di bawah ini.
          </motion.p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          className="contact-hub-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                className="contact-hub-card glass"
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ '--hub-color': card.color }}
              >
                <div className="hub-card-header">
                  <div
                    className="hub-card-icon"
                    style={{
                      background: `${card.color}18`,
                      border: `1px solid ${card.color}44`,
                      color: card.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    className="hub-card-badge"
                    style={{ color: card.color, borderColor: `${card.color}33` }}
                  >
                    {card.badge}
                  </span>
                </div>

                <div className="hub-card-body">
                  <p className="hub-card-label">{card.label}</p>
                  <h3 className="hub-card-title">{card.title}</h3>
                  <p className="hub-card-value">{card.value}</p>
                  <p className="hub-card-desc">{card.description}</p>
                </div>

                <div className="hub-card-footer">
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hub-card-btn"
                    style={{
                      background: `${card.color}18`,
                      borderColor: `${card.color}44`,
                      color: card.color,
                    }}
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Social Connect Banner */}
        <motion.div
          className="contact-social-banner glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="social-banner-left">
            <span className="social-banner-badge">
              <Sparkles size={14} /> Terhubung di Media Sosial
            </span>
            <h3 className="social-banner-title">Ikuti Perkembangan & Portofolio Terbaru</h3>
            <p className="social-banner-desc">
              Pantau proyek-proyek terbaru, repositori kode sumber, dan aktivitas digital saya.
            </p>
          </div>

          <div className="social-banner-cards">
            {socialProfiles.map((soc) => {
              const SocIcon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-banner-card glass"
                  style={{ '--soc-color': soc.color }}
                >
                  <div className="soc-card-icon">
                    <SocIcon size={22} />
                  </div>
                  <div className="soc-card-info">
                    <span className="soc-card-name">{soc.name}</span>
                    <span className="soc-card-handle">{soc.handle}</span>
                  </div>
                  <ArrowRight size={16} className="soc-card-arrow" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
