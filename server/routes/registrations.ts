import express from 'express';
import { registrations, events } from '../data/database';
import { Registration } from '../types';

export const registrationRoutes = express.Router();

// GET /api/registrations - Get all registrations
registrationRoutes.get('/', (req, res) => {
  try {
    const { eventId, email } = req.query;
    let filteredRegistrations = [...registrations];

    // Filter by event
    if (eventId && typeof eventId === 'string') {
      filteredRegistrations = filteredRegistrations.filter(reg => reg.eventId === eventId);
    }

    // Filter by email
    if (email && typeof email === 'string') {
      filteredRegistrations = filteredRegistrations.filter(reg => 
        reg.email.toLowerCase().includes(email.toLowerCase())
      );
    }

    res.json({
      success: true,
      data: filteredRegistrations,
      count: filteredRegistrations.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch registrations' });
  }
});

// GET /api/registrations/:id - Get single registration
registrationRoutes.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const registration = registrations.find(r => r.id === id);

    if (!registration) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    res.json({ success: true, data: registration });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch registration' });
  }
});

// POST /api/registrations - Create new registration
registrationRoutes.post('/', (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;

    // Validation
    if (!eventId || !name || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: eventId, name, email' 
      });
    }

    // Check if event exists
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }

    // Check if user is already registered for this event
    const existingRegistration = registrations.find(r => 
      r.eventId === eventId && r.email.toLowerCase() === email.toLowerCase()
    );

    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        error: 'User is already registered for this event' 
      });
    }

    const newRegistration: Registration = {
      id: `reg-${Date.now()}`,
      eventId,
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      registeredAt: new Date(),
      status: 'confirmed'
    };

    registrations.push(newRegistration);

    res.status(201).json({ success: true, data: newRegistration });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create registration' });
  }
});

// PUT /api/registrations/:id - Update registration
registrationRoutes.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const registrationIndex = registrations.findIndex(r => r.id === id);

    if (registrationIndex === -1) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    const { name, email, phone, status } = req.body;

    const updatedRegistration: Registration = {
      ...registrations[registrationIndex],
      name: name || registrations[registrationIndex].name,
      email: email ? email.toLowerCase() : registrations[registrationIndex].email,
      phone: phone !== undefined ? phone : registrations[registrationIndex].phone,
      status: status || registrations[registrationIndex].status
    };

    registrations[registrationIndex] = updatedRegistration;

    res.json({ success: true, data: updatedRegistration });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update registration' });
  }
});

// DELETE /api/registrations/:id - Cancel registration
registrationRoutes.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const registrationIndex = registrations.findIndex(r => r.id === id);

    if (registrationIndex === -1) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    const deletedRegistration = registrations.splice(registrationIndex, 1)[0];

    res.json({ success: true, data: deletedRegistration });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to cancel registration' });
  }
});

// GET /api/registrations/event/:eventId/count - Get registration count for event
registrationRoutes.get('/event/:eventId/count', (req, res) => {
  try {
    const { eventId } = req.params;
    const eventRegistrations = registrations.filter(r => r.eventId === eventId);

    res.json({
      success: true,
      data: {
        eventId,
        count: eventRegistrations.length,
        registrations: eventRegistrations
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch registration count' });
  }
});