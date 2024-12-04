// Dashboard.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import CustomCard from "./CustomCard";
import CardSlider from "./CardSlider";
import { getAllEvents } from "../../../../services/CommunicationInterne/EventService";
import { getAllGames } from "../../../../services/CommunicationInterne/GameService";
import ResultService from "../../../../services/CommunicationInterne/ResultService";
import supportResponseService from "../../../../services/CommunicationInterne/SupportResponseService";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const imageUrls = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBemwHejuwp-isXJSWHBRm9DHOYdi2CGyxQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj4lO9671E3Se-pFU1F3OMrHVCYvF2odsQ7g&s",
  // Add more image URLs as needed
];

const DashboardC = () => {
  const [events, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);
  const [supportResponses, setSupportResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, gamesData, resultsData, supportResponsesData] =
          await Promise.all([
            getAllEvents(),
            getAllGames(),
            ResultService.getAllResults(),
            supportResponseService.getAllSupportResponses(),
          ]);

        setEvents(eventsData);
        setGames(gamesData);
        setResults(resultsData);
        setSupportResponses(supportResponsesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderCard = (item, index, linkPrefix, type) => {
    const imageUrl = imageUrls[index % imageUrls.length]; // Use images cyclically
    const link = `${linkPrefix}/${item.id}`;

    return (
      <Link to={link} key={item.id}>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer">
          <img
            src={imageUrl}
            alt={item.name || item.title || item.subject}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {item.name || item.title || item.subject}
            </h2>
            {type === "event" && (
              <>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Start:</span>{" "}
                  {new Date(item.startEvent).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">End:</span>{" "}
                  {new Date(item.endEvent).toLocaleDateString()}
                </p>
              </>
            )}
            <p className="text-gray-700 mt-2">
              {item.description || item.details || item.message}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Upcoming Events
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) =>
            renderCard(event, index, "/members/events", "event")
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Games</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) =>
            renderCard(game, index, "/members/games", "game")
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) =>
            renderCard(result, index, "/members/results", "result")
          )}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Support Responses
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {supportResponses.map((response, index) =>
            renderCard(
              response,
              index,
              "/members/support-response",
              "support-response"
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardC;
