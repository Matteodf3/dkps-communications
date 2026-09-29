import { ContactLink, Hytera } from './shared'

export default function SystemVisual() {
  return <section className="variant variant--system" aria-labelledby="system-visual-title">
    <div className="system-visual-head">
      <div><p className="variant-context">DKPS Communications / Professional systems</p><h1 id="system-visual-title">Connect the entire operation.</h1></div>
      <div><p>One professional Push-to-Talk system brings radios, cellular connectivity, a PTT platform, dispatch and teams into one working structure.</p><ContactLink /></div>
    </div>
    <div className="system-visual-track" aria-label="Radio to cellular network to PTT platform to dispatch to teams">
      <div className="system-visual-node system-visual-node--radio"><Hytera /><strong>Radio</strong><span>People in the field</span></div>
      <div className="system-visual-node"><strong>Cellular network</strong><span>Connection across sites</span></div>
      <div className="system-visual-node"><strong>PTT platform</strong><span>Groups, roles, permissions</span></div>
      <div className="system-visual-node"><strong>Dispatch</strong><span>Operational coordination</span></div>
      <div className="system-visual-node system-visual-node--teams"><img src="/images/warehouse-real-30824313.jpeg" alt="Two workers moving through a warehouse aisle" width="1600" height="900" /><strong>Teams</strong><span>Sites, vehicles, departments</span></div>
    </div>
    <p className="system-visual-note">Illustrative operation and manufacturer radio example. The architecture is configured around each customer.</p>
  </section>
}
