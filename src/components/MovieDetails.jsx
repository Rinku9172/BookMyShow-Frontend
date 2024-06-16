import PropTypes from "prop-types";
import {Link, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import MovieContext from "../context/movieContext";
import React from "react";

export default function MovieDetails() {
  const { id } = useParams();
  const { Movies: movies, GetAllMovies } = useContext(MovieContext);

  useEffect(() => {
    GetAllMovies();
  }, []);

  console.log(movies);
  const movie = movies.find((movie) => movie.id == parseInt(id));
  if (!movie) return <div>Movie not found</div>;

  const convertToHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <div className="bg-black text-white">
        <div className="flex items-center justify-center px-10 py-4">
          <div className="flex items-center">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-64 rounded-lg"
            />
            <div className="ml-8">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <div className="flex items-center mt-2">
                <StarIcon className="text-yellow-400 h-5 w-5" />
                <span className="ml-2">{movie.rating}/10</span>
              </div>
              <p className="mt-1">{movie.language}</p>
              <div className="flex items-center mt-2">
                <CalendarIcon className="h-5 w-5" />
                <span className="ml-2">
                  {convertToHoursAndMinutes(movie.duration)} -{" "}
                  {movie.genre.join(", ")} - UA -{" "}
                  {formatDate(movie.releaseDate)}
                </span>
              </div>
              <Link  to={`/book/${id}`}>
                <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Book tickets
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-4">
        <h2 className="text-xl items-center text-white font-bold mb-2">About the movie</h2>
        <p className=" text-white  mb-2">{movie.synopsis}</p>
      </div>

      {/* <div className="px-8 py-4">
        <h2 className="text-xl font-bold mb-4">Cast</h2>
        <div className="flex flex-wrap -mx-2 justify-center">
          <div className="w-1/6 px-2 mb-4 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/abhay-verma-2019096-1716289737.jpg"
                alt="Amar"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-2">
              <span className="block">Abhay Verma</span>
              <span className="text-gray-400">as Bittu</span>
            </div>
          </div>
          <div className="w-1/6 px-2 mb-4 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sharvari-wagh-2007921-1707291905.jpg"
                alt="Pandu"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-2">
              <span className="block">Sharvari Wagh</span>
              <span className="text-gray-400">as Bela</span>
            </div>
          </div>
          <div className="w-1/6 px-2 mb-4 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/mona-singh-21056-24-03-2017-12-41-22.jpg"
                alt="Ranga"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-2">
              <span className="block">Mona Singh</span>
              <span className="text-gray-400">as Pammi</span>
            </div>
          </div>
          <div className="w-1/6 px-2 mb-4 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sathyaraj-3835-23-08-2018-11-06-38.jpg"
                alt="Ranga"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-2">
              <span className="block">Sathyaraj</span>
              <span className="text-gray-400">as Padri</span>
            </div>
          </div>
          <div className="w-1/6 px-2 mb-4 flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <img
                src="https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/ajay-purkar-1043184-12-11-2020-02-56-23.jpg"
                alt="Ranga"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-2">
              <span className="block">Ajay Purkar</span>
              <span className="text-gray-400">as Balu Kaka</span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

MovieDetails.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
