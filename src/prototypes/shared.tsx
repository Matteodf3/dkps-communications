export const contact = 'mailto:info@dkpscommunications.com?subject=Communication%20system%20enquiry'

export function PrototypeHeader() {
  return <header className="prototype-header">
    <div className="prototype-header-inner">
      <a href="/" aria-label="DKPS Communications homepage"><img src="/brand/dkps-logo-on-dark.svg" alt="DKPS Communications" width="243" height="84" /></a>
      <nav aria-label="Preview navigation"><a href="/#system">The system</a><a href={contact}>Contact DKPS <span aria-hidden="true">↗</span></a></nav>
    </div>
  </header>
}

export function ContactLink({ light = false }: { light?: boolean }) {
  return <a className={`prototype-cta${light ? ' prototype-cta--light' : ''}`} href={contact}>Discuss your operation <span aria-hidden="true">↗</span></a>
}

export function Motorola({ className = '' }: { className?: string }) {
  return <div className={`cutout-motorola ${className}`}><img src="/images/motorola-tlk110.png" alt="Motorola TLK 110 professional Push-to-Talk radio, manufacturer example" width="4000" height="4000" /></div>
}

export function Hytera({ className = '' }: { className?: string }) {
  return <div className={`cutout-hytera ${className}`}><img src="/images/hytera-pnc360s.webp" alt="Hytera PNC360S Push-to-Talk over Cellular radio, manufacturer example" width="2184" height="1228" /></div>
}
