import { Area, Event, EventType } from '../types';

export const eventTypes: EventType[] = [
  {
    id: 'milonga',
    name: 'Milonga',
    color: 'bg-red-600',
    icon: '💃'
  },
  {
    id: 'workshop',
    name: 'Workshop',
    color: 'bg-blue-600',
    icon: '🎓'
  },
  {
    id: 'masterclass',
    name: 'Masterclass',
    color: 'bg-purple-600',
    icon: '⭐'
  },
  {
    id: 'social',
    name: 'Social Dance',
    color: 'bg-green-600',
    icon: '🎉'
  },
  {
    id: 'performance',
    name: 'Performance',
    color: 'bg-orange-600',
    icon: '🎭'
  },
  {
    id: 'festival',
    name: 'Festival',
    color: 'bg-pink-600',
    icon: '🎪'
  }
];

export const areas: Area[] = [
  {
    id: 'downtown',
    name: 'Downtown District',
    description: 'Historic venues in the heart of the city with classic ballrooms and intimate studios.',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventCount: 12
  },
  {
    id: 'riverside',
    name: 'Riverside Quarter',
    description: 'Scenic waterfront locations with stunning views and modern dance facilities.',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventCount: 8
  },
  {
    id: 'arts-district',
    name: 'Arts District',
    description: 'Creative spaces in galleries and cultural centers with unique atmospheres.',
    imageUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventCount: 15
  },
  {
    id: 'uptown',
    name: 'Uptown Village',
    description: 'Cozy neighborhood venues perfect for social dancing and community events.',
    imageUrl: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventCount: 9
  },
  {
    id: 'suburbs',
    name: 'Suburban Studios',
    description: 'Spacious dance studios and community centers in peaceful suburban settings.',
    imageUrl: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventCount: 6
  },
  {
    id: 'historic',
    name: 'Historic Quarter',
    description: 'Elegant heritage venues with traditional architecture and timeless charm.',
    imageUrl: 'https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?auto=compress&cs=tinysrgb&w=800',
    eventCount: 10
  }
];

export const events: Event[] = [
  // Downtown District Events
  {
    id: '1',
    title: 'Argentine Tango Masterclass',
    date: new Date(2025, 0, 15),
    time: '7:00 PM',
    venue: 'Grand Ballroom',
    areaId: 'downtown',
    description: 'Join us for an exclusive masterclass with renowned Argentine tango maestros Carlos and Maria Fernandez. This intensive session will focus on advanced techniques including complex sacadas, boleos, and intricate footwork patterns. The elegant Grand Ballroom provides the perfect atmosphere for this sophisticated learning experience.',
    price: '$25',
    type: eventTypes[2] // masterclass
  },
  {
    id: '2',
    title: 'Milonga La Noche',
    date: new Date(2025, 0, 18),
    time: '8:30 PM',
    venue: 'Crystal Dance Hall',
    areaId: 'downtown',
    description: 'Experience the magic of authentic Argentine tango at our weekly milonga. Tonight features the acclaimed Orquesta Típica Buenos Aires, performing classic tangos, valses, and milongas. The Crystal Dance Hall\'s sprung wooden floors and intimate lighting create the perfect ambiance for social dancing.',
    price: '$15',
    type: eventTypes[0] // milonga
  },
  {
    id: '3',
    title: 'Beginner Tango Workshop',
    date: new Date(2025, 0, 22),
    time: '6:00 PM',
    venue: 'Studio Central',
    areaId: 'downtown',
    description: 'New to tango? This comprehensive workshop covers all the fundamentals you need to start your tango journey. Learn basic posture, embrace, walking, and simple figures in a supportive, encouraging environment. No partner or experience necessary - we\'ll rotate partners throughout the class.',
    price: '$20',
    type: eventTypes[1] // workshop
  },

  // Riverside Quarter Events
  {
    id: '4',
    title: 'Sunset Tango by the River',
    date: new Date(2025, 0, 16),
    time: '6:30 PM',
    venue: 'Riverside Pavilion',
    areaId: 'riverside',
    description: 'Dance under the open sky as the sun sets over the river in this magical outdoor milonga. The Riverside Pavilion offers stunning water views and a romantic atmosphere perfect for tango. Weather permitting - indoor backup venue available.',
    price: '$18',
    type: eventTypes[3] // social
  },
  {
    id: '5',
    title: 'Outdoor Milonga',
    date: new Date(2025, 0, 25),
    time: '7:00 PM',
    venue: 'Waterfront Gardens',
    areaId: 'riverside',
    description: 'Join us for a enchanting evening of tango under the stars in the beautiful Waterfront Gardens. This free community event welcomes dancers of all levels. Bring a blanket for seating and enjoy complimentary refreshments while listening to classic tango music.',
    price: 'Free',
    type: eventTypes[0] // milonga
  },

  // Arts District Events
  {
    id: '6',
    title: 'Tango & Wine Evening',
    date: new Date(2025, 0, 14),
    time: '7:30 PM',
    venue: 'Gallery Moderne',
    areaId: 'arts-district',
    description: 'An sophisticated cultural evening combining three passions: art, wine, and tango. Begin with a guided tour of our current exhibition, followed by Argentine wine tasting, and conclude with social dancing. A perfect blend of culture and elegance.',
    price: '$30',
    type: eventTypes[3] // social
  },
  {
    id: '7',
    title: 'Contemporary Tango Fusion',
    date: new Date(2025, 0, 21),
    time: '8:00 PM',
    venue: 'Creative Space Studio',
    areaId: 'arts-district',
    description: 'Witness the evolution of tango in this innovative performance featuring contemporary choreography that honors traditional roots while exploring modern expression. Local dance company Tango Nuevo presents an evening of artistic interpretation and creative movement.',
    price: '$22',
    type: eventTypes[4] // performance
  },
  {
    id: '8',
    title: 'Cultural Center Milonga',
    date: new Date(2025, 0, 28),
    time: '7:45 PM',
    venue: 'Arts Cultural Center',
    areaId: 'arts-district',
    description: 'Our monthly community milonga brings together tango enthusiasts from across the city. The Arts Cultural Center provides an intimate setting with excellent acoustics and a welcoming atmosphere. Perfect for both seasoned dancers and curious newcomers.',
    price: '$12',
    type: eventTypes[0] // milonga
  },

  // Uptown Village Events
  {
    id: '9',
    title: 'Neighborhood Social Dance',
    date: new Date(2025, 0, 17),
    time: '7:00 PM',
    venue: 'Village Community Hall',
    areaId: 'uptown',
    description: 'A warm, welcoming neighborhood milonga where everyone knows your name. This friendly gathering is perfect for practicing your skills in a relaxed, supportive environment. Light snacks and coffee available throughout the evening.',
    price: '$10',
    type: eventTypes[3] // social
  },
  {
    id: '10',
    title: 'Tango Technique Class',
    date: new Date(2025, 0, 24),
    time: '6:30 PM',
    venue: 'Uptown Dance Studio',
    areaId: 'uptown',
    description: 'Refine your tango technique in this focused class emphasizing proper posture, balance, and connection. Suitable for intermediate dancers looking to improve their foundation and develop more sophisticated movement quality.',
    price: '$18',
    type: eventTypes[1] // workshop
  },

  // Suburban Studios Events
  {
    id: '11',
    title: 'Family Tango Workshop',
    date: new Date(2025, 0, 19),
    time: '4:00 PM',
    venue: 'Suburban Dance Center',
    areaId: 'suburbs',
    description: 'Bring the whole family for this special workshop designed for parents, children, and grandparents to learn tango together. Age-appropriate instruction ensures everyone can participate and enjoy this beautiful dance form as a family activity.',
    price: '$15',
    type: eventTypes[1] // workshop
  },
  {
    id: '12',
    title: 'Weekend Intensive',
    date: new Date(2025, 0, 26),
    time: '10:00 AM',
    venue: 'Peaceful Studios',
    areaId: 'suburbs',
    description: 'Immerse yourself in tango with this comprehensive weekend intensive. Six hours of instruction covering technique, musicality, and social dancing skills. Includes lunch, practice sessions, and a mini-milonga to apply what you\'ve learned.',
    price: '$45',
    type: eventTypes[5] // festival
  },

  // Historic Quarter Events
  {
    id: '13',
    title: 'Vintage Tango Ball',
    date: new Date(2025, 0, 20),
    time: '8:00 PM',
    venue: 'Heritage Mansion',
    areaId: 'historic',
    description: 'Step back in time at our annual Vintage Tango Ball in the magnificent Heritage Mansion. Period costumes encouraged but not required. Live orchestra, champagne reception, and dancing in the grand ballroom create an unforgettable evening of elegance.',
    price: '$35',
    type: eventTypes[5] // festival
  },
  {
    id: '14',
    title: 'Traditional Milonga',
    date: new Date(2025, 0, 27),
    time: '7:30 PM',
    venue: 'Historic Opera House',
    areaId: 'historic',
    description: 'Experience tango in its most traditional form at the beautifully restored Historic Opera House. This classic milonga features authentic Argentine music, traditional codes, and the grandeur of a bygone era. A truly special evening for tango purists.',
    price: '$20',
    type: eventTypes[0] // milonga
  }
];