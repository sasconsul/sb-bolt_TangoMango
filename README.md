# TangoMango - Tango Events Calendar

A beautiful, responsive web application for discovering and managing tango events across different areas of the city.

## 🎭 Features

- **Interactive Calendar**: Monthly view with event filtering and detailed event information
- **Area-based Organization**: Events grouped by neighborhood/district
- **Event Types**: Support for milongas, workshops, masterclasses, performances, and more
- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Backend API**: Full REST API for managing events, areas, and registrations

## 🚀 Quick Start

### Frontend Development
```bash
npm install
npm run dev
```

### Backend Development
```bash
npm run dev:server
```

### Full Stack Development
```bash
npm run dev:full
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── HomePage.tsx     # Landing page with area selection
│   │   ├── CalendarPage.tsx # Main calendar interface
│   │   └── EventModal.tsx   # Event detail modal
│   ├── data/
│   │   └── sampleData.ts    # Sample events and areas data
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   └── main.tsx             # React app entry point
├── server/
│   ├── routes/              # API route handlers
│   │   ├── events.ts        # Events CRUD operations
│   │   ├── areas.ts         # Areas management
│   │   └── registrations.ts # Event registrations
│   ├── data/
│   │   └── database.ts      # In-memory database
│   ├── types/
│   │   └── index.ts         # Backend type definitions
│   └── index.ts             # Express server setup
└── package.json             # Dependencies and scripts
```

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Color-coded Events**: Different event types have distinct colors
- **Responsive Layout**: Optimized for all screen sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **Interactive Elements**: Hover effects and micro-interactions

## 🔧 API Endpoints

### Events
- `GET /api/events` - Get all events (with optional filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Areas
- `GET /api/areas` - Get all areas with event counts
- `GET /api/areas/:id` - Get single area
- `GET /api/areas/:id/events` - Get events for specific area
- `POST /api/areas` - Create new area

### Registrations
- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Register for an event
- `GET /api/registrations/event/:eventId/count` - Get registration count

## 🛠️ Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router
- **Backend**: Node.js, Express, TypeScript
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Development**: Vite, Concurrently

## 📱 Event Types

- 💃 **Milonga** - Social dancing events
- 🎓 **Workshop** - Learning sessions
- ⭐ **Masterclass** - Advanced instruction
- 🎉 **Social Dance** - Community events
- 🎭 **Performance** - Shows and exhibitions
- 🎪 **Festival** - Multi-day celebrations

## 🌍 Areas

The application organizes events across 6 distinct areas:
- Downtown District
- Riverside Quarter
- Arts District
- Uptown Village
- Suburban Studios
- Historic Quarter

## 🚀 Deployment

The project is configured for easy deployment to various platforms. The frontend builds to static files, and the backend can be deployed to any Node.js hosting service.

## 📄 License

This project is open source and available under the MIT License.