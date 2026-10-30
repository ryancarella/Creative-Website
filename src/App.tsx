import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pricing from './components/Pricing'
import './index.css'
 
function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const isPricing = hash === '#pricing'
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  useEffect(() => {
    document.title = isPricing ? "Menu & prices | Carella's Kitchen" : "Carella's Kitchen | Meals built around you"
    const frame = window.requestAnimationFrame(() => {
      if (isPricing || !hash || hash === '#home') window.scrollTo({ top: 0, behavior: 'instant' })
      else document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [hash, isPricing])
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div hidden={isPricing}><Hero /></div>
      <div hidden={!isPricing}><Pricing /></div>
    </div>
  )
}
 
export default App
