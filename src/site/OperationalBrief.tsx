import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation } from 'react-router'
import { Link, useLocale } from './i18n'

type Choice = { key: string; en: string; it: string; image?: string }

const sectors: Choice[] = [
  { key: 'logistics', en: 'Logistics & transport', it: 'Logistica e trasporti', image: '/images/warehouse-real-30824313.jpeg' },
  { key: 'industry', en: 'Industry & maintenance', it: 'Industria e manutenzione', image: '/images/warehouse-real-36696522.jpeg' },
  { key: 'hospitality', en: 'Hotels & hospitality', it: 'Hotel e hospitality', image: '/images/brief-hospitality.jpeg' },
  { key: 'security', en: 'Security', it: 'Sicurezza', image: '/images/brief-security.jpeg' },
  { key: 'construction', en: 'Construction & engineering', it: 'Cantieri e impiantistica', image: '/images/brief-construction.jpeg' },
  { key: 'other', en: 'Another operation', it: 'Un’altra attività' },
]

const connections: Choice[] = [
  { key: 'teams', en: 'Teams', it: 'Team' },
  { key: 'departments', en: 'Departments', it: 'Reparti' },
  { key: 'sites', en: 'Multiple sites', it: 'Più sedi' },
  { key: 'vehicles', en: 'Vehicles', it: 'Veicoli' },
  { key: 'field', en: 'Field operators', it: 'Operatori sul territorio' },
  { key: 'international', en: 'People in different countries', it: 'Persone in Paesi diversi' },
  { key: 'dispatch', en: 'Control room / dispatch', it: 'Sala controllo / dispatch' },
]

const modes: Choice[] = [
  { key: 'instant', en: 'Instant team communication', it: 'Comunicazione immediata tra team' },
  { key: 'central', en: 'Central coordination', it: 'Coordinamento centralizzato' },
  { key: 'sites', en: 'Communication between sites', it: 'Comunicazione tra sedi' },
  { key: 'international', en: 'International operation', it: 'Operatività internazionale' },
  { key: 'unsure', en: 'I’m not sure yet', it: 'Non lo so ancora' },
]

const sizeRanges = ['1–10', '11–50', '51–200', '200+'] as const

const steps = [
  { en: 'Your environment', it: 'Il tuo settore' },
  { en: 'What to connect', it: 'Cosa collegare' },
  { en: 'How to communicate', it: 'Come comunicare' },
  { en: 'Your brief', it: 'Il tuo brief' },
]

function label(choice: Choice, locale: string) { return locale === 'it' ? choice.it : choice.en }
function picked(choices: Choice[], keys: string[], locale: string) { return choices.filter(choice => keys.includes(choice.key)).map(choice => label(choice, locale)) }

export function OperationalBrief() {
  const { locale } = useLocale()
  const location = useLocation()
  const context = new URLSearchParams(location.search).get('context') ?? ''
  const [step, setStep] = useState(0)
  const [sectorKeys, setSectorKeys] = useState<string[]>([])
  const [connectionKeys, setConnectionKeys] = useState<string[]>([])
  const [sizeRange, setSizeRange] = useState('')
  const [modeKeys, setModeKeys] = useState<string[]>([])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const tr = (en: string, it: string) => locale === 'it' ? it : en

  useEffect(() => {
    if (step > 0) headingRef.current?.focus()
  }, [step])

  function toggle(key: string, values: string[], update: (next: string[]) => void) {
    update(values.includes(key) ? values.filter(value => value !== key) : [...values, key])
  }

  function toggleMode(key: string) {
    if (key === 'unsure') setModeKeys(modeKeys.includes('unsure') ? [] : ['unsure'])
    else setModeKeys(modeKeys.includes(key) ? modeKeys.filter(value => value !== key) : [...modeKeys.filter(value => value !== 'unsure'), key])
  }

  const selectedConnections = connections.filter(choice => connectionKeys.includes(choice.key) && choice.key !== 'dispatch')
  const mapSources = selectedConnections.length ? selectedConnections : connections.slice(0, 3)
  const summary = [
    [tr('Environment', 'Settore'), picked(sectors, sectorKeys, locale)],
    [tr('To connect', 'Da collegare'), picked(connections, connectionKeys, locale)],
    [tr('Users / devices', 'Utenti / dispositivi'), sizeRange ? [sizeRange] : []],
    [tr('Communication', 'Comunicazione'), picked(modes, modeKeys, locale)],
  ] as const

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    setSending(true)
    setError(false)
    const form = event.currentTarget
    const data = new FormData(form)
    const values = new URLSearchParams()
    data.forEach((value, key) => values.append(key, String(value)))

    // The local preview and the legacy preview host do not process Netlify Forms.
    if (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname) || window.location.hostname.endsWith('.chatgpt.site')) {
      const details = summary.map(([name, items]) => `${name}: ${items.join(', ') || '—'}`).join('\n')
      const body = `${details}\n\n${tr('Name', 'Nome')}: ${data.get('name')}\n${tr('Company', 'Azienda')}: ${data.get('company')}\nEmail: ${data.get('email')}\n${tr('Phone', 'Telefono')}: ${data.get('phone') || '—'}\n${tr('Context', 'Contesto')}: ${context || '—'}${data.get('notes') ? `\n\n${tr('Additional details', 'Dettagli aggiuntivi')}: ${data.get('notes')}` : ''}`
      window.location.href = `mailto:info@dkpscommunications.com?subject=${encodeURIComponent('DKPS — operational brief')}&body=${encodeURIComponent(body)}`
      setSending(false)
      return
    }

    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: values.toString() })
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`)
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return <>
    <section className="brief-intro">
      <div className="site-wrap brief-intro-grid">
        <div><p className="brief-kicker">DKPS / {tr('START A PROJECT', 'AVVIA UN PROGETTO')}</p><h1>{tr('Tell us how your operation works.', 'Parlaci della tua operatività.')}</h1></div>
        <div><p>{tr('Let’s see how to connect your people, sites and vehicles. You do not need to know radios, networks or platforms: start with the way your organisation works.', 'Vediamo insieme come collegare persone, sedi e veicoli. Non serve conoscere radio, reti o piattaforme: partiamo da come lavora la tua organizzazione.')}</p><a href="mailto:info@dkpscommunications.com">{tr('Already know what you need? Write to us directly', 'Hai già un’esigenza precisa? Scrivici direttamente')} <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section className="brief-section site-wrap" aria-label={tr('Operational brief', 'Brief operativo')}>
      <nav className="brief-progress" aria-label={tr('Brief sections', 'Sezioni del brief')}>
        {steps.map((item, index) => <button key={item.en} type="button" className={index === step ? 'brief-progress-item is-current' : 'brief-progress-item'} aria-current={index === step ? 'step' : undefined} disabled={index > step} onClick={() => setStep(index)}><span>0{index + 1}</span>{locale === 'it' ? item.it : item.en}</button>)}
      </nav>

      {sent ? <div className="brief-sent" role="status"><p className="brief-kicker">DKPS / {tr('BRIEF RECEIVED', 'BRIEF RICEVUTO')}</p><h2>{tr('Thank you. We have your starting point.', 'Grazie. Abbiamo ricevuto il punto di partenza.')}</h2><p>{tr('DKPS can review your operation and contact you using the details you provided.', 'DKPS potrà esaminare la tua operatività e ricontattarti usando i dati che hai indicato.')}</p><a href="/">{tr('Return to the homepage', 'Torna alla homepage')} ↗</a></div> : <div className="brief-workspace" key={step}>
        <div className="brief-input">
          <p className="brief-kicker">0{step + 1} / 04 — {tr('OPERATIONAL BRIEF', 'BRIEF OPERATIVO')}</p>
          {step === 0 && <>
            <h2 ref={headingRef} tabIndex={-1}>{tr('Where do you work?', 'Dove lavorate?')}</h2>
            <p className="brief-lead">{tr('Select one or more environments. This gives us context; your communication system will be shaped around your actual operation.', 'Scegli uno o più ambiti. Ci danno un contesto; il sistema sarà progettato sulla vostra operatività reale.')}</p>
            <div className="brief-sector-grid">{sectors.map((choice, index) => <button key={choice.key} type="button" className={`brief-sector${sectorKeys.includes(choice.key) ? ' is-selected' : ''}${choice.image ? ' has-image' : ''}`} aria-pressed={sectorKeys.includes(choice.key)} onClick={() => toggle(choice.key, sectorKeys, setSectorKeys)}>{choice.image && <img src={choice.image} alt="" loading="lazy" />}<span className="brief-sector-shade" /><span className="brief-sector-index">0{index + 1}</span><strong>{label(choice, locale)}</strong><span className="brief-sector-check" aria-hidden="true">{sectorKeys.includes(choice.key) ? '✓' : '+'}</span></button>)}</div><p className="brief-photo-note">{tr('Illustrative photography; the people shown are not DKPS customers.', 'Fotografie illustrative; le persone ritratte non sono clienti DKPS.')}</p>
          </>}
          {step === 1 && <>
            <h2 ref={headingRef} tabIndex={-1}>{tr('What needs to stay connected?', 'Cosa deve restare collegato?')}</h2>
            <p className="brief-lead">{tr('Choose the parts of your organisation that need to talk to each other. The diagram shows the shape of your request.', 'Scegli le parti dell’organizzazione che devono comunicare. Lo schema mostra la forma della tua richiesta.')}</p>
            <div className="brief-choice-list">{connections.map((choice, index) => <button key={choice.key} type="button" aria-pressed={connectionKeys.includes(choice.key)} className={connectionKeys.includes(choice.key) ? 'brief-choice is-selected' : 'brief-choice'} onClick={() => toggle(choice.key, connectionKeys, setConnectionKeys)}><span>0{index + 1}</span><strong>{label(choice, locale)}</strong><b aria-hidden="true">{connectionKeys.includes(choice.key) ? '✓' : '+'}</b></button>)}</div>
            <fieldset className="brief-size"><legend>{tr('Indicative number of users / devices', 'Numero indicativo di utenti / dispositivi')}</legend><div className="brief-choice-list">{sizeRanges.map((range, index) => <button key={range} type="button" aria-pressed={sizeRange === range} className={sizeRange === range ? 'brief-choice is-selected' : 'brief-choice'} onClick={() => setSizeRange(range)}><span>0{index + 1}</span><strong>{range}</strong><b aria-hidden="true">{sizeRange === range ? '✓' : '+'}</b></button>)}</div></fieldset>
          </>}
          {step === 2 && <>
            <h2 ref={headingRef} tabIndex={-1}>{tr('How should people communicate?', 'Come devono comunicare?')}</h2>
            <p className="brief-lead">{tr('Choose the closest needs. It is fine if the technical answer is not clear yet.', 'Scegli le esigenze più vicine alla vostra realtà. Va bene anche se la risposta tecnica non è ancora chiara.')}</p>
            <div className="brief-choice-list brief-choice-list--modes">{modes.map((choice, index) => <button key={choice.key} type="button" aria-pressed={modeKeys.includes(choice.key)} className={modeKeys.includes(choice.key) ? 'brief-choice is-selected' : 'brief-choice'} onClick={() => toggleMode(choice.key)}><span>0{index + 1}</span><strong>{label(choice, locale)}</strong><b aria-hidden="true">{modeKeys.includes(choice.key) ? '✓' : '+'}</b></button>)}</div>
          </>}
          {step === 3 && <>
            <h2 ref={headingRef} tabIndex={-1}>{tr('Let’s talk about your system.', 'Parliamo del vostro sistema.')}</h2>
            <p className="brief-lead">{tr('Your brief gives DKPS a starting point for discussing devices, connectivity, PTT groups and dispatch. Add your contact details and send it.', 'Il brief dà a DKPS un punto di partenza per parlare di dispositivi, connettività, gruppi PTT e dispatch. Aggiungi i tuoi recapiti e invialo.')}</p>
            <div className="brief-summary brief-summary--mobile"><BriefSummary summary={summary} locale={locale} context={context} /></div>
            <form className="contact-form brief-form" name="dkps-operational-brief" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submitBrief}>
              <input type="hidden" name="form-name" value="dkps-operational-brief" />
              <input type="hidden" name="sector" value={picked(sectors, sectorKeys, 'en').join(', ')} />
              <input type="hidden" name="scope" value={picked(connections, connectionKeys, 'en').join(', ')} />
              <input type="hidden" name="users-devices" value={sizeRange} />
              <input type="hidden" name="communication" value={picked(modes, modeKeys, 'en').join(', ')} />
              <input type="hidden" name="context" value={context} />
              <input type="hidden" name="language" value={locale} />
              <p className="brief-honeypot" aria-hidden="true"><label>Leave this field empty <input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
              <div className="field-pair"><label>{tr('Full name', 'Nome e cognome')} <input name="name" autoComplete="name" required /></label><label>{tr('Company or organisation', 'Azienda o organizzazione')} <input name="company" autoComplete="organization" required /></label></div>
              <div className="field-pair"><label>{tr('Work email', 'Email aziendale')} <input name="email" type="email" autoComplete="email" required /></label><label>{tr('Phone (optional)', 'Telefono (facoltativo)')} <input name="phone" type="tel" autoComplete="tel" /></label></div>
              <label>{tr('Is there anything else you would like to add?', 'C’è qualcosa che vuoi aggiungere?')} <textarea name="notes" rows={4} /></label>
              <label className="brief-consent"><input name="privacy-consent" type="checkbox" value="yes" required /><span>{tr('I have read the', 'Ho letto la')} <Link to="/privacy">{tr('privacy information', 'informativa privacy')}</Link>.</span></label>
              <button className="submit-button" type="submit" disabled={sending}>{sending ? tr('Sending…', 'Invio in corso…') : tr('Send your brief to DKPS', 'Invia il brief a DKPS')} <span aria-hidden="true">↗</span></button>
              {error && <p className="brief-error" role="alert">{tr('The brief could not be sent. Please try again or email info@dkpscommunications.com directly.', 'Non siamo riusciti a inviare il brief. Riprova o scrivi direttamente a info@dkpscommunications.com.')}</p>}
            </form>
          </>}
          {step < 3 && <div className="brief-controls"><button type="button" className="brief-back" disabled={step === 0} onClick={() => setStep(step - 1)}>← {tr('Back', 'Indietro')}</button><button type="button" className="submit-button" disabled={step === 0 ? sectorKeys.length === 0 : step === 1 ? connectionKeys.length === 0 || !sizeRange : modeKeys.length === 0} onClick={() => setStep(step + 1)}>{tr('Continue', 'Continua')} <span aria-hidden="true">↗</span></button></div>}
          {step === 3 && <button type="button" className="brief-back brief-back--final" onClick={() => setStep(2)}>← {tr('Change your answers', 'Modifica le risposte')}</button>}
        </div>
        <aside className="brief-visual" aria-label={tr('Your communication map', 'La tua mappa di comunicazione')}>
          <div className="brief-visual-head"><span>{tr('YOUR OPERATION / LIVE SCHEMATIC', 'LA TUA OPERATIVITÀ / SCHEMA')}</span><span>DKPS / PTT</span></div>
          <div className="brief-map">
            <div className="brief-map-sources">
              {mapSources.map(choice => <div className={connectionKeys.includes(choice.key) ? 'brief-map-node is-active' : 'brief-map-node'} key={choice.key}><span className="brief-map-dot" />{label(choice, locale)}</div>)}
            </div>
            <div className="brief-map-path" aria-hidden="true"><span /></div>
            <div className="brief-map-core"><small>01 / {tr('COMMUNICATION LAYER', 'LIVELLO DI COMUNICAZIONE')}</small><strong>PTT PLATFORM</strong><span>{tr('Radio + cellular connectivity', 'Radio + connettività cellulare')}</span></div>
            <div className="brief-map-out"><span aria-hidden="true">↓</span><div className={connectionKeys.includes('dispatch') ? 'brief-map-dispatch is-active' : 'brief-map-dispatch'}>{tr('Control room / dispatch', 'Sala controllo / dispatch')}</div></div>
          </div>
          <div className="brief-visual-foot">{tr('Illustrative communication structure. DKPS defines the actual configuration with you.', 'Schema illustrativo. DKPS definisce la configurazione effettiva insieme a voi.')}</div>
          {step === 3 && <div className="brief-summary brief-summary--desktop"><BriefSummary summary={summary} locale={locale} context={context} /></div>}
        </aside>
      </div>}
    </section>
    <section className="brief-direct"><div className="site-wrap brief-direct-grid"><div><span className="brief-kicker">{tr('DIRECT CHANNEL', 'CONTATTO DIRETTO')}</span><h2>{tr('Prefer to speak directly?', 'Preferisci parlarne direttamente?')}</h2></div><a href="mailto:info@dkpscommunications.com">info@dkpscommunications.com <span aria-hidden="true">↗</span></a></div></section>
  </>
}

function BriefSummary({ summary, locale, context }: { summary: readonly (readonly [string, string[]])[]; locale: string; context: string }) {
  return <div><p className="brief-kicker">{locale === 'it' ? 'LA TUA ESIGENZA' : 'YOUR REQUIREMENT'}</p>{summary.map(([name, items]) => <div className="brief-summary-row" key={name}><span>{name}</span><strong>{items.join(' · ') || '—'}</strong></div>)}{context && <div className="brief-summary-row"><span>{locale === 'it' ? 'Contesto' : 'Context'}</span><strong>{context}</strong></div>}</div>
}
