import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2400;
    const steps = 100;
    const stepDuration = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += 1.2 + Math.random() * 2.5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background particles */}
          <div className="loading-bg">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="loading-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Logo / Brand with photo */}
          <motion.div
            className="loading-brand"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="loading-logo">
              <img
                src={personalInfo.photo}
                alt={personalInfo.name}
                className="loading-avatar-img"
              />
              <div className="loading-logo-ring" />
              <div className="loading-logo-ring loading-logo-ring--2" />
            </div>
            <motion.p
              className="loading-name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Muhammad Raihan
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="loading-progress-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="loading-progress-bar">
              <motion.div
                className="loading-progress-fill"
                style={{ width: `${progress}%` }}
              />
              <div className="loading-progress-glow" style={{ left: `${progress}%` }} />
            </div>
            <div className="loading-progress-info">
              <span className="loading-label">Menyiapkan Semesta Digital...</span>
              <span className="loading-percent">{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
