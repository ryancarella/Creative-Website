import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <motion.nav className="nav shell" aria-label="Main navigation" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <a className="brand" href="#home"><span className="color-mark" aria-hidden="true"><i /><i /><i /><i /></span>Everyday / Google</a>
      <div className="nav-links"><a href="#details">The details</a><a href="#everyday">In your day</a></div>
      <a className="nav-shop" href="#shop">Shop the Hoodie</a>
    </motion.nav>
  )
}
