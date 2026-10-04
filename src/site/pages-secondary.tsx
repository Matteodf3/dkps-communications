import { Link, Localize, useLocale } from './i18n'
import { industries, planNames, solutions } from './content'
import { ContactCta, Eyebrow, PageIntro, SectionHeading, TextLink } from './layout'
import { OperationalBrief } from './OperationalBrief'

export function IndustriesPage() {
  const { locale, t } = useLocale()
  return <Localize>
    <PageIntro index="05" eyebrow="Industries" title="Different environments. Clear communication." lead="DKPS describes applications across transport, facilities, hospitality, industry and field work. Each environment changes the way teams, sites and control points should be connected." ><TextLink to="/solutions">Explore operating patterns</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Environments" title="Start with the work on the ground." /><div className="industry-list">{industries.map((industry, index) => <article className="industry-row" id={industry.slug} key={industry.slug}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{industry.name}</h3><p>{industry.context}</p></div><p>{industry.system}</p><Link to={`/contact?context=${encodeURIComponent(t(industry.name))}`} aria-label={locale === 'it' ? `Parliamo di ${t(industry.name)} con DKPS` : `Discuss ${industry.name} with DKPS`}>Discuss this context <span aria-hidden="true">↗</span></Link></article>)}</div></section>
    <ContactCta title="Your industry is only the starting point." text="The useful detail is how your own teams, locations and responsibilities work together." />
  </Localize>
}

export function SolutionsPage() {
  const { t } = useLocale()
  return <Localize>
    <PageIntro index="06" eyebrow="Operational solutions" title="Solve the communication gaps in your operation." lead="Sites that cannot reach one another. Drivers out on routes. Departments sharing the wrong channel. Start with the problem; DKPS can design the devices, connectivity and PTT structure around it." ><TextLink to="/system">See the system architecture</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Operating requirements" title="Where does communication break down?" /><div className="solution-list">{solutions.map((solution, index) => <article className="solution-row" id={solution.slug} key={solution.slug}><div className="solution-head"><span>{String(index + 1).padStart(2, '0')}</span><h3>{solution.name}</h3><strong>{solution.lead}</strong></div><div className="solution-detail"><p>{solution.text}</p><ul>{solution.elements.map(element => <li key={element}>{element}</li>)}</ul><Link to={`/contact?context=${encodeURIComponent(t(solution.name))}`}>Talk to DKPS about this need <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>
    <ContactCta title="Describe your operation. We will map the communication." />
  </Localize>
}

export function PlansPage() {
  return <Localize>
    <PageIntro index="07" eyebrow="Plans & project scope" title="A system proposal should show what is included." lead="DKPS offers three solution levels. Equipment, platform functions, connectivity and support are scoped around each deployment; no fixed price is shown here." ><TextLink to="/contact">Request a scoped proposal</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Starting points" title="A commercial structure for different levels of complexity." text="These are starting points for a conversation, not fixed technical specifications or a checkout catalogue." /><div className="plan-list">{planNames.map((plan, index) => <div className="plan-row" key={plan.name}><span>0{index + 1}</span><div><h3>{plan.name}</h3><p>{plan.audience}</p></div><ul>{plan.includes.map(item => <li key={item}>{item}</li>)}</ul><TextLink to={`/contact?context=${encodeURIComponent(plan.name)}`}>Discuss scope</TextLink></div>)}</div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Proposal" title="What a useful quote needs to cover." /><div className="criteria-list"><div><h3>Equipment</h3><p>Device types, quantities and accessories matched to roles and environments.</p></div><div><h3>Platform</h3><p>Required communication groups, dispatch access and relevant capabilities.</p></div><div><h3>Connectivity</h3><p>Locations, routes, countries and SIM management requirements.</p></div><div><h3>Deployment & support</h3><p>Configuration, onboarding, ongoing management and commercial terms.</p></div></div></section>
    <ContactCta title="Ask for a proposal shaped around your operation." />
  </Localize>
}

export function AboutPage() {
  return <Localize>
    <PageIntro index="08" eyebrow="Company" title="DKPS approaches communication as a system." lead="DKPS designs and integrates professional Push-to-Talk over Cellular solutions. The focus is the operating structure behind the device." ><TextLink to="/contact">Start a conversation</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Approach" title="The complete chain belongs in one conversation." /><div className="about-statement"><p>Buying radios alone does not decide who can reach whom, how sites connect, what dispatch sees or who supports a changing organisation. DKPS brings those decisions into the same design process.</p><div><h3>Design</h3><p>Understand teams, locations and communication hierarchy.</p><h3>Integrate</h3><p>Bring equipment, connectivity, platform and dispatch into a coherent setup.</p><h3>Support</h3><p>Keep one point of contact for the system as operational needs change.</p></div></div></section>
    <section className="section section--line site-wrap"><SectionHeading index="02 / Technology choices" title="Choose for fit, not for a catalogue page." text="The DKPS offer brings Motorola Solutions and Hytera device ranges together with platform and SIM services. Hardware and functions are confirmed for each deployment." /><div className="brand-line"><span>Motorola Solutions</span><span>Hytera</span><span>Platform</span><span>Connectivity</span></div></section>
    <section className="section section--line site-wrap"><SectionHeading index="03 / Working with DKPS" title="A practical sequence from brief to use." /><div className="process-list"><div><span>01</span><h3>Operational brief</h3><p>Describe teams, locations, routes, devices and existing communication gaps.</p></div><div><span>02</span><h3>System design</h3><p>Agree the communication structure, technology choices and deployment scope.</p></div><div><span>03</span><h3>Configuration & support</h3><p>Set up the chosen system and define ownership for ongoing changes and assistance.</p></div></div></section>
    <ContactCta />
  </Localize>
}

export function ContactPage() {
  return <OperationalBrief />
}

export function PrivacyPage() {
  return <Localize>
    <PageIntro index="09" eyebrow="Privacy" title="How this website handles your details." lead="This page explains what happens when you send an operational brief through the DKPS Communications website." />
    <section className="section site-wrap privacy-content">
      <h2>Who to contact</h2>
      <p>DKPS Communications is operated by Dukapis &amp; Co. s.r.l.s., VAT / P.IVA 13205921003. For questions about personal data, write to <a href="mailto:privacy@dkpscommunications.com">privacy@dkpscommunications.com</a>.</p>
      <h2>Information you provide</h2>
      <p>The guided brief asks for your name, organisation, work email and, optionally, phone number and notes. It also records the operational choices you select, such as sector, people or devices, locations and communication needs.</p>
      <h2>How the brief is handled</h2>
      <p>The information is used to respond to your request and discuss a possible communication system. The form is processed through Netlify Forms, the hosting service used by this website. Please do not include sensitive personal information in the optional notes.</p>
      <h2>Language preference</h2>
      <p>Your language choice is stored in your browser so the site can remember whether you prefer English or Italian. This site does not include its own analytics or advertising tracking scripts.</p>
      <h2>Your questions and rights</h2>
      <p>To ask about access, correction or deletion of information sent through the brief, contact <a href="mailto:privacy@dkpscommunications.com">privacy@dkpscommunications.com</a>. <a href="https://dkps-connect.sintra.site/gdpr" target="_blank" rel="noopener noreferrer">The DKPS privacy policy ↗</a> provides the company’s broader privacy information.</p>
    </section>
  </Localize>
}

export function NotFoundPage() {
  return <section className="not-found site-wrap"><Eyebrow>Page not found</Eyebrow><h1>That route is not part of this site.</h1><p>Use the navigation to explore the DKPS system, or return to the homepage.</p><TextLink to="/">Return home</TextLink></section>
}
