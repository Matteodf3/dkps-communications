import { ContactLink, Motorola } from './shared'

export default function ProductCampaign() {
  return <section className="variant variant--product" aria-labelledby="product-title">
    <div className="product-red-field" aria-hidden="true" />
    <div className="product-body">
      <div className="product-copy">
        <p className="variant-context">DKPS Communications / Professional Push-to-Talk</p>
        <h1 id="product-title">The radio is the start of the system.</h1>
        <p>DKPS connects professional radios to cellular connectivity, a PTT platform and dispatch. One communication arrangement, designed for your operation.</p>
        <ContactLink light />
      </div>
      <div className="product-object">
        <Motorola />
        <span className="product-object-caption">Motorola WAVE PTX · representative radio</span>
      </div>
    </div>
    <div className="product-flow" aria-label="The DKPS communication system"><span>Radio</span><i aria-hidden="true">→</i><span>Cellular connectivity</span><i aria-hidden="true">→</i><span>PTT platform</span><i aria-hidden="true">→</i><span>Dispatch</span></div>
  </section>
}
