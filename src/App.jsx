import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MovieState from "./context/MovieState";
import Navbar from "./components/Navbar";
import { useState, useEffect } from 'react';
import Book from "./components/Book";
import MovieDetails from "./components/MovieDetails";
import SeatSelection from "./components/SeatSelection";
import Admin from "./components/Admin";
function App() {
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {

    if (location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/searchMovies' ) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
  }, [location.pathname]);

  return (
    <>
      <MovieState>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/signUp" element={<SignUp />}></Route>
          <Route path="/movie/:id" element={<MovieDetails/>}></Route>
          <Route path="/book/:id" element={<Book/>} />
          <Route path="/seat-selection/:theaterName/:screenName/:showtime" element={<SeatSelection />} />

        </Routes>
      </MovieState>
    </>
  );
}

export default App;
