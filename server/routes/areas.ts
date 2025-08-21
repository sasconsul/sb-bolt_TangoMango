import express from 'express';
import { areas, events } from '../data/database';

export const areaRoutes = express.Router();

// GET /api/areas - Get all areas
areaRoutes.get('/', (req, res) => {
  try {
    // Calculate event count for each area
    const areasWithEventCount = areas.map(area => ({
      ...area,
      eventCount: events.filter(event => event.areaId === area.id).length
    }));

    res.json({
      success: true,
      data: areasWithEventCount,
      count: areasWithEventCount.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch areas' });
  }
});

// GET /api/areas/:id - Get single area
areaRoutes.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const area = areas.find(a => a.id === id);

    if (!area) {
      return res.status(404).json({ success: false, error: 'Area not found' });
    }

    // Calculate event count for this area
    const eventCount = events.filter(event => event.areaId === area.id).length;
    const areaWithEventCount = { ...area, eventCount };

    res.json({ success: true, data: areaWithEventCount });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch area' });
  }
});

// GET /api/areas/:id/events - Get all events for a specific area
areaRoutes.get('/:id/events', (req, res) => {
  try {
    const { id } = req.params;
    const area = areas.find(a => a.id === id);

    if (!area) {
      return res.status(404).json({ success: false, error: 'Area not found' });
    }

    const areaEvents = events.filter(event => event.areaId === id);

    res.json({
      success: true,
      data: {
        area,
        events: areaEvents,
        eventCount: areaEvents.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch area events' });
  }
});

// POST /api/areas - Create new area
areaRoutes.post('/', (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    // Validation
    if (!name || !description) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: name, description' 
      });
    }

    const newArea = {
      id: `area-${Date.now()}`,
      name,
      description,
      imageUrl: imageUrl || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
      eventCount: 0
    };

    areas.push(newArea);

    res.status(201).json({ success: true, data: newArea });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create area' });
  }
});

// PUT /api/areas/:id - Update area
areaRoutes.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const areaIndex = areas.findIndex(a => a.id === id);

    if (areaIndex === -1) {
      return res.status(404).json({ success: false, error: 'Area not found' });
    }

    const { name, description, imageUrl } = req.body;

    const updatedArea = {
      ...areas[areaIndex],
      name: name || areas[areaIndex].name,
      description: description || areas[areaIndex].description,
      imageUrl: imageUrl || areas[areaIndex].imageUrl
    };

    areas[areaIndex] = updatedArea;

    // Calculate current event count
    const eventCount = events.filter(event => event.areaId === id).length;
    const areaWithEventCount = { ...updatedArea, eventCount };

    res.json({ success: true, data: areaWithEventCount });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update area' });
  }
});

// DELETE /api/areas/:id - Delete area
areaRoutes.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const areaIndex = areas.findIndex(a => a.id === id);

    if (areaIndex === -1) {
      return res.status(404).json({ success: false, error: 'Area not found' });
    }

    // Check if area has events
    const areaEvents = events.filter(event => event.areaId === id);
    if (areaEvents.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: `Cannot delete area with ${areaEvents.length} existing events` 
      });
    }

    const deletedArea = areas.splice(areaIndex, 1)[0];

    res.json({ success: true, data: deletedArea });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete area' });
  }
});