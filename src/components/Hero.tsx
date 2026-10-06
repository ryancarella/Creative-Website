import { motion } from 'framer-motion'

const benefits = [
  ['01', 'Easy layering.', 'Throw it over your everyday outfit before heading to class, the library, or your next coffee stop.'],
  ['02', 'Black goes with your day.', 'A simple black design that fits alongside the clothes you already reach for.'],
  ['03', 'Zip it your way.', 'Wear it open as a layer or zip it closed. One familiar style, a little flexibility.'],
]

export default function Hero() {
  return (
    <main id="home">
      <section className="hero shell" aria-labelledby="headline">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="eyebrow"><span /> A little Google. A lot of everyday.</p>
          <h1 id="headline">Your Everyday Layer.<br /><span>A Little More Google.</span></h1>
          <p className="intro">A simple black zip-up hoodie for campus days, coffee runs, and everything in between.</p>
          <div className="hero-actions"><motion.a className="button" href="#shop" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>Shop the Hoodie</motion.a><a className="text-link" href="#details">Get to know your layer</a></div>
          <p className="small-note">Black. Zip-up. Ready for your everyday rotation.</p>
        </motion.div>
        <motion.figure className="product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <div className="product-top"><span>THE EVERYDAY EDIT</span><span className="swatch-label"><i /> Black</span></div>
          <div className="hoodie-image"><img src={`${import.meta.env.BASE_URL}google-hoodie.png`} alt="Black Google Cloud zip-up hoodie with a hood and small chest logo" /></div>
          <figcaption><span>Google Cloud<br /><strong>Unisex Onyx Zip Hoodie</strong></span><span className="product-number">01 / 01</span></figcaption>
          <div className="color-line" aria-hidden="true"><i /><i /><i /><i /></div>
        </motion.figure>
      </section>
      <section id="details" className="details shell" aria-label="Hoodie benefits">
        {benefits.map(([number, title, copy]) => <article key={number}><span className="number">{number}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section id="everyday" className="everyday shell">
        <p className="eyebrow">From your first class to your last stop.</p>
        <h2>One layer. Plenty of plans.</h2>
        <div className="day-grid"><article><span>ON CAMPUS</span><h3>Lecture. Library. Repeat.</h3><p>A familiar layer for study sessions and the walk between classes.</p></article><article><span>ON THE MOVE</span><h3>Coffee before the commute.</h3><p>Keep your outfit simple as you head out into a cooler morning.</p></article><article><span>OFF THE CLOCK</span><h3>A casual kind of workday.</h3><p>Pair it with your everyday staples and bring a little Google into your routine.</p></article></div>
      </section>
      <section id="shop" className="shop shell">
        <div><p className="eyebrow">Make it part of your rotation.</p><h2>Your next everyday layer.</h2><p>A simple way to wear your interest in Google.</p></div>
        <div className="shop-action"><button className="button" disabled aria-describedby="shop-note">Shop the Hoodie</button><p id="shop-note">Placeholder: product page URL needed.</p></div>
      </section>
      <footer className="shell"><span>Everyday / Google</span><span>Google Cloud Unisex Onyx Zip Hoodie</span></footer>
    </main>
  )
}
