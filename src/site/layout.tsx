import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Link, Localize, NavLink, useLocale } from './i18n'
import descriptions from './seo-descriptions.json'

const primary = [
  ['Solutions', '/solutions'],
  ['Products', '/devices'],
  ['Industries', '/industries'],
  ['About', '/about'],
] as const

const titles: Record<string, string> = {
  '/': 'Professional communication systems',
  '/system': 'The communication system',
  '/platform': 'PTT platform & dispatch',
  '/devices': 'Products & equipment',
  '/devices/logistics': 'Logistics & transport equipment',
  '/devices/warehousing': 'Warehouses & yards equipment',
  '/devices/security': 'Security operations equipment',
  '/devices/mountain': 'Mountain operations equipment',
  '/connectivity': 'Cellular connectivity',
  '/industries': 'Industries',
  '/solutions': 'Operational solutions',
  '/plans': 'Plans & project scope',
  '/about': 'About DKPS',
  '/contact': 'Tell us about your operation',
  '/privacy': 'Privacy information',
}

function usePageNavigation() {
  const location = useLocation()
  const { locale, t } = useLocale()
  useEffect(() => {
    const pagePath = location.pathname.replace(/\/$/, '') || '/'
    document.title = `${t(titles[pagePath] ?? 'Page not found')} | DKPS Communications`
    const pageDescription = descriptions[pagePath as keyof typeof descriptions]?.[locale] ?? descriptions['/'][locale]
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDescription)
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash, locale])
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { locale, setLocale } = useLocale()
  const toggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  useEffect(() => setMenuOpen(false), [location.pathname])

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      toggle.current?.focus()
    }
  }

  return <Localize><header className="site-header" onKeyDown={onKeyDown}>
    <div className="header-inner site-wrap">
      <Link className="brand" to="/" aria-label="DKPS Communications — home" onClick={() => setMenuOpen(false)}>
        <img src="/brand/dkps-logo-on-dark.svg" alt="DKPS Communications" width="243" height="84" />
      </Link>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
      <nav id="primary-navigation" className={menuOpen ? 'primary-nav primary-nav--open' : 'primary-nav'} aria-label="Primary navigation">
        {primary.map(([label, path]) => <NavLink key={path} to={path} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>{label}</NavLink>)}
        <div className="language-switch" role="group" aria-label="Language">
          <button type="button" lang="en" aria-pressed={locale === 'en'} onClick={() => { setLocale('en'); setMenuOpen(false) }}>EN</button>
          <span aria-hidden="true">/</span>
          <button type="button" lang="it" aria-pressed={locale === 'it'} onClick={() => { setLocale('it'); setMenuOpen(false) }}>IT</button>
        </div>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'nav-contact nav-contact--active' : 'nav-contact'}>Tell us about your operation <span aria-hidden="true">↗</span></NavLink>
        <a className="client-access" href="https://dkpsconnect.com" target="_blank" rel="noopener noreferrer" aria-label={locale === 'it' ? 'DKPS Connect, area clienti (si apre in una nuova scheda)' : 'DKPS Connect, client area (opens in a new tab)'}>DKPS Connect <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header></Localize>
}

function Footer() {
  return <Localize><footer className="site-footer">
    <div className="site-wrap footer-main">
      <div className="footer-brand">
        <Link to="/" aria-label="DKPS Communications — home"><img src="/brand/dkps-logo-on-dark.svg" alt="DKPS Communications" width="243" height="84" /></Link>
        <p>Professional Push-to-Talk communication systems designed around the operation.</p>
        <a className="footer-email" href="mailto:info@dkpscommunications.com">info@dkpscommunications.com</a>
        <p className="footer-company">Dukapis &amp; Co. s.r.l.s.<br />VAT / P.IVA 13205921003<br />Operational presence: Rome, Italy</p>
      </div>
      <div className="footer-column"><h2>Explore</h2><Link to="/solutions">Solutions</Link><Link to="/devices">Products</Link><Link to="/industries">Industries</Link><Link to="/about">About DKPS</Link></div>
      <div className="footer-column"><h2>Contact</h2><Link to="/contact">Tell us about your operation</Link><Link to="/privacy">Privacy information</Link><div className="footer-client-access"><span>For existing clients</span><a href="https://dkpsconnect.com" target="_blank" rel="noopener noreferrer">DKPS Connect ↗</a></div></div>
    </div>
    <div className="site-wrap footer-bottom"><span>© 2026 Dukapis &amp; Co. s.r.l.s. · DKPS Communications</span><span>Communications designed for the way organisations work.</span></div>
  </footer></Localize>
}

export function SiteLayout() {
  usePageNavigation()
  return <>
    <Localize><a className="skip-link" href="#main-content">Skip to content</a></Localize>
    <Header />
    <main id="main-content"><Outlet /></main>
    <Footer />
  </>
}

export function Eyebrow({ children }: { children: ReactNode }) { const { t } = useLocale(); return <p className="eyebrow">{typeof children === 'string' ? t(children) : children}</p> }

export function TextLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) {
  const { t } = useLocale()
  return <Link className={light ? 'text-link text-link--light' : 'text-link'} to={to}>{typeof children === 'string' ? t(children) : children} <span aria-hidden="true">↗</span></Link>
}

export function ContactCta({ title = 'Let’s design the right communication system.', text = 'Tell us how your teams, sites and vehicles work. We can discuss a system around the operation.' }: { title?: string; text?: string }) {
  const { t } = useLocale()
  return <section className="contact-band"><div className="site-wrap contact-band-inner"><div><Eyebrow>Next step</Eyebrow><h2>{t(title)}</h2><p>{t(text)}</p></div><TextLink to="/contact" light>Tell us about your operation</TextLink></div></section>
}

export function PageIntro({ index, eyebrow, title, lead, children }: { index: string; eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  const { t } = useLocale()
  return <section className="page-intro"><div className="site-wrap page-intro-grid"><div><p className="page-index">DKPS / {index}</p><Eyebrow>{eyebrow}</Eyebrow><h1>{t(title)}</h1></div><div className="page-intro-side"><p>{t(lead)}</p>{children}</div></div></section>
}

export function SectionHeading({ index, title, text }: { index: string; title: string; text?: string }) {
  const { t } = useLocale()
  return <div className="section-heading"><span>{t(index)}</span><h2>{t(title)}</h2>{text && <p>{t(text)}</p>}</div>
}

export function RadioImage({ model, className = '', eager = false }: { model: 'motorola' | 'hytera'; className?: string; eager?: boolean }) {
  const motorola = model === 'motorola'
  const { t } = useLocale()
  return <span className={`radio-cutout radio-cutout--${model} ${className}`}><img src={motorola ? '/images/motorola-tlk110.png' : '/images/hytera-pnc360s.webp'} alt={t(motorola ? 'Motorola TLK 110 Push-to-Talk radio, manufacturer example' : 'Hytera PNC360S PoC radio, manufacturer example')} width={motorola ? 4000 : 2184} height={motorola ? 4000 : 1228} loading={eager ? 'eager' : 'lazy'} /></span>
}
