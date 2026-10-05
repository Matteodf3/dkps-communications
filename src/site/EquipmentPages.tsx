import { useParams } from 'react-router'
import { equipment, sectors } from './equipment-data'
import type { Copy, Equipment, EquipmentCategory } from './equipment-data'
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
    { en: 'Driver, depot and dispatch groups', it: 'Gruppi per autisti, depositi e dispatch' },
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

function ProductCard({ product, index }: { product: Equipment; index: number }) {
  const { locale } = useLocale()
  const copy = (value: Copy) => value[locale]
  return <article className={`catalog-product catalog-product--${product.id}`}>
    <div className="catalog-product-image"><span>0{index + 1} / {product.maker}</span><img src={product.image} alt={`${product.maker} ${product.model}`} loading="lazy" /></div>
    <div className="catalog-product-copy"><div><p>{product.maker}</p><h3>{product.model}</h3><span>{copy(product.role)}</span></div><p>{copy(product.description)}</p><div className="catalog-product-links"><Link to={`/contact?context=${encodeURIComponent(`${product.maker} ${product.model}`)}`}>{locale === 'it' ? 'Parla con DKPS' : 'Talk to DKPS'} ↗</Link><a href={product.source} target="_blank" rel="noopener noreferrer">{locale === 'it' ? 'Scheda del produttore' : 'Manufacturer page'} ↗</a></div></div>
  </article>
}

function Category({ category, products }: { category: typeof categories[number]; products: Equipment[] }) {
  const { locale } = useLocale()
  return <section className="catalog-category" id={category.id} aria-labelledby={`${category.id}-title`}>
    <div className="catalog-category-heading"><div><span>0{categories.indexOf(category) + 1} / {locale === 'it' ? 'DISPOSITIVI' : 'EQUIPMENT'}</span><h2 id={`${category.id}-title`}>{category.title[locale]}</h2></div><p>{category.intro[locale]}</p></div>
    <div className="catalog-product-grid">{products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
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
    <section className="equipment-gallery" aria-label={locale === 'it' ? 'Catalogo dispositivi' : 'Equipment selection'}><div className="site-wrap"><div className="equipment-gallery-top"><div><p className="eyebrow">02 / {locale === 'it' ? 'DISPOSITIVI' : 'EQUIPMENT'}</p><h2>{locale === 'it' ? 'Dispositivi scelti per il sistema.' : 'Equipment selected for the system.'}</h2></div><p>{locale === 'it' ? 'Una selezione di modelli reali dei produttori. DKPS conferma disponibilità, piattaforma e compatibilità durante la progettazione.' : 'A selection of real manufacturer models. DKPS confirms availability, platform and compatibility during project design.'}</p></div><nav className="catalog-jump" aria-label={locale === 'it' ? 'Categorie dispositivi' : 'Equipment categories'}>{categories.map((category, index) => <a key={category.id} href={`#${category.id}`}><span>0{index + 1}</span>{category.title[locale]} <b aria-hidden="true">↗</b></a>)}</nav>{categories.map(category => <Category key={category.id} category={category} products={equipment.filter(product => product.category === category.id)} />)}<p className="catalog-disclaimer">{locale === 'it' ? 'Le immagini e le schede provengono dai produttori. Questa è una selezione esplorativa, non un elenco di modelli già confermati come disponibili da DKPS.' : 'Images and product information come from manufacturers. This is an exploratory selection, not a list of models confirmed as available from DKPS.'}</p></div></section>
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
    <section className="sector-overview section site-wrap"><div><span className="eyebrow">01 / {locale === 'it' ? 'CONFIGURAZIONE' : 'CONFIGURATION'}</span><h2>{locale === 'it' ? 'Un sistema attorno al lavoro.' : 'A system built around the work.'}</h2></div><div><p>{locale === 'it' ? 'I dispositivi sono il punto di accesso. Connettività, piattaforma PTT, gruppi, permessi e dispatch completano la configurazione.' : 'Devices are the access point. Connectivity, the PTT platform, groups, permissions and dispatch complete the configuration.'}</p><ul>{sectorComponents[sector.slug].map(item => <li key={item.en}>{item[locale]}</li>)}</ul></div></section>
    <section className="equipment-gallery sector-equipment"><div className="site-wrap"><div className="equipment-gallery-top"><div><p className="eyebrow">02 / {locale === 'it' ? 'SELEZIONE DISPOSITIVI' : 'EQUIPMENT SELECTION'}</p><h2>{locale === 'it' ? 'Apparati da valutare.' : 'Equipment to consider.'}</h2></div><p>{locale === 'it' ? 'Radio, bodycam e accessori reali scelti come esempi per questo ambito. DKPS verifica disponibilità e compatibilità prima di definire il progetto.' : 'Real radios, bodycams and accessories selected as examples for this sector. DKPS checks availability and compatibility before defining the project.'}</p></div>{categories.map(category => { const products = selected.filter(product => product.category === category.id); return products.length ? <Category key={category.id} category={category} products={products} /> : null })}<div className="sector-more"><p>{locale === 'it' ? 'Cerchi un altro modello o un accessorio specifico? La selezione finale dipende dai tuoi veicoli, ambienti e flussi di comunicazione.' : 'Need another model or a specific accessory? The final selection depends on your vehicles, environments and communication workflows.'}</p><TextLink to={`/contact?context=${encodeURIComponent(sector.title[locale])}`} light>{locale === 'it' ? 'Parlaci della tua operatività' : 'Tell us about your operation'}</TextLink></div></div></section>
  </>
}
