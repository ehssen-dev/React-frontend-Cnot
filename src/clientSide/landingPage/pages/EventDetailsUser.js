// src/components/EventDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../../services/CommunicationInterne/EventService";
import TopNavbar from "../components/Nav/TopNavbar";

const eventImageUrls = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBemwHejuwp-isXJSWHBRm9DHOYdi2CGyxQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4lO9671E3Se-pFU1F3OMrHVCYvF2odsQ7g&s",
];

const gameImageUrls = [
  "https://cdn.futura-sciences.com/sources/images/Jeux_olympiques_1.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgJ3a9NYnPpKmhgyP7docaGJUDbA0CIw8dPbeVuhydV0-dI3JGVhnI1UJKfV9OPnbNvpE&usqp=CAU",
  "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_OlympicGamesTokyo2020TheOfficialVideoGame_frFR.jpg",
  "https://ygo-assets-websites-editorial-emea.yougov.net/images/olympic-games-6314253_1920_1.original.jpg",
];

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(eventId);
        setEvent(eventData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>No event found</div>;

  const eventImageUrl = eventImageUrls[eventId % eventImageUrls.length];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <TopNavbar />
      <br />
      <br />
      <br />

      {/* Event Image */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <img
          src={eventImageUrl}
          alt={event.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900">{event.name}</h1>
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

      {/* Games Section */}
      <h2 className="text-xl font-semibold text-gray-800 mt-6">Games</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {event.games.map((game, index) => {
          const gameImageUrl = gameImageUrls[index % gameImageUrls.length];

          return (
            <Link to={`/gamesUser/${game.gameId}`} key={game.gameId}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={gameImageUrl}
                  alt={game.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {game.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(game.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Location:</span>{" "}
                    {game.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Start:</span>{" "}
                    {new Date(game.startGame).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">End:</span>{" "}
                    {new Date(game.endGame).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mt-2">{game.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EventDetails;
