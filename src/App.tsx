import { Route, Routes } from 'react-router'
import { SiteLayout } from './site/layout'
import { ConnectivityPage, DevicesPage, HomePage, PlatformPage, SystemPage } from './site/pages-primary'
import { AboutPage, ContactPage, IndustriesPage, NotFoundPage, PlansPage, SolutionsPage } from './site/pages-secondary'

export default function App() {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="system" element={<SystemPage />} />
      <Route path="platform" element={<PlatformPage />} />
      <Route path="devices" element={<DevicesPage />} />
      <Route path="connectivity" element={<ConnectivityPage />} />
      <Route path="industries" element={<IndustriesPage />} />
      <Route path="solutions" element={<SolutionsPage />} />
      <Route path="plans" element={<PlansPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
}
