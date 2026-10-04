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
  { slug: 'multi-site', name: 'Connect multiple sites', lead: 'Two facilities. One coordinated operation.', text: 'When teams work in separate buildings or cities, local conversations and cross-site escalation need different paths. Plan shared PTT groups and permissions around each location.', elements: ['Local and cross-site groups', 'Central user management', 'Supervisor escalation'] },
  { slug: 'vehicles', name: 'Coordinate vehicles and drivers', lead: 'Keep moving crews in the conversation.', text: 'Drivers, depot staff and supervisors need a simple way to reach each other during a shift. Match devices and cellular connectivity to actual routes, then define who can call which group.', elements: ['Drivers and depot teams', 'Route connectivity planning', 'Dispatch contact'] },
  { slug: 'international', name: 'Connect teams across countries', lead: 'One structure across borders.', text: 'For people operating in different countries, confirm the relevant mobile networks and commercial terms before deployment. Keep communication groups consistent across the organisation.', elements: ['Country-by-country planning', 'Shared communication groups', 'Device and SIM management'] },
  { slug: 'dispatch', name: 'Centralise dispatch', lead: 'Give coordination a clear point of control.', text: 'A control room needs to reach the right team or vehicle without broadcasting every message to everyone. Define dispatcher access, groups and escalation paths around the real workflow.', elements: ['Dispatcher access', 'Team and vehicle groups', 'Escalation paths'] },
  { slug: 'teams', name: 'Separate teams and departments', lead: 'Keep routine traffic relevant.', text: 'Maintenance, security, hospitality and site operations can share a system while using different groups. Supervisors can coordinate across groups when the work requires it.', elements: ['Department groups', 'Role-based communication', 'Cross-team supervision'] },
] as const

export const planNames = [
  { name: 'DKPS Connect', audience: 'A single operation', includes: ['PTT platform', 'Connected devices or compatible smartphones', 'Core group communication', 'Configuration and support'] },
  { name: 'DKPS Connect +', audience: 'Several teams or locations', includes: ['A wider device mix', 'More coordination workflows', 'Additional platform functions as required', 'Central management'] },
  { name: 'DKPS Core', audience: 'Complex or international operations', includes: ['Professional device planning', 'Multi-country connectivity planning', 'Dispatch and integration scope', 'Managed deployment and support'] },
] as const
