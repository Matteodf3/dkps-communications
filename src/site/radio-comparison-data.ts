import type { Copy } from './equipment-data'

type ComparisonValue = Copy | 'confirm'
export type RadioComparison = {
  network: Copy
  battery?: ComparisonValue
  protection?: ComparisonValue
  display?: ComparisonValue
  controls?: ComparisonValue
  wireless?: ComparisonValue
  note?: Copy
}

const same = (value: string): Copy => ({ en: value, it: value })
const capacity = (en: string, it: string): Copy => ({ en: `${en} mAh`, it: `${it} mAh` })

// Values follow the supplied DKPS stock list and its technical tables.
// A missing field is not stated in the flyer; "confirm" marks a source conflict.
export const radioComparison: Record<string, RadioComparison> = {
  'dkps-radhh-018': { network: same('4G LTE / PoC'), battery: capacity('5,000', '5.000'), protection: same('IP68'), display: { en: '4.0″ IPS', it: '4,0″ IPS' }, controls: { en: 'Physical controls + touchscreen', it: 'Comandi fisici + touchscreen' }, wireless: same('Wi-Fi 2.4 GHz / NFC') },
  'dkps-radhh-024': { network: same('4G LTE / PoC'), battery: 'confirm', protection: 'confirm', display: 'confirm', controls: 'confirm', wireless: 'confirm', note: { en: 'Article identity and photo require confirmation.', it: 'Identità dell’articolo e foto da confermare.' } },
  'dkps-radhh-010': { network: { en: 'Cellular PoC / dual SIM', it: 'PoC cellulare / doppia SIM' }, battery: capacity('7,000', '7.000'), protection: same('IP68'), controls: { en: 'Dedicated PTT + SOS', it: 'PTT + SOS dedicati' } },
  'dkps-radhh-011': { network: same('3G / 4G PoC'), battery: capacity('4,000', '4.000'), protection: same('IP68'), display: { en: '2.8″ touchscreen', it: 'Touchscreen 2,8″' }, controls: { en: 'Touchscreen', it: 'Touchscreen' }, wireless: same('Wi-Fi 2.4 / 5 GHz · Bluetooth 4.2') },
  'dkps-radvh-002': { network: same('LTE / WCDMA / GSM'), battery: 'confirm', protection: 'confirm', controls: 'confirm', wireless: same('Wi-Fi 802.11 b/g/n · BLE 5.0'), note: { en: 'Vehicle or handheld form requires confirmation.', it: 'Configurazione veicolare o portatile da confermare.' } },
  'dkps-radhh-004': { network: same('LTE / WCDMA / GSM'), battery: 'confirm', protection: 'confirm', display: 'confirm', wireless: 'confirm' },
  'dkps-radhh-005': { network: same('LTE / WCDMA / GSM'), battery: 'confirm', protection: 'confirm', display: 'confirm', controls: { en: 'Numeric keypad', it: 'Tastiera numerica' }, wireless: 'confirm' },
  'dkps-radhh-006': { network: same('LTE / WCDMA / GSM'), battery: 'confirm', protection: 'confirm', display: 'confirm', wireless: same('Wi-Fi 802.11 b/g/n') },
  'dkps-radhh-023': { network: same('LTE / WCDMA / GSM / GPRS'), wireless: same('Wi-Fi 2.4 GHz') },
  'dkps-radhh-014': { network: same('4G LTE / PoC'), battery: capacity('4,000', '4.000'), protection: same('IP68'), display: { en: '2.4″ colour LCD', it: 'LCD a colori 2,4″' }, wireless: same('Wi-Fi 5 · Bluetooth 5.0') },
  'dkps-radhh-025': { network: same('4G LTE / PoC'), battery: capacity('4,000', '4.000'), protection: same('IP68'), display: { en: '2.4″ colour LCD', it: 'LCD a colori 2,4″' }, wireless: same('Wi-Fi 5 · Bluetooth 5.0') },
  'dkps-radhh-015': { network: same('4G LTE / PoC'), battery: capacity('5,000', '5.000'), protection: same('IP68'), display: 'confirm', wireless: same('Wi-Fi 2.4 GHz / NFC'), note: { en: 'The title and technical table disagree on display size.', it: 'Titolo e tabella tecnica non concordano sulla dimensione dello schermo.' } },
  'dkps-radhh-017': { network: same('4G / PoC'), battery: 'confirm', protection: same('IP54'), display: { en: '2.4″ LCD', it: '2,4″ LCD' }, wireless: same('Wi-Fi 2.4 GHz / NFC'), note: { en: 'Battery differs between the table and flyer footer.', it: 'Batteria discordante tra tabella e piè di pagina del flyer.' } },
  'dkps-radhh-003': { network: same('4G / PoC'), battery: 'confirm', protection: same('IP54'), display: { en: '0.96″ OLED', it: '0,96″ OLED' }, controls: { en: 'Physical controls', it: 'Comandi fisici' }, wireless: same('Wi-Fi 2.4 GHz / NFC'), note: { en: 'Battery differs between the table and flyer footer.', it: 'Batteria discordante tra tabella e piè di pagina del flyer.' } },
}
