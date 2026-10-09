export interface SlideItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  bulletPoints: string[];
  keyStats?: Array<{ value: string; label: string; desc?: string }>;
  quote?: string;
  techGrid?: Array<{ category: string; stack: string; desc: string }>;
  workflowSteps?: Array<{ step: string; name: string; desc: string; icon: string }>;
}

export const SLIDES_DATA: SlideItem[] = [
  {
    id: 1,
    title: 'RainRoute: Smart Flood-Safe Navigation for Every Rainy Day',
    subtitle: 'Connecting Technology with Commuter Safety During Monsoon Disasters',
    category: 'Title & Introduction',
    bulletPoints: [
      'RainRoute: Smart Flood-Safe Navigation for Every Rainy Day',
      'Team NEXUS: St. Mother Theresa Engineering College, Thoothukudi',
      'Department of Computer Science & Engineering | II Year',
    ],
  },
  {
    id: 2,
    title: 'Who We Are',
    subtitle: 'Connecting Solutions for Safer Roads',
    category: 'Team Vision',
    bulletPoints: [
      'TEAM NEXUS: Connecting Solutions for Safer Roads.',
      'We are a team of passionate Computer Science students driven by the vision to solve real-world problems using technology.',
      'Our team name "NEXUS" represents the connection between innovation and impact — bridging the gap between weather data and commuter safety.',
      'Together, we built RainRoute to help people navigate safely during heavy rainfall and flooding.',
      'St. Mother Theresa Engineering College, Thoothukudi | CSE Department | II Year',
    ],
  },
  {
    id: 3,
    title: 'Our Team Members',
    subtitle: 'United by purpose, driven by innovation',
    category: 'Team Structure',
    bulletPoints: [
      'N. Magdalene Ashirvatham – Team Leader',
      'A. Srini – Developer / Team Member',
      'P. Revathi – Designer / Team Member',
      'B. Benisha – Researcher / Team Member',
    ],
    quote: '"United by purpose, driven by innovation"',
  },
  {
    id: 4,
    title: 'The Problem We Solve',
    subtitle: 'The Monsoon Dilemma on Urban Roads',
    category: 'Problem Statement',
    bulletPoints: [
      'Heavy rainfall causes sudden waterlogging on city roads within minutes.',
      'Commuters have no real-time information about flooded routes.',
      'Vehicle damage and safety risks increase drastically during monsoons.',
      'Existing navigation apps do not account for flood conditions or road clearance.',
      'Emergency services face critical delays due to inaccessible submerged routes.',
      '70% of urban commuters face acute route confusion during heavy rains.',
    ],
    keyStats: [
      { value: '70%', label: 'Route Confusion', desc: 'Urban commuters stranded without water depth clarity' },
      { value: '0', label: 'Flood Awareness in Legacy GPS', desc: 'Standard map apps route directly through subways' },
    ],
  },
  {
    id: 5,
    title: 'Real-World Impact',
    subtitle: 'The Human & Financial Cost of Flooded Commutes',
    category: 'Impact Assessment',
    bulletPoints: [
      '60% of vehicles damaged during waterlogging suffer electrical/engine hydrolock failure.',
      '3x higher accident risk on flooded roads due to invisible potholes and strong currents.',
      '45 min average delay caused by unknown blockages and gridlocked detours.',
    ],
    keyStats: [
      { value: '60%', label: 'Vehicles Damaged', desc: 'Engine hydrolock and electronic system failure' },
      { value: '3x', label: 'Accident Risk', desc: 'Hidden potholes and open drains beneath standing water' },
      { value: '45 min', label: 'Average Delay', desc: 'Commuters caught in unplanned dead-ends & gridlock' },
    ],
    quote: '"During monsoons, the biggest challenge isn\'t the rain — it\'s not knowing which road is safe."',
  },
  {
    id: 6,
    title: 'Our Solution: RainRoute',
    subtitle: 'Smart Navigation for Heavy Rainfall & Flooding',
    category: 'Product Solution',
    bulletPoints: [
      'RainRoute is a smart navigation app that helps commuters find safe routes during heavy rainfall and flooding.',
      'It combines real-time weather data with crowd-sourced reports to display flooded and blocked roads, and suggests the safest alternative routes.',
      'Our mission is to ensure no commuter is caught off-guard by unexpected waterlogging.',
      'Core Pillars: Safe Routes | Real-Time Data | Community Powered',
    ],
  },
  {
    id: 7,
    title: 'How RainRoute Works',
    subtitle: '4-Stage Continuous Real-Time Feedback Engine',
    category: 'System Architecture',
    bulletPoints: [
      '01 Detect: Weather API monitors real-time rainfall data',
      '02 Report: Users report flooded roads via the app',
      '03 Analyze: System processes data and maps safe routes',
      '04 Navigate: Users get safest route alternatives',
      'Note: All steps happen in real-time, providing instant route updates to users.',
    ],
    workflowSteps: [
      { step: '01', name: 'Detect', desc: 'Weather & radar telemetry ingests rain mm/hr and water-level alert triggers', icon: 'CloudRain' },
      { step: '02', name: 'Report', desc: 'Commuters submit 1-tap geo-tagged flood reports with depth and photo proof', icon: 'Users' },
      { step: '03', name: 'Analyze', desc: 'ML engine fuses elevation topography + sensor levels + verified reports', icon: 'Cpu' },
      { step: '04', name: 'Navigate', desc: 'Reroutes users through elevated bridges & high ground with turn guidance', icon: 'Navigation' },
    ],
  },
  {
    id: 8,
    title: 'Key Features',
    subtitle: 'Engineered for Commuter Survival & Resilience',
    category: 'Features Overview',
    bulletPoints: [
      'Flood Map: Live map showing flooded and blocked roads with water depth in cm.',
      'Safe Routes: AI-powered alternative route suggestions avoiding low basins.',
      'User Reports: Community-driven flood reporting system with spam filtering.',
      'Weather Alerts: Push notifications for incoming heavy rain & IMD warnings.',
      'Offline Mode: Access cached maps without internet during storm cell outages.',
      'Emergency SOS: Quick access to emergency helplines and high-ground shelters.',
    ],
  },
  {
    id: 9,
    title: 'Technology Stack',
    subtitle: 'Scalable, Resilient & Real-Time Engineering',
    category: 'Engineering Architecture',
    bulletPoints: [
      'Frontend: React Native, Flutter UI, Interactive Maps Engine',
      'Backend: Node.js, Express.js, REST APIs, WebSocket streaming',
      'Data & AI: Weather APIs, ML Route Optimization, Real-time Processing',
      'Database: MongoDB, Firebase, Redis In-Memory Cache for live pings',
    ],
    techGrid: [
      { category: 'Frontend', stack: 'React, Vite, Tailwind CSS, Lucide, Motion', desc: 'High-contrast responsive UI built for rapid decision making' },
      { category: 'Backend & APIs', stack: 'Node.js, Express.js, REST & Real-time WebSockets', desc: 'Geospatial query routing and alert dispatch pipeline' },
      { category: 'Data & Intelligence', stack: 'IMD API, OpenWeatherMap, ISRO Satellite, ML Route Optimizer', desc: 'Multi-source sensor fusion with road elevation modeling' },
      { category: 'Data Storage & Cache', stack: 'MongoDB, Firebase Firestore, Redis Geohash Index', desc: 'Sub-second caching for high-concurrency disaster surges' },
    ],
  },
  {
    id: 10,
    title: 'App Interface Concept',
    subtitle: 'Intuitive Design Focused on Quick Life-Saving Decisions',
    category: 'UI/UX Philosophy',
    bulletPoints: [
      'Live Flood Map: Color-coded danger zones (Crimson: Impassable, Amber: Moderate, Cyan: Safe).',
      'Turn-by-turn: Safe navigation with vehicle-specific clearance thresholds.',
      'User Flood Reports: Weather overlay with live precipitation cloud bands.',
      'Emergency Contacts: Direct single-touch helpline integration.',
      'Intuitive design focused on quick, life-saving decisions during emergencies.',
    ],
  },
  {
    id: 11,
    title: 'Weather Data Integration',
    subtitle: 'Authoritative Multi-Source Meteorological Fusion',
    category: 'Meteorological Pipeline',
    bulletPoints: [
      'Real-time rainfall data from IMD (India Meteorological Dept) & OpenWeatherMap.',
      'Satellite imagery for flood prediction and cloud convective velocity.',
      'Radar data for storm tracking and precipitation intensity.',
      'Historical data analysis for flood-prone zones and drainage choke points.',
      'Automated alerts when rain exceeds critical threshold levels (e.g. >30 mm/hr).',
      'Data Sources: IMD, OpenWeatherMap, ISRO Satellite Data.',
    ],
  },
  {
    id: 12,
    title: 'Community Reporting System',
    subtitle: 'Crowd-Sourced Intelligence Verified by AI',
    category: 'Crowd-Sourcing & Verification',
    bulletPoints: [
      'One-tap flood reporting with GPS location and water depth picker.',
      'Photo upload for visual verification by community members.',
      'Upvote/downvote system for report accuracy and crowdsourced trust score.',
      'Gamification with badges for active reporters (Monsoon Scout, Safety Sentinel).',
      'AI filters spam and verifies crowd-sourced data against nearby sensors.',
      'Anonymous reporting for user privacy.',
    ],
    quote: '"Every report makes the road safer for someone else"',
  },
  {
    id: 13,
    title: 'Benefits & Impact',
    subtitle: 'Value Creation for Citizens, Cities & Responders',
    category: 'Societal & Economic Impact',
    bulletPoints: [
      'Commuter Safety: Avoid dangerous flooded roads and reach destinations safely.',
      'Time Savings: Reduce delays by knowing blocked routes in advance.',
      'Vehicle Protection: Prevent engine damage and accidents from waterlogging.',
      'Emergency Access: Help emergency services reach those in need faster.',
      'City Resilience: Build data for better urban flood management planning.',
      'Community Bond: Foster a culture of mutual help among citizens.',
    ],
  },
  {
    id: 14,
    title: 'Future Scope',
    subtitle: 'Scaling RainRoute into Next-Gen Civic Infrastructure',
    category: 'Roadmap & Future Horizons',
    bulletPoints: [
      'IoT Sensors: Deploy ultrasonic water-level sensors at flood-prone intersections for real-time telemetry.',
      'Drone Surveillance: Use autonomous drones to assess flood severity and update maps automatically.',
      'Government Integration: Partner with municipal corporations and Smart Cities missions for official flood data sharing.',
      'Multi-language Support: Expand to regional languages (Tamil, Hindi, Telugu, Malayalam) for wider accessibility across India.',
      'Vehicle Integration: Connect directly with Android Auto and Apple CarPlay car infotainment systems.',
    ],
  },
  {
    id: 15,
    title: 'Thank You!',
    subtitle: 'RainRoute — Navigating Safety Through Innovation',
    category: 'Closing & Contact',
    bulletPoints: [
      'Thank You!',
      'RainRoute — Navigating Safety Through Innovation',
      'Team NEXUS: N. Magdalene Ashirvatham | A. Srini | P. Revathi | B. Benisha',
      'St. Mother Theresa Engineering College, Thoothukudi | Department of Computer Science & Engineering',
    ],
    quote: '"United by purpose, driven by innovation — Team NEXUS"',
  },
];
