import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import OperationalCinematic from './operational-cinematic'
import ProductCampaign from './product-campaign'
import SystemVisual from './system-visual'
import { PrototypeHeader } from './shared'

const variants = [
  { name: 'Operational cinematic', Component: OperationalCinematic },
  { name: 'Product campaign', Component: ProductCampaign },
  { name: 'System visual', Component: SystemVisual },
] as const

function initialVariant() {
  const requested = Number(new URLSearchParams(window.location.search).get('v'))
  return requested >= 1 && requested <= variants.length ? requested - 1 : 0
}

export default function PrototypeApp() {
  const [current, setCurrent] = useState(initialVariant)
  const [revision, setRevision] = useState(0)
  const picker = useRef<HTMLElement>(null)
  const highlight = useRef<HTMLSpanElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  useLayoutEffect(() => {
    const selected = buttons.current[current]
    if (selected && highlight.current) {
      highlight.current.style.width = `${selected.offsetWidth}px`
      highlight.current.style.transform = `translateX(${selected.offsetLeft}px)`
    }
    const url = new URL(window.location.href)
    url.searchParams.set('v', String(current + 1))
    window.history.replaceState(null, '', url)
  }, [current])

  useEffect(() => {
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => picker.current?.setAttribute('data-ready', ''))
    })
    const onResize = () => {
      const selected = buttons.current[current]
      if (selected && highlight.current) {
        highlight.current.style.width = `${selected.offsetWidth}px`
        highlight.current.style.transform = `translateX(${selected.offsetLeft}px)`
      }
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); window.removeEventListener('resize', onResize) }
  }, [current])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable) return
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const number = Number(event.key)
      if (Number.isInteger(number) && number >= 1 && number <= variants.length) setCurrent(number - 1)
      else if (event.key === 'ArrowRight') setCurrent(index => (index + 1) % variants.length)
      else if (event.key === 'ArrowLeft') setCurrent(index => (index - 1 + variants.length) % variants.length)
      else if (event.key === 'r' || event.key === 'R') setRevision(value => value + 1)
      else return
      event.preventDefault()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const Variant = variants[current].Component
  return <>
    <PrototypeHeader />
    <main id="stage" key={`${current}-${revision}`}><Variant /></main>
    <nav className="proto-picker" aria-label="Prototype variants" ref={picker}>
      <span className="proto-picker-highlight" aria-hidden="true" ref={highlight}></span>
      {variants.map((variant, index) => <button
        key={variant.name}
        className="proto-picker-item"
        ref={element => { buttons.current[index] = element }}
        data-active={index === current ? '' : undefined}
        aria-current={index === current ? 'true' : undefined}
        onClick={() => setCurrent(index)}
      >{variant.name}</button>)}
    </nav>
  </>
}
