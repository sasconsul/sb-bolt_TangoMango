import React, { useEffect } from 'react';
import { X, Calendar, Clock, MapPin, DollarSign, Users } from 'lucide-react';
import { Event } from '../types';
import { areas } from '../data/sampleData';
import { format } from 'date-fns';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTabTrap = (e: KeyboardEvent) => {
      if (!isOpen || !event) return;

      const modal = document.getElementById('event-modal');
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabTrap);
      document.body.style.overflow = 'hidden';
      
      // Focus the close button when modal opens
      setTimeout(() => {
        const closeButton = document.getElementById('modal-close-button');
        if (closeButton) closeButton.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, event]);

  if (!isOpen || !event) return null;

  const area = areas.find(a => a.id === event.areaId);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        id="event-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{event.type.icon}</span>
              <div>
                <h2 id="modal-title" className="text-xl font-bold text-gray-900">
                  {event.title}
                </h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${event.type.color} mt-1`}>
                  {event.type.name}
                </span>
              </div>
            </div>
            <button
              id="modal-close-button"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <span className="font-medium">Date</span>
                  <p className="text-sm">{format(event.date, 'EEEE, MMMM d, yyyy')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <Clock className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <span className="font-medium">Time</span>
                  <p className="text-sm">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <span className="font-medium">Location</span>
                  <p className="text-sm">{event.venue}</p>
                  <p className="text-xs text-gray-500">{area?.name}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {event.price && (
                <div className="flex items-center space-x-3 text-gray-700">
                  <DollarSign className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Price</span>
                    <p className="text-sm">{event.price}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3 text-gray-700">
                <Users className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <span className="font-medium">Event Type</span>
                  <p className="text-sm">{event.type.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
            <div id="modal-description" className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
              
              {/* Additional event details based on type */}
              {event.type.id === 'workshop' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Workshop Details</h4>
                  <p className="text-blue-800 text-sm">
                    This hands-on workshop is perfect for dancers looking to improve their technique. 
                    Please wear comfortable dance shoes and bring a water bottle.
                  </p>
                </div>
              )}

              {event.type.id === 'milonga' && (
                <div className="mt-4 p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Milonga Information</h4>
                  <p className="text-red-800 text-sm">
                    Traditional social dancing with authentic Argentine tango music. 
                    All skill levels welcome. Light refreshments will be available.
                  </p>
                </div>
              )}

              {event.type.id === 'masterclass' && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Masterclass Requirements</h4>
                  <p className="text-purple-800 text-sm">
                    Advanced level class with visiting instructors. Previous tango experience recommended. 
                    Limited spots available - advance registration required.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                Register for Event
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                Add to Calendar
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Registration opens 2 weeks before the event date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;