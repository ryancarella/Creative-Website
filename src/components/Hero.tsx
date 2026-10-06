import { motion } from 'framer-motion'
 
const ARROW_BG = '#4c1d95'
const avatars = [
  'linear-gradient(135deg, #f0abfc, #a855f7)',
  'linear-gradient(135deg, #fda4af, #e11d48)',
  'linear-gradient(135deg, #fcd34d, #f59e0b)',
]
 
export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <video style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} src={`${import.meta.env.BASE_URL}hero.mp4`} autoPlay muted loop playsInline />
      {/* Overlays — opacity reduced by 70% */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.13)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.17) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.25) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(165,180,252,0.05) 0%, transparent 68%)', pointerEvents: 'none' }} />
 
      {/* Centered content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        {/* Social-proof badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 12px 5px 7px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', marginBottom: '20px' }}
        >
          <div style={{ display: 'flex' }}>
            {avatars.map((bg, i) => (
              <span key={i} style={{ width: '17px', height: '17px', borderRadius: '999px', background: bg, border: '2px solid rgba(30,25,45,0.6)', marginLeft: i === 0 ? 0 : '-6px' }} />
            ))}
          </div>
          <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}>4,900+ people already on the waitlist</span>
        </motion.div>
 
        {/* Headline — heavy + thin contrast */}
        <motion.h1
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.22, ease: 'easeOut' }}
          style={{ margin: 0, color: '#fff', textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}
        >
          <span style={{ display: 'block', fontWeight: 800, fontSize: 'clamp(1.8rem, 4.95vw, 3.7rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
            Precision by Default.
          </span>
          <span style={{ display: 'block', fontWeight: 200, fontSize: 'clamp(1.95rem, 5.2vw, 3.9rem)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
            Clarity in Everything.
          </span>
        </motion.h1>
 
        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          style={{ margin: '18px 0 0', maxWidth: '400px', fontSize: '10.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 16px rgba(0,0,0,0.4)' }}
        >
          A minimal, precise toolkit for teams who sweat the small stuff. Design, build, and ship with confidence — every detail accounted for, nothing left to chance.
        </motion.p>
 
        {/* Email capture */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', width: 'min(350px, 94vw)', marginTop: '24px', padding: '5px 5px 5px 16px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: '0 16px 44px rgba(0,0,0,0.28)' }}
        >
          <input
            className="frost-input"
            type="email"
            placeholder="Enter your email"
            style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontSize: '10px', color: '#fff', fontFamily: "'Inter', sans-serif" }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 5px 5px 16px', borderRadius: '999px', background: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(0,0,0,0.25)' }}
          >
            <span style={{ fontSize: '9.5px', fontWeight: 600, color: '#14111f', whiteSpace: 'nowrap' }}>Join the Waitlist</span>
            <span style={{ width: '25px', height: '25px', borderRadius: '999px', background: ARROW_BG, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>
        </motion.form>
      </div>
 
      {/* Footer strip */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: '20px 48px 26px' }}
      >
        <div style={{ height: '1px', width: '100%', background: 'rgba(255,255,255,0.14)', marginBottom: '18px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', maxWidth: '1100px', margin: '0 auto', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, flex: 1, minWidth: '260px', textAlign: 'center', fontSize: '12.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.55)' }}>
            We believe great tools should feel invisible. Explore the ideas, details, and small decisions we've obsessed over to help your team do its best work.
          </p>
          <a href="#learn" style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', whiteSpace: 'nowrap' }}>Learn more →</a>
        </div>
      </motion.div>
    </section>
  )
}

