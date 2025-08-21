import express from 'express';
import { events, eventTypes } from '../data/database';
import { Event } from '../types';

export const eventRoutes = express.Router();

// GET /api/events - Get all events with optional filtering
eventRoutes.get('/', (req, res) => {
  try {
    const { areaId, date, type } = req.query;
    let filteredEvents = [...events];

    // Filter by area
    if (areaId && typeof areaId === 'string') {
      filteredEvents = filteredEvents.filter(event => event.areaId === areaId);
    }

    // Filter by date (YYYY-MM-DD format)
    if (date && typeof date === 'string') {
      const filterDate = new Date(date);
      filteredEvents = filteredEvents.filter(event => 
        event.date.toDateString() === filterDate.toDateString()
      );
    }

    // Filter by event type
    if (type && typeof type === 'string') {
      filteredEvents = filteredEvents.filter(event => event.type.id === type);
    }

    res.json({
      success: true,
      data: filteredEvents,
      count: filteredEvents.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Get single event
eventRoutes.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const event = events.find(e => e.id === id);

    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch event' });
  }
});

// POST /api/events - Create new event
eventRoutes.post('/', (req, res) => {
  try {
    const { title, date, time, venue, areaId, description, price, typeId } = req.body;

    // Validation
    if (!title || !date || !time || !venue || !areaId || !typeId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: title, date, time, venue, areaId, typeId' 
      });
    }

    const eventType = eventTypes.find(t => t.id === typeId);
    if (!eventType) {
      return res.status(400).json({ success: false, error: 'Invalid event type' });
    }

    const newEvent: Event = {
      id: (events.length + 1).toString(),
      title,
      date: new Date(date),
      time,
      venue,
      areaId,
      description: description || '',
      price,
      type: eventType
    };

    events.push(newEvent);

    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create event' });
  }
});

// PUT /api/events/:id - Update event
eventRoutes.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const eventIndex = events.findIndex(e => e.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    const { title, date, time, venue, areaId, description, price, typeId } = req.body;
    const eventType = typeId ? eventTypes.find(t => t.id === typeId) : events[eventIndex].type;

    if (typeId && !eventType) {
      return res.status(400).json({ success: false, error: 'Invalid event type' });
    }

    const updatedEvent: Event = {
      ...events[eventIndex],
      title: title || events[eventIndex].title,
      date: date ? new Date(date) : events[eventIndex].date,
      time: time || events[eventIndex].time,
      venue: venue || events[eventIndex].venue,
      areaId: areaId || events[eventIndex].areaId,
      description: description !== undefined ? description : events[eventIndex].description,
      price: price !== undefined ? price : events[eventIndex].price,
      type: eventType || events[eventIndex].type
    };

    events[eventIndex] = updatedEvent;

    res.json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update event' });
  }
});

// DELETE /api/events/:id - Delete event
eventRoutes.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const eventIndex = events.findIndex(e => e.id === id);

    if (eventIndex === -1) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    const deletedEvent = events.splice(eventIndex, 1)[0];

    res.json({ success: true, data: deletedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete event' });
  }
});

// GET /api/events/types - Get all event types
eventRoutes.get('/types/all', (req, res) => {
  try {
    res.json({ success: true, data: eventTypes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch event types' });
  }
});