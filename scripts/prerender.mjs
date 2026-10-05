import { readFile, mkdir, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { renderPage } from '../dist-ssr/entry-server.js'

const site = 'https://dkps-communications.netlify.app'
const routes = [
  ['/', 'Professional Push-to-Talk communication systems', 'Sistemi di comunicazione Push-to-Talk professionali'],
  ['/system', 'A communication system built around your operation', 'Un sistema di comunicazione costruito attorno alla tua operatività'],
  ['/platform', 'PTT platform and dispatch', 'Piattaforma PTT e dispatch'],
  ['/devices', 'Professional radios, bodycams and accessories', 'Radio professionali, bodycam e accessori'],
  ['/devices/logistics', 'Equipment for logistics and transport', 'Dispositivi per logistica e trasporti'],
  ['/devices/warehousing', 'Equipment for warehouses and yards', 'Dispositivi per magazzini e piazzali'],
  ['/devices/security', 'Equipment for security operations', 'Dispositivi per operazioni di sicurezza'],
  ['/devices/mountain', 'Equipment for mountain operations', 'Dispositivi per operazioni in montagna'],
  ['/connectivity', 'Cellular connectivity for field teams', 'Connettività cellulare per i team sul campo'],
  ['/industries', 'Communication systems for operational sectors', 'Sistemi di comunicazione per settori operativi'],
  ['/solutions', 'Solutions for operational communication', 'Soluzioni per la comunicazione operativa'],
  ['/plans', 'Plan a professional communication system', 'Progettare un sistema di comunicazione professionale'],
  ['/about', 'About DKPS Communications', 'Chi è DKPS Communications'],
  ['/contact', 'Tell DKPS about your operation', 'Parlaci della tua operatività'],
  ['/privacy', 'Privacy information', 'Informativa privacy'],
]

const descriptions = {
  en: 'DKPS Communications designs professional Push-to-Talk systems connecting radios, cellular connectivity, a PTT platform and dispatch around your operation.',
  it: 'DKPS Communications progetta sistemi Push-to-Talk professionali con radio, connettività cellulare, piattaforma PTT e dispatch attorno alla tua operatività.',
}
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const template = await readFile('dist/index.html', 'utf8')

function pageUrl(locale, route) {
  return `${site}/${locale}${route === '/' ? '/' : `${route}/`}`
}

function htmlFor(route, locale, title, canonical = true) {
  const path = canonical ? `/${locale}${route === '/' ? '/' : route}` : route
  const content = renderPage(path, locale)
  if (!content.includes('<main')) throw new Error(`Missing page content: ${path}`)
  const fullTitle = `${title} | DKPS Communications`
  const url = pageUrl(locale, route)
  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="it" href="${pageUrl('it', route)}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl('en', route)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('it', route)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:locale" content="${locale === 'it' ? 'it_IT' : 'en_US'}" />`,
    `<meta property="og:title" content="${escape(fullTitle)}" />`,
    `<meta property="og:description" content="${escape(descriptions[locale])}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site}/images/dkps-operational-hero.png" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ].join('\n    ')
  return template
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escape(descriptions[locale])}" />\n    ${head}`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace('<div id="root"></div>', `<div id="root" data-locale="${locale}">${content}</div>`)
}

async function output(path, html) {
  const file = path === '/' ? 'dist/index.html' : join('dist', path.slice(1), 'index.html')
  await mkdir(join(file, '..'), { recursive: true })
  await writeFile(file, html)
}

for (const [route, enTitle, itTitle] of routes) {
  await output(route, htmlFor(route, 'it', itTitle, false))
  await output(`/it${route === '/' ? '' : route}`, htmlFor(route, 'it', itTitle))
  await output(`/en${route === '/' ? '' : route}`, htmlFor(route, 'en', enTitle))
}

const sitemap = routes.flatMap(([route]) => ['it', 'en'].map(locale => `<url><loc>${pageUrl(locale, route)}</loc><xhtml:link rel="alternate" hreflang="it" href="${pageUrl('it', route)}"/><xhtml:link rel="alternate" hreflang="en" href="${pageUrl('en', route)}"/></url>`)).join('')
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${sitemap}</urlset>`)
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`)
await rm('dist-ssr', { recursive: true, force: true })
console.log(`Prerendered ${routes.length * 3} pages: Italian legacy paths plus /it and /en.`)
