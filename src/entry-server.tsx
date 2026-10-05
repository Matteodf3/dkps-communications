import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { LocaleProvider } from './site/i18n'
import type { Locale } from './site/i18n'

export function renderPage(path: string, locale: Locale) {
  const basename = path.startsWith(`/${locale}/`) || path === `/${locale}` ? `/${locale}` : undefined
  return renderToString(
    <StaticRouter location={path} basename={basename}>
      <LocaleProvider serverLocale={locale}><App /></LocaleProvider>
    </StaticRouter>,
  )
}
