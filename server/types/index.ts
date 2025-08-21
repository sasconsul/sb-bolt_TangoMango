export interface Area {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  eventCount: number;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  venue: string;
  areaId: string;
  description: string;
  price?: string;
  type: EventType;
}

export interface EventType {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Registration {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  registeredAt: Date;
  status: 'confirmed' | 'cancelled' | 'waitlist';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}