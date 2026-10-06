import { motion } from 'framer-motion'
 
const navLinks = [
  { label: 'How It Works', caret: false },
  { label: 'Features', caret: true },
  { label: 'Resources', caret: true },
  { label: 'Community', caret: false },
]
 
function Caret() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '5px' }}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
 
export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 40px' }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke="#fff" strokeWidth="1.1" opacity="0.4" />
          <path d="M12 3.5 V20.5 M4.6 7.75 L19.4 16.25 M4.6 16.25 L19.4 7.75" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: '18px', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>Frost</span>
      </div>
 
      {/* Centered links */}
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '34px' }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={`#${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ display: 'flex', alignItems: 'center', fontSize: '14.5px', fontWeight: 400, color: 'rgba(255,255,255,0.82)', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.82)' }}
          >
            {link.label}{link.caret && <Caret />}
          </a>
        ))}
      </div>
 
      {/* CTA */}
      <motion.a
        href="#waitlist"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          flexShrink: 0,
          padding: '12px 24px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          textDecoration: 'none',
          background: 'rgba(17,15,26,0.92)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          whiteSpace: 'nowrap',
        }}
      >
        Join the Waitlist
      </motion.a>
    </motion.nav>
  )
}
