import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight, ArrowLeft, Calendar, MapPin, Clock, DollarSign } from 'lucide-react';
import { areas, events, eventTypes } from '../data/sampleData';
import { Event } from '../types';
import EventModal from './EventModal';

const CalendarPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const areaParam = searchParams.get('area');
    if (areaParam) {
      setSelectedAreas([areaParam]);
    }
  }, [searchParams]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const filteredEvents = events.filter(event => 
    selectedAreas.length === 0 || selectedAreas.includes(event.areaId)
  );

  const getEventsForDate = (date: Date): Event[] => {
    return filteredEvents.filter(event => isSameDay(event.date, date));
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  const toggleArea = (areaId: string) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Areas
              </Link>
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-red-600" />
                <h1 className="text-2xl font-bold text-gray-900">Event Calendar</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold text-gray-900 min-w-[140px] text-center">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Area Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Area</h3>
              <div className="space-y-3">
                {areas.map((area) => (
                  <label
                    key={area.id}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area.id)}
                      onChange={() => toggleArea(area.id)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                        {area.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {events.filter(e => e.areaId === area.id).length} events
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setSelectedAreas([])}
                className="mt-4 w-full text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Events on {format(selectedDate, 'MMM d, yyyy')}
                </h3>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => {
                      const area = areas.find(a => a.id === event.areaId);
                      return (
                        <div 
                          key={event.id} 
                          className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-red-300 hover:shadow-md transition-all duration-200"
                          onClick={() => handleEventClick(event)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleEventClick(event);
                            }
                          }}
                          aria-label={`View details for ${event.title}`}
                        >
                          <h4 className="font-semibold text-gray-900 mb-2 hover:text-red-600 transition-colors duration-200">
                            {event.title}
                          </h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {event.venue}, {area?.name}
                            </div>
                            {event.price && (
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-2" />
                                {event.price}
                              </div>
                            )}
                            <div className="flex items-center">
                              <span className="mr-2">{event.type.icon}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${event.type.color}`}>
                                {event.type.name}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{event.description}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No events scheduled for this date.</p>
                )}
              </div>
            )}
          </div>

          {/* Calendar Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-4 text-center">
                    <span className="text-sm font-semibold text-gray-700">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Body */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day) => {
                  const dayEvents = getEventsForDate(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isDateToday = isToday(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);

                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[160px] border-b border-r border-gray-200 p-2 cursor-pointer hover:bg-red-50 transition-colors duration-200 ${
                        !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                      } ${isSelected ? 'bg-red-100' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium ${
                            isDateToday
                              ? 'bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                              : isCurrentMonth
                              ? 'text-gray-900'
                              : 'text-gray-400'
                          }`}
                        >
                          {format(day, 'd')}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-[120px]">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs text-white px-1 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity duration-200 ${event.type.color} mb-1`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEventClick(event);
                              }
                            }}
                            aria-label={`View details for ${event.title}`}
                          >
                            <div className="flex items-center space-x-1">
                              <span className="text-xs flex-shrink-0">{event.type.icon}</span>
                              <span className="text-xs leading-tight break-words flex-1">
                                {event.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Event Type Legend */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
              <div className="grid grid-cols-2 gap-3">
                {eventTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <span className="text-lg">{type.icon}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${type.color}`}>
                      {type.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CalendarPage;