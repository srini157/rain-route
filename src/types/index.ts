export type VehicleType = 'two_wheeler' | 'hatchback' | 'suv' | 'commercial';

export interface VehicleConfig {
  id: VehicleType;
  label: string;
  name: string;
  maxWaterDepthCm: number; // Maximum safe water level in cm
  icon: string;
  description: string;
}

export type HazardSeverity = 'safe' | 'low' | 'moderate' | 'severe' | 'blocked';

export interface FloodZone {
  id: string;
  name: string;
  landmark: string;
  depthCm: number;
  severity: HazardSeverity;
  x: number; // map coordinates percentage
  y: number;
  waterFlowRate: 'still' | 'flowing' | 'rapid_current';
  reportedAt: string;
  verifiedCount: number;
  passableFor: VehicleType[];
  notes: string;
  photoUrl?: string;
}

export interface NavigationStep {
  id: string;
  instruction: string;
  subText: string;
  distanceMeters: number;
  roadElevation: 'elevated_flyover' | 'high_ground' | 'normal' | 'low_dip';
  floodWarning?: string;
  iconType: 'straight' | 'turn_left' | 'turn_right' | 'bridge' | 'warning' | 'destination';
}

export interface RouteOption {
  id: 'safe' | 'standard';
  title: string;
  tagline: string;
  distanceKm: number;
  durationMin: number;
  floodRiskLevel: 'safe' | 'moderate' | 'high_danger';
  waterObstaclesCount: number;
  maxWaterDepthCm: number;
  pathCoordinates: Array<{ x: number; y: number; elevation: number }>;
  steps: NavigationStep[];
  highlights: string[];
  color: string;
}

export interface CommunityReport {
  id: string;
  userName: string;
  badge: string;
  locationName: string;
  depthCm: number;
  severity: HazardSeverity;
  passableVehicle: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  verifiedByAI: boolean;
  notes: string;
  photoUrl?: string;
}

export interface WeatherTelemetry {
  rainfallMmHr: number;
  status: string;
  intensity: 'light' | 'moderate' | 'heavy' | 'torrential';
  windSpeedKmh: number;
  temperatureC: number;
  imdAlertLevel: 'Green' | 'Yellow' | 'Orange' | 'Red';
  alertTitle: string;
  alertSummary: string;
  hourlyForecast: Array<{ time: string; mm: number; risk: 'low' | 'moderate' | 'high' }>;
  satelliteTimestamp: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  department: string;
  number: string;
  category: 'disaster' | 'police' | 'medical' | 'fire' | 'rescue';
  availableHours: string;
}

export interface SafeShelter {
  id: string;
  name: string;
  address: string;
  capacity: number;
  currentOccupancy: number;
  elevationMeters: number;
  distanceKm: number;
  phone: string;
}

export interface SlideData {
  slideNumber: number;
  title: string;
  subtitle?: string;
  category: string;
  content: React.ReactNode;
}
