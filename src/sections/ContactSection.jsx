import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, InstagramIcon } from '../components/SocialIcons';
import { personalInfo } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#3b82f6',
  },
  {
    icon: Phone,
    label: 'WhatsApp / Phone',
    value: personalInfo.phone,
    href: `https://wa.me/${personalInfo.phoneRaw}`,
    color: '#10b981',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: personalInfo.location,
    href: null,
    color: '#8b5cf6',
  },
];

const socialLinks = [
  { icon: GithubIcon, href: personalInfo.github, label: 'GitHub', color: '#fff' },
  { icon: InstagramIcon, href: personalInfo.instagram, label: 'Instagram', color: '#e1306c' },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) errs.email = 'Alamat email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Format email tidak valid';
    if (!formData.message.trim()) errs.message = 'Pesan wajib diisi';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSending(true);
    // Simulate sending (replace with actual email service like EmailJS or Formspree)
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

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
            06. Kontak
          </motion.span>
          <motion.h2 className="section-title" variants={fadeUp}>
            Mari Berkolaborasi
          </motion.h2>
          <motion.div className="section-divider" variants={fadeUp} />
          <motion.p className="section-desc" variants={fadeUp}>
            Punya ide proyek, kebutuhan sistem digital, atau peluang kemitraan dengan PT Reyy Digital Group? Pintu komunikasi saya selalu terbuka.
          </motion.p>
        </motion.div>

        {/* Content */}
        <div className="contact-grid">
          {/* Left — info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="contact-info-title">Hubungi Saya</h3>
            <p className="contact-info-desc">
              Saya selalu terbuka untuk peluang kolaborasi baru, pengembangan aplikasi web skala modern, konsultasi teknologi, maupun kemitraan bisnis bersama PT Reyy Digital Group.
            </p>

            {/* Contact details */}
            <div className="contact-details">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <motion.div
                  key={label}
                  className="contact-detail glass"
                  whileHover={{ x: 8, borderColor: `${color}55` }}
                >
                  <div
                    className="contact-detail-icon"
                    style={{ background: `${color}18`, border: `1px solid ${color}44` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="contact-detail-label">{label}</p>
                    {href ? (
                      <a href={href} className="contact-detail-value" style={{ color }}>
                        {value}
                      </a>
                    ) : (
                      <p className="contact-detail-value">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div className="contact-social">
              <p>Temukan saya di:</p>
              <div className="contact-social-links">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-social-btn glass"
                    aria-label={label}
                    style={{ '--social-color': color }}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form className="contact-form glass" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Alamat Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@anda.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subjek / Topik</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Konsultasi proyek, kerjasama digital..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Isi Pesan *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ceritakan kebutuhan proyek atau ide Anda secara singkat..."
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                className={`btn btn--primary btn--full ${sent ? 'btn--success' : ''}`}
                disabled={sending || sent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {sent ? (
                  <>
                    <CheckCircle size={18} /> Pesan Berhasil Terkirim!
                  </>
                ) : sending ? (
                  <>
                    <span className="btn-spinner" /> Sedang Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Kirim Pesan
                  </>
                )}
                <span className="btn-glow" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
