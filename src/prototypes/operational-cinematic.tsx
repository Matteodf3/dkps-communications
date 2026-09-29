import { ContactLink, Motorola } from './shared'

export default function OperationalCinematic() {
  return <section className="variant variant--operational" aria-labelledby="operational-title">
    <div className="operational-photo"><img src="/images/warehouse-real-36696522.jpeg" alt="Workers and forklifts moving material inside an industrial warehouse" width="1920" height="1279" /></div>
    <div className="operational-story">
      <div className="operational-copy">
        <p className="variant-context">Professional communications for active operations</p>
        <h1 id="operational-title">Keep every moving part in contact.</h1>
        <p>DKPS builds professional Push-to-Talk systems around your teams, sites and vehicles. Radios, cellular connectivity, a PTT platform and dispatch work together.</p>
        <ContactLink light />
      </div>
      <div className="operational-radio"><Motorola /><span>Dedicated radio · manufacturer example</span></div>
    </div>
  </section>
}
