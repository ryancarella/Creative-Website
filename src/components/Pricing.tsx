import { useRef, useState } from 'react'
import { publicMenu, formatPrice } from '../data/publicMenu'

const categories = ['All options', 'Bowls', 'Pasta', 'Snacks + shakes'] as const
type Category = typeof categories[number]
const productCategory: Record<string, Category> = {
  chicken: 'Bowls', beef: 'Bowls', pasta: 'Pasta', bar: 'Snacks + shakes', shake: 'Snacks + shakes',
}
const productNumber: Record<string, string> = { chicken: '01', beef: '02', pasta: '03', bar: '04', shake: '05' }

export default function Pricing() {
  const [category, setCategory] = useState<Category>('All options')
  const [selected, setSelected] = useState<string[]>([])
  const comparison = useRef<HTMLElement>(null)
  const visible = publicMenu.filter(p => category === 'All options' || productCategory[p.id] === category)
  const compared = publicMenu.filter(p => selected.includes(p.id))
  const toggle = (id: string) => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : current.length < 3 ? [...current, id] : current)

  return <main id="pricing" className="pricing-page">
    <section className="pricing-hero shell" aria-labelledby="pricing-headline">
      <div>
        <a className="pricing-back" href="#home">← Back to the kitchen</a>
        <p className="eyebrow"><span /> The planned menu · Fairfield area</p>
        <h1 id="pricing-headline">Your kind of meal.<br /><span>A clear price.</span></h1>
        <p className="intro">Bowls for your routine. Pasta for a change. Snacks and shakes for the spaces in between.</p>
        <div className="pricing-hero-actions"><a className="button" href="#build">Explore your bowl idea ↗</a><button type="button" className="pricing-outline" onClick={() => document.getElementById('public-menu')?.scrollIntoView({ behavior: 'smooth' })}>See all five options ↓</button></div>
        <p className="small-note">Planned standard-item prices in USD, per item.<br />Not yet accepting orders. Launch details are still to come.</p>
      </div>
      <figure className="pricing-image"><img src={`${import.meta.env.BASE_URL}meal-bowl.jpg`} alt="Vegetables and grains illustrating the food concept, not a finished menu item" /><figcaption><span>THE CHICKEN & RICE IDEA</span><strong>{formatPrice(publicMenu.find(p => p.id === 'chicken')!.price)} <small>/ item</small></strong><span>Inspiration image · not an actual menu item</span></figcaption></figure>
    </section>

    <section id="public-menu" className="shell pricing-menu" aria-labelledby="menu-prices-heading">
      <div className="pricing-heading"><div><p className="eyebrow">Find what fits your day</p><h2 id="menu-prices-heading">Five options. Room for you.</h2></div><p>One-time, per-item prices.<br />No bundles or add-on prices are offered here.</p></div>
      <div className="pricing-toolbar"><div className="tabs" role="group" aria-label="Pricing menu categories">{categories.map(c => <button type="button" key={c} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div><button type="button" className="comparison-jump" onClick={() => comparison.current?.scrollIntoView({ behavior: 'smooth' })}>View comparison <span>{selected.length}/3</span> ↓</button></div>
      <p className="pricing-filter-status" aria-live="polite">Showing {visible.length} of 5 options. Choose up to three to compare.</p>
      <div className="pricing-grid">{visible.map(product => <article className={`pricing-card ${selected.includes(product.id) ? 'is-selected' : ''}`} key={product.id}>
        <div className="pricing-card-top"><span>{productCategory[product.id]}</span><span>{productNumber[product.id]}</span></div>
        <h3>{product.name}</h3><p className="pricing-description">{product.description}</p>
        <div className="public-price"><strong>{formatPrice(product.price)}</strong><span>USD / item</span></div>
        <div className="pricing-card-divider" />
        <details><summary>Planned details <span aria-hidden="true">+</span></summary><p>{product.features}</p><p className="pricing-addons">{product.addons}</p></details>
        <button type="button" className="compare-button" aria-label={`Compare ${product.name}`} aria-pressed={selected.includes(product.id)} disabled={selected.length === 3 && !selected.includes(product.id)} onClick={() => toggle(product.id)}><span aria-hidden="true">{selected.includes(product.id) ? '✓' : '+'}</span>{selected.includes(product.id) ? 'Selected for comparison' : 'Add to comparison'}</button>
      </article>)}</div>
      <div className="pricing-verification-note"><span aria-hidden="true">↗</span><p><strong>A menu in the making.</strong> These are planned products at the selected standard-item prices. Recipes, portions, ingredients, nutrition, and dietary details still need verification. Extra protein is being considered; no add-on price is confirmed. The portion planner does not quote a custom meal price.</p></div>
    </section>

    <section ref={comparison} className="shell pricing-comparison" aria-labelledby="comparison-heading"><div className="pricing-heading"><div><p className="eyebrow">Side by side</p><h2 id="comparison-heading">A little easier to choose.</h2></div>{selected.length > 0 && <button type="button" className="clear-comparison" onClick={() => setSelected([])}>Clear comparison ×</button>}</div>
      {compared.length === 0 ? <div className="comparison-empty"><span aria-hidden="true">↔</span><h3>What’s on your shortlist?</h3><p>Select up to three products above to compare their prices and planned features.</p></div> : <div className="comparison-scroll"><div className="comparison-columns" style={{ gridTemplateColumns: `repeat(${compared.length}, minmax(230px, 1fr))` }}>{compared.map(product => <article key={product.id}><span className="eyebrow">{productCategory[product.id]}</span><h3>{product.name}</h3><p className="comparison-price">{formatPrice(product.price)} <small>USD / item</small></p><div><strong>Product idea</strong><p>{product.description}</p></div><div><strong>Planned features</strong><p>{product.features}</p></div><div><strong>Add-ons</strong><p>{product.addons}</p></div><button type="button" className="clear-comparison" onClick={() => toggle(product.id)} aria-label={`Remove ${product.name} from comparison`}>Remove from comparison ×</button></article>)}</div></div>}
      <p className="comparison-announcement" role="status">{compared.length ? `${compared.length} ${compared.length === 1 ? 'option' : 'options'} selected. This comparison is not an order.` : 'No options selected.'}</p>
    </section>

    <section className="shell pricing-next"><div><p className="eyebrow">Make it your kind of day</p><h2>Start with an idea.<br />We’ll share the next steps.</h2><p>Explore a bowl combination, or check the latest launch information. Ordering is not open yet.</p></div><div><a className="button" href="#build">Try the portion planner ↗</a><a className="text-link" href="#visit">See launch information</a></div></section>
    <footer className="shell"><span>Carella's Kitchen · Simple meals. Personal goals.</span><a href="#home">Back to the kitchen ↑</a><span>Student venture concept · Not yet accepting orders</span></footer>
  </main>
}
