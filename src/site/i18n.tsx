import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useState } from 'react'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router'
import { italian } from './italian'

export type Locale = 'en' | 'it'

type LocaleState = { locale: Locale; setLocale: (locale: Locale) => void; t: (english: string) => string }
const LocaleContext = createContext<LocaleState | null>(null)

function initialLocale(): Locale {
  const rendered = document.getElementById('root')?.getAttribute('data-locale')
  if (rendered === 'en' || rendered === 'it') return rendered
  const path = window.location.pathname.match(/^\/(en|it)(?:\/|$)/)?.[1]
  if (path === 'en' || path === 'it') return path
  const url = new URLSearchParams(window.location.search).get('lang')
  if (url === 'en' || url === 'it') return url
  const saved = window.localStorage.getItem('dkps-language')
  if (saved === 'en' || saved === 'it') return saved
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en'
}

export function LocaleProvider({ children, serverLocale }: { children: ReactNode; serverLocale?: Locale }) {
  const location = useLocation()
  const [locale] = useState<Locale>(serverLocale ?? initialLocale)

  useEffect(() => {
    if (/^\/(en|it)(?:\/|$)/.test(window.location.pathname)) return
    const url = new URLSearchParams(location.search).get('lang')
    if (url === 'en' || url === 'it') {
      const search = new URLSearchParams(location.search)
      search.delete('lang')
      const path = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`
      window.location.replace(`/${url}${path}${search.size ? `?${search}` : ''}${location.hash}`)
    }
  }, [location.search])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem('dkps-language', locale)
  }, [locale])

  function setLocale(next: Locale) {
    const search = new URLSearchParams(location.search)
    search.delete('lang')
    const path = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`
    const target = `/${next}${path}${search.size ? `?${search}` : ''}${location.hash}`
    window.location.assign(target)
  }

  const t = (english: string) => locale === 'it' ? italian[english] ?? english : english
  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('LocaleProvider is missing')
  return value
}

function withLanguage(to: string) {
  if (/^(mailto:|https?:|tel:)/.test(to)) return to
  const url = new URL(to, 'https://dkps.local')
  const path = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`
  return `${path}${url.search}${url.hash}`
}

type LinkProps = Omit<ComponentProps<typeof RouterLink>, 'to'> & { to: string }
export function Link({ to, ...props }: LinkProps) {
  return <RouterLink to={withLanguage(to)} {...props} />
}

type NavLinkProps = Omit<ComponentProps<typeof RouterNavLink>, 'to'> & { to: string }
export function NavLink({ to, ...props }: NavLinkProps) {
  return <RouterNavLink to={withLanguage(to)} {...props} />
}

const textProps = ['title', 'lead', 'eyebrow', 'text', 'index', 'alt', 'aria-label', 'placeholder'] as const

function translateTree(node: ReactNode, t: (english: string) => string): ReactNode {
  if (typeof node === 'string') {
    const word = node.trim()
    return word ? node.replace(word, t(word)) : node
  }
  if (Array.isArray(node)) return Children.map(node, item => translateTree(item, t))
  if (!isValidElement(node)) return node
  const element = node as ReactElement<Record<string, unknown>>
  const changes: Record<string, unknown> = {}
  for (const key of textProps) {
    const value = element.props[key]
    if (typeof value === 'string') changes[key] = t(value)
  }
  if (element.props.children !== undefined) changes.children = Children.map(element.props.children as ReactNode, item => translateTree(item, t))
  return cloneElement(element, changes)
}

/** Translates static page copy while leaving routes, product identifiers and data untouched. */
export function Localize({ children }: { children: ReactNode }) {
  const { t } = useLocale()
  return <>{translateTree(children, t)}</>
}
