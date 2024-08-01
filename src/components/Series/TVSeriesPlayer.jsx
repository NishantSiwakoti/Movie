import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TVSeriesPlayer = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSource, setVideoSource] = useState("VITE_LINK3");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setSeries(response.data);
        const savedSeasonNumber = localStorage.getItem(`season-${id}`);
        const savedEpisodeNumber = localStorage.getItem(`episode-${id}`);
        const defaultSeason = response.data.seasons.find(
          (season) => season.season_number !== 0
        );
        const season = savedSeasonNumber
          ? response.data.seasons.find(
              (season) => season.season_number === parseInt(savedSeasonNumber)
            )
          : defaultSeason;
        setSelectedSeason(season);
        setSelectedEpisode(
          season && savedEpisodeNumber
            ? { episode_number: parseInt(savedEpisodeNumber) }
            : null
        );
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  useEffect(() => {
    if (selectedSeason) {
      const fetchEpisodes = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason.season_number}`,
            {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
              },
            }
          );
          setEpisodes(response.data.episodes);
          if (!selectedEpisode) {
            setSelectedEpisode(response.data.episodes[0]); // Set default episode
          }
        } catch (error) {
          console.error("Error fetching episodes:", error);
        }
      };

      fetchEpisodes();
    }
  }, [selectedSeason, id]);

  useEffect(() => {
    if (selectedSeason) {
      localStorage.setItem(`season-${id}`, selectedSeason.season_number);
    }
    if (selectedEpisode) {
      localStorage.setItem(`episode-${id}`, selectedEpisode.episode_number);
    }
  }, [selectedSeason, selectedEpisode, id]);

  useEffect(() => {
    const savedVideoSource = localStorage.getItem(`videoSource-${id}`);
    if (savedVideoSource) {
      setVideoSource(savedVideoSource);
    }
  }, [id]);

  const handleSeasonChange = (e) => {
    const season = series.seasons.find(
      (season) => season.season_number === parseInt(e.target.value)
    );
    setSelectedSeason(season);
    setEpisodes([]);
    setSelectedEpisode(null);
  };

  const handleSourceChange = (source) => {
    setVideoSource(source);
    localStorage.setItem(`videoSource-${id}`, source);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-xl text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!series || !selectedEpisode) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-xl text-gray-300">
          Series or Episode not found.
        </div>
      </div>
    );
  }

  const videoSrc =
    videoSource === "VITE_LINK3"
      ? `${import.meta.env.VITE_LINK3.replace("{TMDB_ID}", id)
          .replace("{SEASON_NUMBER}", selectedSeason.season_number)
          .replace("{EPISODE_NUMBER}", selectedEpisode.episode_number)}`
      : `https://www.2embed.cc/embedtv/${id}?s=${selectedSeason.season_number}&e=${selectedEpisode.episode_number}`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{series.name}</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleSourceChange("VITE_LINK3")}
          className={`py-2 px-3 mx-2 rounded-lg ${
            videoSource === "VITE_LINK3"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          Link 1
        </button>
        <button
          onClick={() => handleSourceChange("2EMBED")}
          className={`py-2 px-3 mx-2 rounded-lg ${
            videoSource === "2EMBED"
              ? "bg-red-600 text-white"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          Link 2
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 md:pr-4">
          <iframe
            src={videoSrc}
            width="100%"
            height="600"
            title="Video Player"
            frameBorder="0"
            allowFullScreen
            className="mb-4 md:mb-0"
          ></iframe>
        </div>

        <div className="md:w-1/4">
          <div className="mb-4">
            <label className="block mb-2 text-white">Select Season:</label>
            <div className="relative">
              <select
                value={selectedSeason?.season_number || ""}
                onChange={handleSeasonChange}
                className="w-full p-2 mb-4 border border-gray-700 bg-red-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none hover:bg-red-700"
              >
                {series.seasons
                  .filter((season) => season.season_number !== 0)
                  .map((season) => (
                    <option
                      key={season.season_number}
                      value={season.season_number}
                    >
                      Season {season.season_number}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 max-h-64 rounded-xl overflow-y-auto scrollbar-custom">
            {episodes.map((episode) => (
              <div
                key={episode.episode_number}
                className={`p-2 border-b border-gray-700 ${
                  selectedEpisode?.episode_number === episode.episode_number
                    ? "bg-red-600 text-white"
                    : "bg-gray-800 text-gray-300"
                } cursor-pointer hover:bg-red-700`}
                onClick={() => setSelectedEpisode(episode)}
              >
                Episode {episode.episode_number}: {episode.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVSeriesPlayer;
