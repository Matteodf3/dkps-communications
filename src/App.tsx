import { Route, Routes } from 'react-router'
import { SiteLayout } from './site/layout'
import { ConnectivityPage, HomePage, PlatformPage, SystemPage } from './site/pages-primary'
import { DevicesPage, SectorEquipmentPage } from './site/EquipmentPages'
import { AboutPage, ContactPage, IndustriesPage, NotFoundPage, PlansPage, PrivacyPage, SolutionsPage } from './site/pages-secondary'

export default function App() {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path="system" element={<SystemPage />} />
      <Route path="platform" element={<PlatformPage />} />
      <Route path="devices" element={<DevicesPage />} />
      <Route path="devices/:slug" element={<SectorEquipmentPage />} />
      <Route path="connectivity" element={<ConnectivityPage />} />
      <Route path="industries" element={<IndustriesPage />} />
      <Route path="solutions" element={<SolutionsPage />} />
      <Route path="plans" element={<PlansPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
}
