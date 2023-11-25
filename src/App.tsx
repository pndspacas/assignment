import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import axios from 'axios';
import Table from './components/Table';
import Description from './components/Description';
import Footer from './components/Footer';
import FetchMovie from './components/FetchMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviesId, setMoviesId] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);
  const [clickedYear, setClickedYear] = useState(false);
  const [displayMovie, setDisplayMovie] = useState(true);
  const [error, setError] = useState(null);
  const totalItems = 1000;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${page}&size=${10}`
      );
      const newMovies = response.data.content;
      const moviesId = newMovies.map((movie) => movie.id);
      setMovies(newMovies);
      setOriginalMovies(newMovies);
      setMoviesId(moviesId);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchPage = async (pageNumber) => {
    try {
      const response = await axios.get(
        `http://movie-challenge-api-xpand.azurewebsites.net/api/movies?page=${pageNumber}&size=10`
      );
      const newMovies = response.data.content;
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setOriginalMovies((prevMovies) => [...prevMovies, ...newMovies]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMoreMovies = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPage(nextPage);
  };

  // const fetchMovieDetails = async (movieId: number) => {
  //   setShow(!show);
  //   try {
  //     const response = await axios.get(
  //       `http://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`
  //     );
  //     setMovieDetails(response.data);
  //   } catch (error) {
  //     console.error('Error fetching movie details:', error);
  //   }
  // };

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  const handleClick = async (movieId: number) => {
    setShow(!show);
    fetchMovieDetails(movieId);
  };

  const handleSortRevenue = () => {
    const sortedMovies = [...movies]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
    setMovies(sortedMovies);
  };

  const handleSortYearAndRevenue = (year: number) => {
    const filteredMovies = movies.filter((movie) => movie.year === year);

    const sortedMovies = [...filteredMovies]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    setMovies(sortedMovies);
  };

  const handleReset = () => {
    setMovies([...originalMovies]);
    setSelectedYear(null);
    setIsFocused(false);
    setClicked(false);
    setClickedYear(false);
    setDisplayMovie(true);
  };

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
    setIsFocused(false);
    setDisplayMovie(false);
    setSidebar(false);
  };

  const handleClicked = () => {
    if (!clicked) {
      setClicked(true);
      setIsFocused(false);
      setDisplayMovie(false);
      setSidebar(false);
    }
  };

  const handleClickedYear = () => {
    if (!clickedYear) {
      setClickedYear(true);
      setClicked(false);
      setSidebar(false);
    }
  };

  const handleClickClose = () => {
    setShow(!show);
  };

  const movieYears = movies
    .map((movie) => movie.year)
    .filter((year, index, years) => years.indexOf(year) === index)
    .sort((a, b) => b - a);

  const toggleSidebar = () => {
    setSidebar(sidebar);
    if (!sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const total = movies.length === totalItems;

  console.log(movies);
  return (
    <div className="app">
      <Header />
      <Filter
        handleSortRevenue={handleSortRevenue}
        handleSortYearAndRevenue={handleSortYearAndRevenue}
        handleReset={handleReset}
        isFocused={isFocused}
        selectedYear={selectedYear}
        handleFocus={handleFocus}
        handleYearSelection={handleYearSelection}
        handleClicked={handleClicked}
        handleClickedYear={handleClickedYear}
        clicked={clicked}
        clickedYear={clickedYear}
        movieYears={movieYears}
        toggleSidebar={toggleSidebar}
      />
      <Table
        movies={movies}
        error={error}
        handleClick={handleClick}
        toggleSidebar={toggleSidebar}
        loading={setLoading}
      />
      {displayMovie && <FetchMovie fetchMoreMovies={fetchMoreMovies} />}
      {show && (
        <Description
          handleClickClose={handleClickClose}
          movieDetails={movieDetails}
          toggleSidebar={toggleSidebar}
        />
      )}
      {total && <Footer scrollToTop={scrollToTop} />}
    </div>
  );
}

export default App;
