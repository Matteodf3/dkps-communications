import { Link } from 'react-router'
import { industries, platformFeatures, systemLayers } from './content'
import { ContactCta, Eyebrow, PageIntro, RadioImage, SectionHeading, TextLink } from './layout'

export function HomePage() {
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero-photo"><img src="/images/warehouse-real-36696522.jpeg" alt="Workers coordinating material and forklifts inside a warehouse" width="1920" height="1279" fetchPriority="high" /></div>
      <div className="site-wrap home-hero-content">
        <div className="home-hero-copy">
          <Eyebrow>DKPS Communications / Professional Push-to-Talk</Eyebrow>
          <h1 id="home-title">Communication built around your operation.</h1>
          <p>DKPS brings professional radios, cellular connectivity, a PTT platform and dispatch into one communication system for teams, sites and vehicles.</p>
          <div className="hero-actions"><TextLink to="/system" light>Explore the system</TextLink><TextLink to="/contact" light>Talk to DKPS</TextLink></div>
        </div>
        <div className="home-hero-product"><RadioImage model="motorola" eager /><span>Professional radio / manufacturer example</span></div>
      </div>
    </section>

    <section className="section site-wrap">
      <SectionHeading index="01 / System" title="The radio is one part of the answer." text="A working Push-to-Talk system needs equipment, connectivity, a platform and a way to coordinate communication. DKPS considers them together." />
      <div className="layer-list">{systemLayers.map(layer => <Link to={layer.path} className="layer-row" key={layer.number}><span className="layer-number">{layer.number}</span><h3>{layer.name}</h3><p>{layer.summary}</p><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div>
    </section>

    <section className="home-control" aria-labelledby="home-control-title"><div className="site-wrap home-control-grid"><div><Eyebrow>Communication control</Eyebrow><h2 id="home-control-title">Give every team the right conversations.</h2><p>Organise the system around departments, locations and responsibilities. Field teams can speak within their groups, supervisors can coordinate across them, and dispatch can reach the operation from one point.</p><TextLink to="/system" light>How the structure works</TextLink></div><div className="control-schematic" aria-label="Example communication structure"><div className="schematic-head">Control room <span>↔</span> Supervisors</div><div className="schematic-line" aria-hidden="true" /><div className="schematic-teams"><span>Team A</span><span>Vehicles</span><span>Site B</span></div><small>Illustrative structure · configured to match each organisation</small></div></div></section>

    <section className="section site-wrap">
      <SectionHeading index="02 / Applications" title="Built for work that does not stand still." text="Communication requirements change with people, facilities and geography. The system can be planned for the operating pattern, not just the device count." />
      <div className="application-grid">{industries.slice(0, 4).map((industry, index) => <Link key={industry.slug} to={`/industries#${industry.slug}`} className="application-item"><span>0{index + 1}</span><h3>{industry.name}</h3><p>{industry.context}</p><b aria-hidden="true">↗</b></Link>)}</div>
      <div className="section-end"><TextLink to="/industries">View all industries</TextLink><TextLink to="/solutions">Explore operational solutions</TextLink></div>
    </section>

    <section className="home-integrator"><div className="site-wrap integrator-grid"><div><Eyebrow>Why DKPS</Eyebrow><h2>One partner across the complete system.</h2></div><div><p>DKPS brings device selection, platform configuration, connectivity planning and support into a coherent deployment. The goal is a communication structure that reflects how an organisation actually operates.</p><TextLink to="/about">How DKPS works</TextLink></div></div></section>
    <ContactCta />
  </>
}

export function SystemPage() {
  return <>
    <PageIntro index="01" eyebrow="Architecture" title="One communication system. Four connected parts." lead="From the device in a team member’s hand to the dispatcher coordinating the operation, each part has a clear job. DKPS designs how they work together." ><TextLink to="/contact">Discuss your requirements</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Composition" title="Follow the path of a message." text="The system begins with a person pressing Push-to-Talk. Connectivity carries the message to the platform, which routes it to the right people and dispatch point." /><div className="system-path">{systemLayers.map(layer => <Link key={layer.number} to={layer.path} className="system-path-step"><span>{layer.number}</span><h3>{layer.name}</h3><p>{layer.detail}</p><b aria-hidden="true">↗</b></Link>)}</div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Structure" title="Build communication around the organisation." text="Communication groups and permissions can follow the real operating structure: who works together, who supervises, and who needs to reach across teams." /><div className="role-diagram"><div className="role-diagram-top"><strong>Control room</strong><span>Dispatch and coordination</span></div><div className="role-diagram-branch"><div><strong>Supervisor</strong><span>Cross-team communication</span></div><div><strong>Department</strong><span>Local group management</span></div></div><div className="role-diagram-base"><span>Field team</span><span>Vehicles</span><span>Site team</span><span>Maintenance</span></div></div><p className="caption">Example only. Groups, roles and permissions are designed around each customer’s workflow.</p></section>
    <section className="section section--line site-wrap"><SectionHeading index="03 / Delivery" title="From requirements to a working system." /><div className="process-list"><div><span>01</span><h3>Understand the operation</h3><p>Map teams, locations, vehicles, communication paths and points of escalation.</p></div><div><span>02</span><h3>Design the configuration</h3><p>Choose appropriate devices, connectivity, platform functions and group structure.</p></div><div><span>03</span><h3>Deploy and support</h3><p>Configure the system, onboard users and provide a point of contact for the complete setup.</p></div></div></section>
    <ContactCta title="Make the communication map fit your operation." />
  </>
}

export function PlatformPage() {
  return <>
    <PageIntro index="02" eyebrow="Platform & dispatch" title="Control communication without adding complexity." lead="The PTT platform routes voice between users and groups. Dispatch gives authorised operators a place to coordinate people across the operation." ><TextLink to="/system">See the complete architecture</TextLink></PageIntro>
    <section className="section site-wrap" id="dispatch"><SectionHeading index="01 / Dispatch" title="A clear line between the field and the control room." text="A dispatcher console can bring communication groups, location information and operational response into one supervised workflow." /><div className="dispatch-layout"><div className="dispatch-image"><img src="/images/warehouse-real-30824313.jpeg" alt="Warehouse personnel and a vehicle in an operating aisle" width="1600" height="900" loading="lazy" /></div><div className="dispatch-copy"><h3>Speak to the right people at the right moment.</h3><p>Set up teams and priority paths around roles rather than relying on one open channel for everyone. Supervisors and dispatchers can reach individuals or groups as the situation requires.</p><ul><li>Communication groups</li><li>Users and roles</li><li>Dispatcher access</li><li>Visibility and escalation workflows</li></ul></div></div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Capabilities" title="The functions available to build from." text="The final set of platform capabilities depends on the selected platform, devices and configuration." /><div className="feature-groups">{['Communication', 'Coordination', 'Safety & records'].map(group => <div className="feature-group" key={group}><h3>{group}</h3>{platformFeatures.filter(feature => feature.group === group).map(feature => <div key={feature.name}><h4>{feature.name}</h4><p>{feature.text}</p></div>)}</div>)}</div></section>
    <section className="section section--line site-wrap"><SectionHeading index="03 / Administration" title="Manage the system as the organisation changes." /><div className="statement-grid"><div><h3>Groups & permissions</h3><p>Define who can communicate within a team and who can reach across departments or sites.</p></div><div><h3>Users & devices</h3><p>Keep the communication structure aligned as people join, move roles or need different equipment.</p></div><div><h3>Integration scope</h3><p>Discuss connections to existing workflows and systems during solution design, based on actual requirements.</p></div></div></section>
    <ContactCta title="Put platform capabilities to work in a real operation." />
  </>
}

export function DevicesPage() {
  return <>
    <PageIntro index="03" eyebrow="Radios & devices" title="Choose equipment for the people using it." lead="A radio should suit the environment, the role and the communication path. DKPS considers devices as part of the system design, not as a separate purchase." ><TextLink to="/system">Where devices fit in the system</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Equipment" title="Physical tools for different types of work." /><div className="device-types"><div><span>01</span><h3>Dedicated PoC radios</h3><p>Physical Push-to-Talk controls for teams that need a purpose-built communication device.</p></div><div><span>02</span><h3>Smartphones & tablets</h3><p>Compatible apps can bring a mobile device into the communication system where the role allows it.</p></div><div><span>03</span><h3>Vehicle & fixed positions</h3><p>Vehicle-mounted and desk-based options can connect moving crews and control points to the same structure.</p></div></div></section>
    <section className="devices-showcase"><div className="site-wrap devices-showcase-grid"><div><Eyebrow>Equipment / manufacturer examples</Eyebrow><h2>The product has to work in the field.</h2><p>Motorola WAVE PTX and Hytera PoC are among the device ranges considered for professional communication. The pictured models are illustrative; final models and compatibility are confirmed during system design.</p><TextLink to="/contact" light>Discuss your equipment needs</TextLink></div><div className="showcase-radios"><RadioImage model="hytera" /><RadioImage model="motorola" /></div></div></section>
    <section className="section site-wrap"><SectionHeading index="02 / Selection" title="The device decision follows the work." /><div className="criteria-list"><div><h3>Environment</h3><p>Where will it be carried and used: inside, outdoors, in vehicles or across facilities?</p></div><div><h3>Role</h3><p>Who needs instant voice, who needs a screen, and who needs to reach more than one group?</p></div><div><h3>Connectivity</h3><p>What cellular conditions and countries matter for the operation?</p></div><div><h3>Management</h3><p>How will devices and users be provisioned, updated and supported?</p></div></div></section>
    <ContactCta title="Select the equipment with the system, not before it." />
  </>
}

export function ConnectivityPage() {
  return <>
    <PageIntro index="04" eyebrow="Cellular connectivity" title="Plan the connection around where people work." lead="Push-to-Talk over Cellular depends on suitable network access. DKPS includes SIM and connectivity planning in the wider communication design, including operations across locations and borders." ><TextLink to="/contact">Discuss locations and routes</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Connectivity" title="A network layer that supports the operation." /><div className="statement-grid"><div><h3>Cellular data</h3><p>PoC communication uses commercial mobile networks to connect compatible devices with the platform.</p></div><div><h3>Managed SIMs</h3><p>Connectivity and device provisioning can be considered together rather than left to each individual team.</p></div><div><h3>International planning</h3><p>When work crosses borders, the required countries, networks and commercial terms should be checked before deployment.</p></div></div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Design questions" title="Coverage is a project question." text="Actual service depends on the networks available in the places where your people work. A useful design starts with a map of the operation, not a blanket coverage promise." /><div className="criteria-list"><div><h3>Where</h3><p>Sites, buildings, routes, outdoor areas and countries.</p></div><div><h3>Who</h3><p>Which teams must communicate locally, across facilities or internationally?</p></div><div><h3>How</h3><p>Which devices, networks and fallback methods fit each environment?</p></div><div><h3>Support</h3><p>Who manages SIMs, provisioning and changes as the operation evolves?</p></div></div></section>
    <ContactCta title="Tell us where communication needs to work." />
  </>
}
