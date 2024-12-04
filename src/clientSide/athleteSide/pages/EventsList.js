// src/components/EventsList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../../services/CommunicationInterne/EventService";

const imageUrls = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBemwHejuwp-isXJSWHBRm9DHOYdi2CGyxQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4lO9671E3Se-pFU1F3OMrHVCYvF2odsQ7g&s",
  // Add more image URLs as needed
];

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event, index) => {
          const imageUrl = imageUrls[index % imageUrls.length]; // Use images cyclically
          return (
            <Link to={`/members/events/${event.eventId}`} key={event.eventId}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={imageUrl} // Use the assigned image
                  alt={event.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {event.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(event.startEvent).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">End:</span>{" "}
                    {new Date(event.endEvent).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mt-2">{event.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EventsList;
