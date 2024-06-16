import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MovieContext from "../context/movieContext";
import React from "react";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Movies: movies, GetAllMovies } = useContext(MovieContext);

  useEffect(() => {
    GetAllMovies();
  }, [GetAllMovies]);

  const [selectedDateIndex, setSelectedDateIndex] = useState(-1);
  const [selectedTheaterIndex, setSelectedTheaterIndex] = useState(-1);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(-1);
  const [selectedShowtimeIndex, setSelectedShowtimeIndex] = useState(-1);

  const [TName, setTName] = useState("");
  const [SName, setSName] = useState("");
  const [STime, setSTime] = useState("");

  const movie = movies.find((movie) => movie.id === parseInt(id));
  if (!movie) return <div className="text-white">Movie not found</div>;

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const day = daysOfWeek[date.getDay()];
      const dayNumber = date.getDate();
      const month = months[date.getMonth()];
      dates.push({ day, dayNumber, month, date });
    }
    return dates;
  };

  const dates = getDates();

  const handleDateChange = (index) => {
    setSelectedDateIndex(index);
    setSelectedTheaterIndex(-1);
    setSelectedScreenIndex(-1);
    setSelectedShowtimeIndex(-1);
  };

  return (
    <div className="book p-10">
      <h1 className="text-3xl font-bold text-white mb-6">Booking for {movie.title}</h1>
      <div className="book__genre-container">
        {movie.genre.map((genre, index) => (
          <div key={index} className="book__genre-box">
            {genre}
          </div>
        ))}
      </div>
      <div className="date-container">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date-item ${date.date.toDateString() === dates[selectedDateIndex]?.date.toDateString() ? "highlight" : ""}`}
            onClick={() => handleDateChange(index)}
          >
            <span className="day">{date.day}</span>
            <span className="day-number">{date.dayNumber}</span>
            <span className="month">{date.month.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {selectedDateIndex !== -1 && movie.theater && (
        <div className="mb-4 mt-3">
          <label className="text-gray-400 mb-2 mt-2 block">Select Theater:</label>
          <div className="flex space-x-2">
            {movie.theater.map((theater, index) => (
              <div
                key={index}
                className={`border rounded-md p-3 cursor-pointer transition duration-200 ease-in-out ${
                  selectedTheaterIndex === index ? "bg-blue-100 border-blue-400 shadow-lg" : "border-gray-300 text-white"
                }`}
                onClick={() => {
                  setSelectedTheaterIndex(index);
                  setTName(theater.name);
                  setSelectedScreenIndex(-1);
                  setSelectedShowtimeIndex(-1);
                }}
              >
                {theater.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTheaterIndex !== -1 && movie.theater[selectedTheaterIndex]?.showtimes && (
        <div className="mt-5">
          <label className="text-gray-400 mb-2 block">Select Screen:</label>
          <div className="flex space-x-2">
            {movie.theater[selectedTheaterIndex].showtimes.map((showtime, index) => (
              <div
                key={index}
                className={`border rounded-md p-3 cursor-pointer transition duration-200 ease-in-out ${
                  selectedScreenIndex === index ? "bg-blue-100 border-blue-400 shadow-lg" : "border-gray-300 text-black"
                }`}
                onClick={() => {
                  setSelectedScreenIndex(index);
                  setSName(showtime.screen);
                  setSelectedShowtimeIndex(-1);
                }}
              >
                {showtime.screen}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedScreenIndex !== -1 && movie.theater[selectedTheaterIndex]?.showtimes[selectedScreenIndex]?.times && (
        <div className="mt-5">
          <label className="text-gray-400 mb-2 block">Select Showtime:</label>
          <div className="flex space-x-2">
            {movie.theater[selectedTheaterIndex].showtimes[selectedScreenIndex].times.map((time, index) => {
              const showtimeDate = new Date(time);
              const isSameDate = showtimeDate.toDateString() === dates[selectedDateIndex].date.toDateString();
              if (!isSameDate) return null;
              return (
                <div
                  key={index}
                  className={`border rounded-md p-3 cursor-pointer transition duration-200 ease-in-out ${
                    selectedShowtimeIndex === index ? "bg-blue-100 border-blue-400 shadow-lg" : "border-gray-300 text-black"
                  }`}
                  onClick={() => {
                    setSelectedShowtimeIndex(index);
                    setSTime(time.slice(0, 5));
                  }}
                >
                  {time.slice(0, 5)}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedShowtimeIndex !== -1 && (
        <div className="mt-5">
          <button
            onClick={() =>
              navigate("/seatSelection", {
                state: { movie, theater: TName, screen: SName, showtime: STime },
              })
            }
            className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded"
          >
            Select Seats
          </button>
        </div>
      )}
    </div>
  );
};

export default Book;
