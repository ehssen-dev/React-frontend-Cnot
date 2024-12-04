// src/components/GameDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../AuthContext"; // Adjust import path
import {
  getGameById,
  addAthleteToGame,
  removeAthleteFromGame,
  gameHasEnded,
} from "../../../services/CommunicationInterne/GameService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faMedal,
  faStar,
  faClock,
  faCalendar,
  faCommentDots,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import TopNavbar from "../components/Nav/TopNavbar";

const gameImageUrls = [
  "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_OlympicGamesTokyo2020TheOfficialVideoGame_frFR.jpg",
];

const GameDetails = () => {
  const { gameId } = useParams();
  const { user, athleteId } = useAuth(); // Get user and athleteId from AuthContext
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [participationStatus, setParticipationStatus] = useState("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const gameData = await getGameById(gameId);
        setGame(gameData);

        const ended = await gameHasEnded(gameId);
        setHasEnded(ended);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleParticipate = async () => {
    if (!user || !athleteId) return; // Ensure user and athleteId are available

    try {
      await addAthleteToGame(gameId, athleteId); // Use athleteId from context
      setParticipationStatus("Athlete added to game successfully.");
      const updatedGame = await getGameById(gameId);
      setGame(updatedGame);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveParticipation = async () => {
    if (!user || !athleteId) return; // Ensure user and athleteId are available

    try {
      await removeAthleteFromGame(gameId, athleteId); // Use athleteId from context
      setParticipationStatus("Athlete removed from game successfully.");
      const updatedGame = await getGameById(gameId);
      setGame(updatedGame);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading)
    return <div className="text-center text-gray-600">Loading...</div>;
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;
  if (!game)
    return <div className="text-center text-gray-600">No game found</div>;

  const { result, athletes } = game;
  const gameImageUrl = gameImageUrls[gameId % gameImageUrls.length];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <TopNavbar />
      <br />
      <br />
      <br />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
        <img
          src={gameImageUrl}
          alt={game.name}
          className="w-full h-60 object-cover rounded-t-lg"
        />
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col items-start">
              <h1 className="text-3xl font-bold text-gray-900">{game.name}</h1>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-900 flex items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                {game.location}
              </p>
              <p className="text-gray-700 mt-4 text-center">
                {game.description}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-600 flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <span className="font-medium">Start:</span>{" "}
                {new Date(game.startGame).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <span className="font-medium">End:</span>{" "}
                {new Date(game.endGame).toLocaleDateString()}
              </p>
            </div>
          </div>
          {hasEnded ? (
            <p className="text-red-600 font-bold">The game has ended.</p>
          ) : (
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleParticipate}
                disabled={hasEnded}
              >
                Participate
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={handleRemoveParticipation}
                disabled={hasEnded}
              >
                Remove Participation
              </button>
            </div>
          )}
          {participationStatus && (
            <p className="text-green-600 mt-2">{participationStatus}</p>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                  Winner
                </h3>
                <p className="text-sm text-gray-600 mt-1">{result.winner}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faMedal} className="mr-2" />
                  Runner-Up
                </h3>
                <p className="text-sm text-gray-600 mt-1">{result.runnerUp}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  Third Place
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {result.thirdPlace}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faTrophy} className="mr-2" />
                  Scores
                </h3>
                <p className="text-sm text-gray-600 mt-1">{result.scores}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faStar} className="mr-2" />
                  Highlights
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {result.highlights}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  Status
                </h3>
                <p className="text-sm text-gray-600 mt-1">{result.status}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  Result Date
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(result.resultDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
                  Comments
                </h3>
                <p className="text-sm text-gray-600 mt-1">{result.comments}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {athletes && athletes.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Athletes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {athletes.map((athlete, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {athlete.firstName} {athlete.lastName}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-gray-800">Sport:</span>{" "}
                    {athlete.sport}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-gray-800">
                      Identifier:
                    </span>{" "}
                    {athlete.user.identifier} {/* Display athlete identifier */}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
