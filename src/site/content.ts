export const systemLayers = [
  {
    number: '01', name: 'Radios & devices', path: '/devices',
    summary: 'The point of contact for people in the field.',
    detail: 'Dedicated Push-to-Talk radios, smartphones and fixed or vehicle-based devices can be selected for the way each team works.',
  },
  {
    number: '02', name: 'Connectivity', path: '/connectivity',
    summary: 'The connection between people and locations.',
    detail: 'Cellular data and managed SIM connectivity carry voice and information between devices, sites, vehicles and countries.',
  },
  {
    number: '03', name: 'PTT platform', path: '/platform',
    summary: 'The structure behind every conversation.',
    detail: 'The platform routes calls and organises users, groups and communication permissions around the operation.',
  },
  {
    number: '04', name: 'Dispatch', path: '/platform#dispatch',
    summary: 'One place to coordinate the operation.',
    detail: 'A dispatcher can communicate with teams and use the tools configured for supervision, visibility and response.',
  },
] as const

export const platformFeatures = [
  { group: 'Communication', name: 'Push-to-Talk', text: 'Voice communication between individuals and groups through compatible devices and the PTT platform.' },
  { group: 'Communication', name: 'Messaging', text: 'Text and multimedia communication alongside voice, where supported by the selected platform and devices.' },
  { group: 'Communication', name: 'Video', text: 'Video sharing can give a dispatcher more context during an operational exchange.' },
  { group: 'Coordination', name: 'Dispatcher console', text: 'A web-based point for authorised operators to reach teams, supervise groups and coordinate responses.' },
  { group: 'Coordination', name: 'Location visibility', text: 'Device location and route information can help teams coordinate work across a site or fleet.' },
  { group: 'Coordination', name: 'Geofencing', text: 'Location-based zones and alerts can support defined operational workflows.' },
  { group: 'Safety & records', name: 'Emergency alert', text: 'An SOS workflow can connect a field user with the people responsible for responding.' },
  { group: 'Safety & records', name: 'Lone worker', text: 'Check-in and escalation workflows can support people working away from a team.' },
  { group: 'Safety & records', name: 'Recording & playback', text: 'Where enabled, communication records can support incident review and operational learning.' },
] as const

export const industries = [
  { slug: 'logistics-transport', name: 'Logistics & transport', context: 'Vehicles, depots, routes and dispatch need a shared communication structure.', system: 'Connect drivers, supervisors and operations teams across moving work.' },
  { slug: 'hospitality-hotels', name: 'Hospitality & hotels', context: 'Front of house, housekeeping, maintenance and security work on different schedules.', system: 'Give each department the groups it needs while preserving a route to supervisors.' },
  { slug: 'manufacturing', name: 'Manufacturing', context: 'Production, maintenance and management need clear communication across a site.', system: 'Coordinate teams around plant operations and changing priorities.' },
  { slug: 'security', name: 'Security', context: 'Teams need rapid communication between patrols, supervisors and the control room.', system: 'Structure field and control-room communication with defined roles and escalation.' },
  { slug: 'construction', name: 'Construction & engineering', context: 'Projects bring together crews, subcontractors, vehicles and temporary locations.', system: 'Keep site teams and project coordination in contact as the work changes.' },
  { slug: 'mountain-operations', name: 'Mountain & resort operations', context: 'Lift teams, slope operations, maintenance and guest services work across demanding terrain.', system: 'Map teams and escalation paths with connectivity assessed for each location.' },
  { slug: 'field-maintenance', name: 'Field service & maintenance', context: 'Mobile technicians need a direct route to supervisors and colleagues across sites.', system: 'Connect technicians, vehicles and support teams through the relevant groups.' },
  { slug: 'ports-maritime', name: 'Ports & maritime', context: 'Dockside teams, vehicles and operations staff work across broad facilities.', system: 'Organise communication around terminals, duties and supervisors.' },
  { slug: 'agriculture-wine', name: 'Agriculture & wine', context: 'Field teams can be spread across estates and seasonal operations.', system: 'Coordinate field work where cellular connectivity is available.' },
  { slug: 'cruise', name: 'Cruise operations', context: 'Shipboard teams and shore operations have distinct communication needs.', system: 'Plan communication groups and connectivity around the operating environment.' },
  { slug: 'healthcare', name: 'Healthcare', context: 'Facilities need clear escalation between operational and support teams.', system: 'Configure communication around responsibilities and applicable privacy requirements.' },
] as const

export const solutions = [
  { slug: 'single-site', name: 'Single site', lead: 'Many teams. One facility.', text: 'A hotel, factory, campus or port can bring departments into a shared system while keeping everyday conversations relevant to each role.', elements: ['Department groups', 'Supervisor escalation', 'Fixed and mobile users'] },
  { slug: 'multi-site', name: 'Multi-site', lead: 'One organisation across locations.', text: 'A common platform can connect separate facilities and give regional operations a consistent way to coordinate.', elements: ['Local and cross-site groups', 'Central user management', 'Dispatch across locations'] },
  { slug: 'international', name: 'International operations', lead: 'Teams that cross borders.', text: 'Plan devices, cellular connectivity and platform access together for people working in more than one country.', elements: ['Connectivity planning', 'Shared communication structure', 'Support across the system'] },
  { slug: 'remote-workforce', name: 'Remote workforce', lead: 'People working away from a base.', text: 'Keep mobile and isolated workers connected to supervisors and response teams where suitable connectivity is available.', elements: ['Field communication', 'Location-aware workflows', 'Escalation paths'] },
  { slug: 'events', name: 'Event communications', lead: 'Temporary teams, changing roles.', text: 'Organise event staff, operations, security and control teams around a defined communication plan.', elements: ['Temporary groups', 'Role-based access', 'Control-room coordination'] },
] as const

export const planNames = [
  { name: 'DKPS Connect', audience: 'A single operation', includes: ['PTT platform', 'Connected devices or compatible smartphones', 'Core group communication', 'Configuration and support'] },
  { name: 'DKPS Connect +', audience: 'Several teams or locations', includes: ['A wider device mix', 'More coordination workflows', 'Additional platform functions as required', 'Central management'] },
  { name: 'DKPS Core', audience: 'Complex or international operations', includes: ['Professional device planning', 'Multi-country connectivity planning', 'Dispatch and integration scope', 'Managed deployment and support'] },
] as const
