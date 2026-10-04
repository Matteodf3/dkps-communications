import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, Localize, useLocale } from './i18n'
import { industries, platformFeatures, systemLayers } from './content'
import { ContactCta, Eyebrow, PageIntro, RadioImage, SectionHeading, TextLink } from './layout'

function SystemFlow() {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return <Localize><section ref={ref} className={`home-system${inView ? ' home-system--in-view' : ''}`} aria-labelledby="home-system-title">
    <div className="site-wrap home-system-grid">
      <div className="home-system-intro">
        <Eyebrow>01 / System</Eyebrow>
        <h2 id="home-system-title">The radio is one part of the answer.</h2>
        <p>A working Push-to-Talk system needs equipment, connectivity, a platform and a way to coordinate communication. DKPS considers them together.</p>
        <TextLink to="/system">Explore the architecture</TextLink>
      </div>
      <div className="flow-list" aria-label="Radio to dispatch communication path">
        {systemLayers.map((layer, index) => <Link to={layer.path} className="flow-step" key={layer.number} style={{ '--step': index } as CSSProperties}>
          <span className="flow-step-number">{layer.number}</span>
          <div><h3>{layer.name}</h3><p>{layer.summary}</p></div>
          <span className="flow-step-arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </div>
  </section></Localize>
}

export function HomePage() {
  return <Localize>
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-photo">
        <picture>
          <source media="(max-width: 800px)" srcSet="/images/dkps-operational-hero-mobile.png" />
          <img src="/images/dkps-operational-hero.png" alt="Illustrative scene of two field operators communicating by radio across mountain and logistics operations" width="1672" height="941" fetchPriority="high" />
        </picture>
        <span className="home-photo-label">Operational context / illustrative photograph</span>
        <div className="home-hero-copy">
          <Eyebrow>DKPS Communications / Professional Push-to-Talk</Eyebrow>
          <h1 id="home-title">Every team, site and vehicle. One communication system.</h1>
          <p>DKPS brings professional radios, cellular connectivity, a PTT platform and dispatch into one communication system for teams, sites and vehicles.</p>
          <div className="hero-actions"><TextLink to="/system" light>Explore the system</TextLink><TextLink to="/contact" light>Tell us about your operation</TextLink></div>
        </div>
      </div>
      <div className="home-hero-chain" aria-label="Radio, connectivity, PTT platform and dispatch">
        <span>Radio</span><span>Connectivity</span><span>PTT platform</span><span>Dispatch</span>
      </div>
    </section>

    <SystemFlow />

    <section className="home-control" aria-labelledby="home-control-title"><div className="site-wrap home-control-grid"><div><Eyebrow>Communication control</Eyebrow><h2 id="home-control-title">Give every team the right conversations.</h2><p>Organise the system around departments, locations and responsibilities. Field teams can speak within their groups, supervisors can coordinate across them, and dispatch can reach the operation from one point.</p><TextLink to="/system" light>How the structure works</TextLink></div><div className="control-schematic" aria-label="Example communication structure"><div className="schematic-head">Control room <span>↔</span> Supervisors</div><div className="schematic-line" aria-hidden="true" /><div className="schematic-teams"><span>Team A</span><span>Vehicles</span><span>Site B</span></div><small>Illustrative structure · configured to match each organisation</small></div></div></section>

    <section className="section site-wrap">
      <SectionHeading index="02 / Applications" title="Built for work that does not stand still." text="Communication requirements change with people, facilities and geography. The system can be planned for the operating pattern, not just the device count." />
      <div className="application-grid">{industries.slice(0, 4).map((industry, index) => <Link key={industry.slug} to={`/industries#${industry.slug}`} className="application-item"><span>0{index + 1}</span><h3>{industry.name}</h3><p>{industry.context}</p><b aria-hidden="true">↗</b></Link>)}</div>
      <div className="section-end"><TextLink to="/industries">View all industries</TextLink><TextLink to="/solutions">Explore operational solutions</TextLink></div>
    </section>

    <section className="home-integrator"><div className="site-wrap integrator-grid"><div><Eyebrow>Why DKPS</Eyebrow><h2>One partner across the complete system.</h2></div><div><p>DKPS brings device selection, platform configuration, connectivity planning and support into a coherent deployment. The goal is a communication structure that reflects how an organisation actually operates.</p><TextLink to="/about">How DKPS works</TextLink></div></div></section>
    <ContactCta />
  </Localize>
}

export function SystemPage() {
  return <Localize>
    <PageIntro index="01" eyebrow="Architecture" title="One communication system. Four connected parts." lead="From the device in a team member’s hand to the dispatcher coordinating the operation, each part has a clear job. DKPS designs how they work together." ><TextLink to="/contact">Discuss your requirements</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Composition" title="Follow the path of a message." text="The system begins with a person pressing Push-to-Talk. Connectivity carries the message to the platform, which routes it to the right people and dispatch point." /><div className="system-path">{systemLayers.map(layer => <Link key={layer.number} to={layer.path} className="system-path-step"><span>{layer.number}</span><h3>{layer.name}</h3><p>{layer.detail}</p><b aria-hidden="true">↗</b></Link>)}</div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Structure" title="Build communication around the organisation." text="Communication groups and permissions can follow the real operating structure: who works together, who supervises, and who needs to reach across teams." /><div className="role-diagram"><div className="role-diagram-top"><strong>Control room</strong><span>Dispatch and coordination</span></div><div className="role-diagram-branch"><div><strong>Supervisor</strong><span>Cross-team communication</span></div><div><strong>Department</strong><span>Local group management</span></div></div><div className="role-diagram-base"><span>Field team</span><span>Vehicles</span><span>Site team</span><span>Maintenance</span></div></div><p className="caption">Example only. Groups, roles and permissions are designed around each customer’s workflow.</p></section>
    <section className="section section--line site-wrap"><SectionHeading index="03 / Delivery" title="From requirements to a working system." /><div className="process-list"><div><span>01</span><h3>Understand the operation</h3><p>Map teams, locations, vehicles, communication paths and points of escalation.</p></div><div><span>02</span><h3>Design the configuration</h3><p>Choose appropriate devices, connectivity, platform functions and group structure.</p></div><div><span>03</span><h3>Deploy and support</h3><p>Configure the system, onboard users and provide a point of contact for the complete setup.</p></div></div></section>
    <ContactCta title="Make the communication map fit your operation." />
  </Localize>
}

export function PlatformPage() {
  return <Localize>
    <PageIntro index="02" eyebrow="Platform & dispatch" title="Control communication without adding complexity." lead="The PTT platform routes voice between users and groups. Dispatch gives authorised operators a place to coordinate people across the operation." ><TextLink to="/system">See the complete architecture</TextLink></PageIntro>
    <section className="section site-wrap" id="dispatch"><SectionHeading index="01 / Dispatch" title="A clear line between the field and the control room." text="A dispatcher console can bring communication groups, location information and operational response into one supervised workflow." /><div className="dispatch-layout"><div className="dispatch-image"><img src="/images/warehouse-real-36696522.jpeg" alt="Warehouse personnel and a vehicle in an operating aisle" width="1920" height="1279" loading="lazy" /></div><div className="dispatch-copy"><h3>Speak to the right people at the right moment.</h3><p>Set up teams and priority paths around roles rather than relying on one open channel for everyone. Supervisors and dispatchers can reach individuals or groups as the situation requires.</p><ul><li>Communication groups</li><li>Users and roles</li><li>Dispatcher access</li><li>Visibility and escalation workflows</li></ul></div></div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Capabilities" title="The functions available to build from." text="The final set of platform capabilities depends on the selected platform, devices and configuration." /><div className="feature-groups">{['Communication', 'Coordination', 'Safety & records'].map(group => <div className="feature-group" key={group}><h3>{group}</h3>{platformFeatures.filter(feature => feature.group === group).map(feature => <div key={feature.name}><h4>{feature.name}</h4><p>{feature.text}</p></div>)}</div>)}</div></section>
    <section className="section section--line site-wrap"><SectionHeading index="03 / Administration" title="Manage the system as the organisation changes." /><div className="statement-grid"><div><h3>Groups & permissions</h3><p>Define who can communicate within a team and who can reach across departments or sites.</p></div><div><h3>Users & devices</h3><p>Keep the communication structure aligned as people join, move roles or need different equipment.</p></div><div><h3>Integration scope</h3><p>Discuss connections to existing workflows and systems during solution design, based on actual requirements.</p></div></div></section>
    <ContactCta title="Put platform capabilities to work in a real operation." />
  </Localize>
}

const radioExamples = [
  {
    model: 'motorola' as const,
    maker: 'Motorola Solutions',
    name: 'TLK 110',
    description: 'Dedicated broadband Push-to-Talk radio for mobile teams.',
    features: ['4G LTE and Wi-Fi', 'IP67 protection', 'Integrated GPS positioning', 'Dedicated emergency button'],
    ideal: 'Field teams, logistics and site operations that need a dedicated voice device.',
    source: 'https://www.motorolasolutions.com/en_xu/products/broadband-push-to-talk/wave-ptx/tlk110-radio/tlk110.html',
  },
  {
    model: 'hytera' as const,
    maker: 'Hytera',
    name: 'PNC360S',
    description: 'Compact Push-to-Talk over Cellular radio for everyday operations.',
    features: ['Cellular PoC communication', '3 W speaker', 'IP67 protection', '4000 mAh battery'],
    ideal: 'Hospitality, facilities and security teams that need a compact radio.',
    source: 'https://www.hytera.com/en/product-new/lte-broadband/poc-radio/pnc360s.html',
  },
]

function EquipmentExhibit({ example, index }: { example: typeof radioExamples[number]; index: number }) {
  const { locale } = useLocale()
  return <Localize><article className={`equipment-exhibit equipment-exhibit--${example.model}`}>
    <div className="equipment-exhibit-visual">
      <span className="equipment-exhibit-label">{locale === 'it' ? 'DISPOSITIVO SUL CAMPO' : 'FIELD EQUIPMENT'} / 0{index + 1}</span>
      <RadioImage model={example.model} />
      <span className="equipment-exhibit-measure" aria-hidden="true">{locale === 'it' ? 'PUSH TO TALK / CELLULARE' : 'PUSH TO TALK / CELLULAR'}</span>
    </div>
    <div className="equipment-exhibit-spec">
      <div className="equipment-exhibit-title"><span>{example.maker}</span><h3>{example.name}</h3></div>
      <p>{example.description}</p>
      <ul>{example.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <p className="equipment-ideal"><strong>Ideal for</strong> {example.ideal}</p>
      <Link to={`/contact?context=${encodeURIComponent(example.name)}`}>Talk to DKPS about configuration <span aria-hidden="true">↗</span></Link>
      <a className="equipment-source" href={example.source} target="_blank" rel="noopener noreferrer">Manufacturer specifications ↗</a>
    </div>
  </article></Localize>
}

const operationKits = [
  {
    id: 'driver-kit',
    name: 'Driver Kit',
    description: 'Keep drivers in touch with dispatch while their attention stays on the road.',
    image: '/images/dispatch-operation.png',
    alt: 'Illustrative fleet dispatch operation with vehicles outside a control point',
    parts: ['Vehicle radio', 'Steering-wheel PTT control', 'Hands-free audio'],
  },
  {
    id: 'warehouse-yard-kit',
    name: 'Warehouse & Yard Kit',
    description: 'Give warehouse and loading teams a direct voice path across indoor and outdoor work.',
    image: '/images/warehouse-real-30824313.jpeg',
    alt: 'Warehouse aisle with a forklift and operating staff',
    parts: ['Rugged radio', 'Work headset', 'Warehouse and yard groups'],
  },
  {
    id: 'security-kit',
    name: 'Security Kit',
    description: 'Connect patrols, supervisors and the control room with discreet communication and escalation.',
    image: '/images/brief-security.jpeg',
    alt: 'Illustrative security control room operation',
    parts: ['Radio and discreet earpiece', 'SOS button', 'Optional bodycam, where compatible'],
  },
  {
    id: 'mountain-operations-kit',
    name: 'Mountain Operations Kit',
    description: 'Bring piste vehicles and lift staff into a shared communication structure.',
    image: '/images/dkps-operational-hero.png',
    alt: 'Illustrative mountain operation with two people communicating by radio',
    parts: ['Vehicle radios for snowcats and piste vehicles', 'Handheld radios for lift staff', 'Groups for vehicles, lifts and coordination'],
  },
] as const

function OperationKit({ kit, index }: { kit: typeof operationKits[number]; index: number }) {
  const { locale, t } = useLocale()
  return <Localize><article className="operation-kit" id={kit.id}>
    <div className={`operation-kit-image operation-kit-image--${kit.id}`}>
      <img src={kit.image} alt={kit.alt} loading="lazy" />
      <span>{locale === 'it' ? 'APPLICAZIONE' : 'APPLICATION'} / 0{index + 1}</span>
    </div>
    <div className="operation-kit-body">
      <h3>{kit.name}</h3>
      <p>{kit.description}</p>
      <details className="operation-kit-details">
        <summary>View solution <span aria-hidden="true">↗</span></summary>
        <div className="operation-kit-expanded">
          <p>Typical configuration to discuss with DKPS:</p>
          <ul>{kit.parts.map(part => <li key={part}>{part}</li>)}</ul>
          <Link to={`/contact?context=${encodeURIComponent(t(kit.name))}`}>Talk to DKPS about this kit <span aria-hidden="true">↗</span></Link>
        </div>
      </details>
    </div>
  </article></Localize>
}

export function DevicesPage() {
  return <Localize>
    <PageIntro index="03" eyebrow="Products & equipment" title="Solutions for your operation." lead="Choose the work you need to connect. DKPS defines the hardware, cellular connectivity, PTT software, groups and communication permissions around it." ><TextLink to="/contact">Tell us about your operation</TextLink></PageIntro>
    <section className="operation-kits section site-wrap" aria-label="Solutions for your operation">
      <SectionHeading index="01 / Operational kits" title="Start with the job. Build the system around it." text="These are starting configurations, not fixed bundles. Devices and accessories are selected for the environment, network and roles in your organisation." />
      <div className="operation-kit-grid">{operationKits.map((kit, index) => <OperationKit key={kit.id} kit={kit} index={index} />)}</div>
      <p className="operation-kit-note">Images illustrate operating contexts, not DKPS customer deployments.</p>
    </section>
    <section className="equipment-gallery" aria-label="Equipment examples"><div className="site-wrap equipment-gallery-inner"><div className="equipment-gallery-top"><div><Eyebrow>02 / Equipment</Eyebrow><h2>Equipment selected for the system.</h2></div><p>Professional radios and compatible accessories sit beneath the solution. Models, availability and platform compatibility are confirmed for each project.</p></div><div className="equipment-exhibits">{radioExamples.map((example, index) => <EquipmentExhibit key={example.name} example={example} index={index} />)}</div><div className="equipment-accessories"><span>Accessory categories</span><ul><li>Headsets &amp; earpieces</li><li>Vehicle PTT controls</li><li>Hands-free audio</li><li>Optional bodycams</li></ul></div><div className="equipment-gallery-end"><p>DKPS connects the selected equipment to connectivity, the PTT platform, user groups and dispatch.</p><TextLink to="/contact" light>Discuss your configuration</TextLink></div></div></section>
    <ContactCta title="Start with your operation. We will define the system." />
  </Localize>
}

export function ConnectivityPage() {
  return <Localize>
    <PageIntro index="04" eyebrow="Cellular connectivity" title="Plan the connection around where people work." lead="Push-to-Talk over Cellular depends on suitable network access. DKPS includes SIM and connectivity planning in the wider communication design, including operations across locations and borders." ><TextLink to="/contact">Discuss locations and routes</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Connectivity" title="A network layer that supports the operation." /><div className="statement-grid"><div><h3>Cellular data</h3><p>PoC communication uses commercial mobile networks to connect compatible devices with the platform.</p></div><div><h3>Managed SIMs</h3><p>Connectivity and device provisioning can be considered together rather than left to each individual team.</p></div><div><h3>International planning</h3><p>When work crosses borders, the required countries, networks and commercial terms should be checked before deployment.</p></div></div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Design questions" title="Coverage is a project question." text="Actual service depends on the networks available in the places where your people work. A useful design starts with a map of the operation, not a blanket coverage promise." /><div className="criteria-list"><div><h3>Where</h3><p>Sites, buildings, routes, outdoor areas and countries.</p></div><div><h3>Who</h3><p>Which teams must communicate locally, across facilities or internationally?</p></div><div><h3>How</h3><p>Which devices, networks and fallback methods fit each environment?</p></div><div><h3>Support</h3><p>Who manages SIMs, provisioning and changes as the operation evolves?</p></div></div></section>
    <ContactCta title="Tell us where communication needs to work." />
  </Localize>
}
