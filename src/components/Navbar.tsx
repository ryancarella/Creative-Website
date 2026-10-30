import { motion } from 'framer-motion'
export default function Navbar() {
return <motion.nav className="nav shell" aria-label="Main navigation" initial={{opacity:0}} animate={{opacity:1}}><a className="brand" href="#home"><span className="kitchen-mark">CK</span>Carella's Kitchen.</a><div className="nav-links"><a href="#menu">The menu</a><a href="#pricing" aria-current={window.location.hash === '#pricing' ? 'page' : undefined}>Prices</a><a href="#build">Build your bowl</a><a href="#visit">Find the truck</a></div><a className="nav-shop" href="#pricing">Menu & prices</a></motion.nav>
}
