import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation } from 'react-router'
import { Link, Localize, useLocale } from './i18n'
import { industries, planNames, solutions } from './content'
import { ContactCta, Eyebrow, PageIntro, SectionHeading, TextLink } from './layout'

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
    <PageIntro index="06" eyebrow="Operational solutions" title="Start with the shape of the operation." lead="A single site, a network of facilities or a travelling workforce calls for different communication paths. DKPS configures the elements around that structure." ><TextLink to="/system">See the system architecture</TextLink></PageIntro>
    <section className="section site-wrap"><SectionHeading index="01 / Operating patterns" title="Five ways to frame the requirement." /><div className="solution-list">{solutions.map((solution, index) => <article className="solution-row" id={solution.slug} key={solution.slug}><div className="solution-head"><span>{String(index + 1).padStart(2, '0')}</span><h3>{solution.name}</h3><strong>{solution.lead}</strong></div><div className="solution-detail"><p>{solution.text}</p><ul>{solution.elements.map(element => <li key={element}>{element}</li>)}</ul><Link to={`/contact?context=${encodeURIComponent(t(solution.name))}`}>Discuss this operation <span aria-hidden="true">↗</span></Link></div></article>)}</div></section>
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
  const [opened, setOpened] = useState(false)
  const { locale } = useLocale()
  const location = useLocation()
  const context = new URLSearchParams(location.search).get('context') ?? ''

  function openDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const operation = String(data.get('operation') ?? '').trim()
    const body = locale === 'it'
      ? `Nome: ${name}\nEmail aziendale: ${email}\nOrganizzazione: ${company}\n\nAttività ed esigenze di comunicazione:\n${operation}`
      : `Name: ${name}\nWork email: ${email}\nOrganisation: ${company}\n\nOperation and communication needs:\n${operation}`
    const subject = `${locale === 'it' ? 'Richiesta sistema di comunicazione DKPS' : 'DKPS communication system enquiry'}${context ? ` — ${context}` : ''}`
    window.location.href = `mailto:info@dkpscommunications.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return <Localize>
    <PageIntro index="09" eyebrow="Contact" title="Tell us how communication works today." lead="A useful conversation starts with teams, facilities, vehicles and the people who coordinate them. DKPS can then discuss an appropriate Push-to-Talk system." />
    <section className="section site-wrap contact-page-grid"><div><SectionHeading index="01 / Enquiry" title="Describe the operation." text="This form opens an email draft in your own mail app. You can review it before sending; no details are transmitted until you send that email." /><form className="contact-form" onSubmit={openDraft}><div className="field-pair"><label>Full name <input name="name" autoComplete="name" required /></label><label>Work email <input name="email" type="email" autoComplete="email" required /></label></div><label>Company or organisation <input name="company" autoComplete="organization" /></label><label>What needs to be connected? <textarea key={context} name="operation" rows={7} required defaultValue={context ? `${locale === 'it' ? 'Vorrei parlare di' : 'I would like to discuss'} ${context.toLowerCase()}.\n\n` : ''} placeholder="Teams, sites, vehicles, countries, control room, current challenges…" /></label><button type="submit" className="submit-button">Open email draft <span aria-hidden="true">↗</span></button>{opened && <p role="status" className="form-status">Your email app should open a draft. Review it there before sending.</p>}</form></div><aside className="contact-aside"><Eyebrow>Direct contact</Eyebrow><h2>Prefer to write directly?</h2><a href="mailto:info@dkpscommunications.com">info@dkpscommunications.com <span aria-hidden="true">↗</span></a><div><h3>Helpful context to include</h3><ul><li>Teams and departments</li><li>Sites, vehicles and routes</li><li>Countries of operation</li><li>Current radios or communication tools</li><li>Who needs dispatch or supervision</li></ul></div></aside></section>
  </Localize>
}

export function NotFoundPage() {
  return <section className="not-found site-wrap"><Eyebrow>Page not found</Eyebrow><h1>That route is not part of this site.</h1><p>Use the navigation to explore the DKPS system, or return to the homepage.</p><TextLink to="/">Return home</TextLink></section>
}
