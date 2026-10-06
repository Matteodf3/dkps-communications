import { useRef, useState } from 'react'
import { useParams } from 'react-router'
import { equipment, sectors } from './equipment-data'
import type { Copy, Equipment, EquipmentCategory } from './equipment-data'
import { radioComparison } from './radio-comparison-data'
import { Link, useLocale } from './i18n'
import { ContactCta, PageIntro, TextLink } from './layout'

const categories: { id: EquipmentCategory; title: Copy; intro: Copy }[] = [
  { id: 'radios', title: { en: 'Radios', it: 'Radio' }, intro: { en: 'Handheld, smart and vehicle-mounted units for different roles.', it: 'Portatili, smart e veicolari per ruoli diversi.' } },
  { id: 'bodycams', title: { en: 'Body cameras', it: 'Bodycam' }, intro: { en: 'Video devices for operations that need a visual record or field context.', it: 'Dispositivi video per interventi che richiedono registrazione o contesto visivo.' } },
  { id: 'accessories', title: { en: 'Accessories', it: 'Accessori' }, intro: { en: 'Audio and control components matched to the selected devices.', it: 'Componenti audio e comandi da abbinare ai dispositivi scelti.' } },
]

const additionalAccessories: Copy[] = [
  { en: 'Discreet earpieces and acoustic tubes', it: 'Auricolari discreti e tubi acustici' },
  { en: 'Headsets for noisy environments', it: 'Cuffie per ambienti rumorosi' },
  { en: 'Remote speaker microphones', it: 'Microfoni altoparlanti remoti' },
  { en: 'Vehicle PTT buttons and hands-free audio', it: 'Pulsanti PTT veicolari e audio vivavoce' },
  { en: 'Vehicle mounts and power connections', it: 'Supporti veicolari e alimentazione' },
  { en: 'Chargers, batteries and carrying systems', it: 'Caricabatterie, batterie e sistemi di trasporto' },
  { en: 'Bodycam mounts and harnesses', it: 'Supporti e imbragature per bodycam' },
]

const sectorComponents: Record<string, Copy[]> = {
  logistics: [
    { en: 'Vehicle radio and dashboard installation', it: 'Radio veicolare e installazione a bordo' },
    { en: 'Remote PTT and hands-free audio options', it: 'Comandi PTT remoti e opzioni vivavoce' },
    { en: 'Driver, depot and dispatch groups', it: 'Gruppi per autisti, depositi e centrale operativa' },
  ],
  warehousing: [
    { en: 'Portable radios for indoor and outdoor teams', it: 'Radio portatili per squadre interne ed esterne' },
    { en: 'Headsets and remote microphones for hands-on work', it: 'Cuffie e microfoni remoti per il lavoro manuale' },
    { en: 'Groups for loading, yard and supervision', it: 'Gruppi per carico, piazzale e supervisione' },
  ],
  security: [
    { en: 'Discreet audio and emergency workflows', it: 'Audio discreto e procedure di emergenza' },
    { en: 'Optional body-worn video, subject to project requirements', it: 'Video indossabile opzionale secondo i requisiti del progetto' },
    { en: 'Patrol, supervisor and control-room groups', it: 'Gruppi per pattuglie, responsabili e sala controllo' },
  ],
  mountain: [
    { en: 'Vehicle-mounted PoC units for snowcats and piste vehicles', it: 'Unità PoC veicolari per gatti delle nevi e mezzi pista' },
    { en: 'Handheld radios for lifts and response teams', it: 'Radio portatili per impianti e squadre di intervento' },
    { en: 'Body-worn video and helmet audio to evaluate for rescue work', it: 'Bodycam e audio per casco da valutare per il soccorso' },
  ],
}

function ProductCard({ product, index, onCompare }: { product: Equipment; index: number; onCompare?: (product: Equipment) => void }) {
  const { locale } = useLocale()
  const copy = (value: Copy) => value[locale]
  return <article className={`catalog-product catalog-product--${product.id}`}>
    <div className="catalog-product-image"><span>{String(index + 1).padStart(2, '0')} / {product.article ?? product.maker}</span>{product.image && <img src={product.image} alt={`${product.article ?? product.maker} — ${product.model}`} loading="lazy" />}</div>
    <div className="catalog-product-copy"><div><p>{product.article ?? product.maker}</p><h3>{product.model}</h3><span>{copy(product.role)}</span></div><p>{copy(product.description)}</p>{product.highlights && <ul className="catalog-product-highlights">{product.highlights.map(item => <li key={item.en}>{copy(item)}</li>)}</ul>}<div className="catalog-product-links"><Link to={`/contact?context=${encodeURIComponent(product.article ? `${product.article} — ${product.model}` : `${product.maker} ${product.model}`)}`}>{locale === 'it' ? 'Parla con DKPS' : 'Talk to DKPS'} ↗</Link>{onCompare && <button type="button" onClick={() => onCompare(product)} aria-label={`${locale === 'it' ? 'Confronta' : 'Compare'} ${product.article} — ${product.model}`}>{locale === 'it' ? 'Confronta' : 'Compare'} ↗</button>}{product.source && <a href={product.source} target="_blank" rel="noopener noreferrer">{locale === 'it' ? 'Scheda del produttore' : 'Manufacturer page'} ↗</a>}</div></div>
  </article>
}

const featuredRadioIds = ['dkps-radhh-010', 'dkps-radhh-014', 'dkps-radhh-011', 'dkps-radhh-006']

function FeaturedRadios({ products }: { products: Equipment[] }) {
  const { locale } = useLocale()
  const featured = featuredRadioIds.map(id => products.find(product => product.id === id)).filter((product): product is Equipment => Boolean(product))
  const [selectedId, setSelectedId] = useState(featuredRadioIds[0])
  const selected = featured.find(product => product.id === selectedId) ?? featured[0]

  if (!selected) return null

  return <div className="featured-radios" aria-label={locale === 'it' ? 'Radio in primo piano' : 'Featured radios'}>
    <div className="featured-radios-main">
      <div className="featured-radios-visual">
        <span className="featured-radios-overline">DKPS / {locale === 'it' ? 'RADIO IN EVIDENZA' : 'FEATURED RADIO'}</span>
        {selected.image && <img key={selected.id} src={selected.image} alt={`${selected.article} — ${selected.model}`} />}
        <span className="featured-radios-photo-note">{selected.article}</span>
      </div>
      <div className="featured-radios-detail" aria-live="polite">
        <p className="featured-radios-index">{String(featured.findIndex(product => product.id === selected.id) + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</p>
        <p className="featured-radios-article">{selected.article}</p>
        <h3>{selected.model}</h3>
        <p className="featured-radios-description">{selected.description[locale]}</p>
        <div className="featured-radios-specs"><span>{locale === 'it' ? 'DATI PRINCIPALI' : 'KEY DETAILS'}</span><ul>{selected.highlights?.slice(0, 3).map(item => <li key={item.en}>{item[locale]}</li>)}</ul></div>
        <p className="featured-radios-role"><span>{locale === 'it' ? 'INDICATA PER' : 'SUITED TO'}</span>{selected.role[locale]}</p>
        <Link className="featured-radios-cta" to={`/contact?context=${encodeURIComponent(`${selected.article} — ${selected.model}`)}`}>{locale === 'it' ? 'Parla con DKPS per la configurazione' : 'Talk to DKPS about configuration'} <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
    <div className="featured-radios-selector" role="group" aria-label={locale === 'it' ? 'Seleziona una radio' : 'Select a radio'}>
      {featured.map((product, index) => <button key={product.id} type="button" className={product.id === selected.id ? 'is-active' : ''} aria-pressed={product.id === selected.id} onClick={() => setSelectedId(product.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{product.model}</strong><small>{product.article}</small></button>)}
    </div>
  </div>
}

function CompareRadios({ products, selection, onSelectionChange }: { products: Equipment[]; selection: [string, string]; onSelectionChange: (selection: [string, string]) => void }) {
  const { locale } = useLocale()
  const [leftId, rightId] = selection
  const left = products.find(product => product.id === leftId) ?? products[0]
  const right = products.find(product => product.id === rightId) ?? products[1]

  if (!left || !right) return null

  const selectRadio = (side: 'left' | 'right', id: string) => {
    if (side === 'left') {
      onSelectionChange([id, id === rightId ? leftId : rightId])
    } else {
      onSelectionChange([id === leftId ? rightId : leftId, id])
    }
  }
  const compared = [left, right]
  const fields = [
    { key: 'network', label: { en: 'Network', it: 'Rete' } },
    { key: 'battery', label: { en: 'Battery', it: 'Batteria' } },
    { key: 'protection', label: { en: 'Protection', it: 'Protezione' } },
    { key: 'display', label: { en: 'Display', it: 'Schermo' } },
    { key: 'controls', label: { en: 'Controls', it: 'Comandi' } },
    { key: 'wireless', label: { en: 'Other connections', it: 'Altre connessioni' } },
  ] as const
  const valueFor = (product: Equipment, field: typeof fields[number]['key']) => {
    const value = radioComparison[product.id]?.[field]
    if (value === 'confirm') return <span className="radio-compare-unconfirmed">{locale === 'it' ? 'Da confermare' : 'To confirm'}</span>
    if (!value) return <span className="radio-compare-unstated">{locale === 'it' ? 'Non indicato' : 'Not stated'}</span>
    return value[locale]
  }

  return <section className="radio-compare" aria-labelledby="radio-compare-title">
    <div className="radio-compare-heading"><div><span>{locale === 'it' ? 'STRUMENTO DI SCELTA' : 'SELECTION TOOL'}</span><h3 id="radio-compare-title">{locale === 'it' ? 'Confronta due radio.' : 'Compare two radios.'}</h3></div><p>{locale === 'it' ? 'Scegli due modelli dell’elenco DKPS. Il confronto mostra solo i dati riportati nei flyer.' : 'Choose two models from the DKPS list. The comparison shows only data stated in the flyers.'}</p></div>
    <div className="radio-compare-picks">
      {compared.map((product, index) => <div className="radio-compare-pick" key={index}>
        <label htmlFor={`radio-compare-${index}`}>RADIO {index + 1}</label>
        <select id={`radio-compare-${index}`} value={product.id} onChange={event => selectRadio(index === 0 ? 'left' : 'right', event.target.value)}>{products.map(option => <option key={option.id} value={option.id}>{option.article} — {option.model}</option>)}</select>
        <div className="radio-compare-identity"><div>{product.image && <img src={product.image} alt={product.model} loading="lazy" />}</div><p><strong>{product.model}</strong><span>{product.article}</span></p></div>
      </div>)}
    </div>
    <table className="radio-compare-table"><thead><tr><th scope="col"><span className="radio-compare-desktop-label">{locale === 'it' ? 'CARATTERISTICA' : 'SPECIFICATION'}</span><span className="radio-compare-mobile-label">{locale === 'it' ? 'DATO' : 'DATA'}</span></th>{compared.map(product => <th scope="col" key={product.id}><span className="radio-compare-desktop-label">{product.article}</span><span className="radio-compare-mobile-label">{product.article?.replace('DKPS-', '')}</span></th>)}</tr></thead><tbody>{fields.map(field => <tr key={field.key}><th scope="row">{field.label[locale]}</th>{compared.map(product => <td key={product.id}>{valueFor(product, field.key)}</td>)}</tr>)}</tbody></table>
    {(radioComparison[left.id]?.note || radioComparison[right.id]?.note) && <div className="radio-compare-notes">{compared.map(product => radioComparison[product.id]?.note && <p key={product.id}><strong>{product.article}</strong> — {radioComparison[product.id].note?.[locale]}</p>)}</div>}
    <div className="radio-compare-end"><p>{locale === 'it' ? '“Non indicato” significa che la fonte non riporta il dato. “Da confermare” segnala una discordanza nella fonte.' : '“Not stated” means the source does not provide the value. “To confirm” marks a conflict in the source.'}</p><Link to={`/contact?context=${encodeURIComponent(`${left.article} / ${right.article}`)}`}>{locale === 'it' ? 'Parliamo della scelta' : 'Discuss the choice'} <span aria-hidden="true">↗</span></Link></div>
  </section>
}

function Category({ category, products, featured = false }: { category: typeof categories[number]; products: Equipment[]; featured?: boolean }) {
  const { locale } = useLocale()
  const [compareOpen, setCompareOpen] = useState(false)
  const [compareSelection, setCompareSelection] = useState<[string, string]>(['dkps-radhh-010', 'dkps-radhh-014'])
  const compareRef = useRef<HTMLDivElement>(null)
  const openComparison = (product: Equipment) => {
    const alternative = compareSelection[1] === product.id ? compareSelection[0] : compareSelection[1]
    setCompareSelection([product.id, alternative])
    setCompareOpen(true)
    requestAnimationFrame(() => {
      compareRef.current?.scrollIntoView({ block: 'start' })
      compareRef.current?.querySelector('select')?.focus({ preventScroll: true })
    })
  }
  return <section className="catalog-category" id={category.id} aria-labelledby={`${category.id}-title`}>
    <div className="catalog-category-heading"><div><span>0{categories.indexOf(category) + 1} / {locale === 'it' ? 'DISPOSITIVI' : 'EQUIPMENT'}</span><h2 id={`${category.id}-title`}>{featured ? (locale === 'it' ? 'Radio in evidenza' : 'Featured radios') : category.title[locale]}</h2></div><p>{featured ? (locale === 'it' ? 'Una selezione di dispositivi per esigenze operative diverse.' : 'A selection of devices for different operational needs.') : category.intro[locale]}</p></div>
    {featured && <FeaturedRadios products={products} />}
    {featured && <p className="catalog-full-label">{locale === 'it' ? 'CATALOGO COMPLETO' : 'FULL CATALOGUE'} <span>{String(products.length).padStart(2, '0')} {locale === 'it' ? 'MODELLI' : 'MODELS'}</span></p>}
    <div className="catalog-product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} onCompare={featured ? openComparison : undefined} />)}</div>
    {featured && <div className="radio-compare-disclosure" ref={compareRef}>
      <button type="button" className="radio-compare-toggle" aria-expanded={compareOpen} aria-controls="radio-compare-content" onClick={() => setCompareOpen(open => !open)}><span><small>{locale === 'it' ? 'STRUMENTO DI SCELTA' : 'SELECTION TOOL'}</small><strong>{compareOpen ? (locale === 'it' ? 'Nascondi il confronto' : 'Hide comparison') : (locale === 'it' ? 'Non sai quale scegliere? Confronta due modelli.' : 'Not sure which to choose? Compare two models.')}</strong></span><b aria-hidden="true">{compareOpen ? '−' : '↗'}</b></button>
      <div id="radio-compare-content" hidden={!compareOpen}>{compareOpen && <CompareRadios products={products} selection={compareSelection} onSelectionChange={setCompareSelection} />}</div>
    </div>}
    {category.id === 'accessories' && <div className="catalog-accessory-list"><h3>{locale === 'it' ? 'Altre componenti da configurare' : 'Further components to configure'}</h3><ul>{additionalAccessories.map(item => <li key={item.en}>{item[locale]}</li>)}</ul></div>}
  </section>
}

export function DevicesPage() {
  const { locale } = useLocale()
  return <>
    <PageIntro index="03" eyebrow={locale === 'it' ? 'Prodotti e dispositivi' : 'Products & equipment'} title={locale === 'it' ? 'Soluzioni per la tua operatività.' : 'Solutions for your operation.'} lead={locale === 'it' ? 'Parti dal lavoro da collegare. DKPS definisce dispositivi, connettività, piattaforma PTT, gruppi e permessi attorno alla tua organizzazione.' : 'Start with the work you need to connect. DKPS defines devices, connectivity, the PTT platform, groups and permissions around your organisation.'}><TextLink to="/contact">{locale === 'it' ? 'Parlaci della tua operatività' : 'Tell us about your operation'}</TextLink></PageIntro>
    <section className="operation-kits section site-wrap" aria-label={locale === 'it' ? 'Ambiti operativi' : 'Operational sectors'}>
      <div className="section-heading"><span>01 / {locale === 'it' ? 'AMBITI' : 'OPERATIONS'}</span><h2>{locale === 'it' ? 'Scegli l’ambito. Esplora i dispositivi.' : 'Choose the operation. Explore the equipment.'}</h2><p>{locale === 'it' ? 'Ogni pagina mostra radio, video e accessori da valutare per quell’ambiente. Non sono pacchetti fissi.' : 'Each page shows radios, video and accessories to consider for that environment. These are not fixed bundles.'}</p></div>
      <div className="operation-kit-grid">{sectors.map((sector, index) => <article className="operation-kit" key={sector.slug}><div className={`operation-kit-image operation-kit-image--${sector.slug}`}><img src={sector.image} alt="" loading="lazy" /><span>{locale === 'it' ? 'AMBITO' : 'OPERATION'} / 0{index + 1}</span></div><div className="operation-kit-body"><h3>{sector.title[locale]}</h3><p>{sector.summary[locale]}</p><Link className="operation-kit-link" to={`/devices/${sector.slug}`}>{locale === 'it' ? 'Esplora i prodotti' : 'Explore equipment'} <span aria-hidden="true">↗</span></Link></div></article>)}</div>
    </section>
    <section className="equipment-gallery" aria-label={locale === 'it' ? 'Catalogo dispositivi' : 'Equipment selection'}><div className="site-wrap"><div className="equipment-gallery-top"><div><p className="eyebrow">02 / {locale === 'it' ? 'DISPOSITIVI' : 'EQUIPMENT'}</p><h2>{locale === 'it' ? 'Un dispositivo per ogni tipo di operatività.' : 'A device for every kind of operation.'}</h2></div><p>{locale === 'it' ? 'Dai terminali semplici per gli operatori ai dispositivi smart e veicolari per supervisione e coordinamento. DKPS configura hardware, connettività e piattaforma attorno al lavoro.' : 'From simple operator radios to smart and vehicle devices for supervision and coordination. DKPS configures hardware, connectivity and platform around the work.'}</p></div><nav className="catalog-jump" aria-label={locale === 'it' ? 'Categorie dispositivi' : 'Equipment categories'}>{categories.map((category, index) => <a key={category.id} href={`#${category.id}`}><span>0{index + 1}</span>{category.title[locale]} <b aria-hidden="true">↗</b></a>)}</nav>{categories.map(category => <Category key={category.id} category={category} products={equipment.filter(product => product.category === category.id)} featured={category.id === 'radios'} />)}<p className="catalog-disclaimer">{locale === 'it' ? 'Le foto delle radio provengono dai flyer DKPS forniti. Alcune schede originali contengono dati discordanti: le caratteristiche in conflitto richiedono conferma. Le bodycam e gli accessori mostrati non sono compresi nell’elenco stock ricevuto; DKPS ne verifica disponibilità e compatibilità con le radio scelte.' : 'Radio photos come from the supplied DKPS flyers. Some original sheets contain conflicting data; affected specifications require confirmation. The body cameras and accessories shown were not included in the supplied stock list; DKPS checks their availability and compatibility with the chosen radios.'}</p></div></section>
    <ContactCta title={locale === 'it' ? 'Partiamo dalla tua operatività. Definiamo insieme il sistema.' : 'Start with your operation. Define the system together.'} />
  </>
}

export function SectorEquipmentPage() {
  const { slug } = useParams()
  const { locale } = useLocale()
  const sector = sectors.find(item => item.slug === slug)
  if (!sector) return <section className="section site-wrap"><h1>{locale === 'it' ? 'Ambito non trovato.' : 'Operation not found.'}</h1><TextLink to="/devices">{locale === 'it' ? 'Torna ai prodotti' : 'Back to products'}</TextLink></section>
  const selected = sector.products.map(id => equipment.find(product => product.id === id)).filter((product): product is Equipment => Boolean(product))
  return <>
    <section className="sector-hero"><div className="sector-hero-image"><img src={sector.image} alt="" /></div><div className="site-wrap sector-hero-content"><Link to="/devices">← {locale === 'it' ? 'Tutti i prodotti' : 'All products'}</Link><span>DKPS / {locale === 'it' ? 'AMBITI OPERATIVI' : 'OPERATIONAL SECTORS'}</span><h1>{sector.title[locale]}</h1><p>{sector.summary[locale]}</p></div></section>
    <section className="sector-overview section site-wrap"><div><span className="eyebrow">01 / {locale === 'it' ? 'CONFIGURAZIONE' : 'CONFIGURATION'}</span><h2>{locale === 'it' ? 'Un sistema attorno al lavoro.' : 'A system built around the work.'}</h2></div><div><p>{locale === 'it' ? 'I dispositivi sono il punto di accesso. Connettività, piattaforma PTT, gruppi, permessi e centrale operativa completano la configurazione.' : 'Devices are the access point. Connectivity, the PTT platform, groups, permissions and dispatch complete the configuration.'}</p><ul>{sectorComponents[sector.slug].map(item => <li key={item.en}>{item[locale]}</li>)}</ul></div></section>
    <section className="equipment-gallery sector-equipment"><div className="site-wrap"><div className="equipment-gallery-top"><div><p className="eyebrow">02 / {locale === 'it' ? 'SELEZIONE DISPOSITIVI' : 'EQUIPMENT SELECTION'}</p><h2>{locale === 'it' ? 'Apparati da valutare.' : 'Equipment to consider.'}</h2></div><p>{locale === 'it' ? 'Radio selezionate dall’elenco DKPS per questo ambito. Le bodycam e gli accessori sono opzioni da verificare per disponibilità e compatibilità con la configurazione finale.' : 'Radios selected from the DKPS list for this operation. Body cameras and accessories are options whose availability and compatibility need checking against the final configuration.'}</p></div>{categories.map(category => { const products = selected.filter(product => product.category === category.id); return products.length ? <Category key={category.id} category={category} products={products} /> : null })}<div className="sector-more"><p>{locale === 'it' ? 'Cerchi un altro modello o un accessorio specifico? La selezione finale dipende dai tuoi veicoli, ambienti e flussi di comunicazione.' : 'Need another model or a specific accessory? The final selection depends on your vehicles, environments and communication workflows.'}</p><TextLink to={`/contact?context=${encodeURIComponent(sector.title[locale])}`} light>{locale === 'it' ? 'Parlaci della tua operatività' : 'Tell us about your operation'}</TextLink></div></div></section>
  </>
}
