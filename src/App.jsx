import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "1294937e46c8e67982b2448c40ef9a31";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const categories = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci‑Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
];

const decadeOptions = [
  { value: "1980s", label: "1980 à 1989", start: "1980-01-01", end: "1989-12-31" },
  { value: "1990s", label: "1990 à 1999", start: "1990-01-01", end: "1999-12-31" },
  { value: "2000s", label: "2000 à 2009", start: "2000-01-01", end: "2009-12-31" },
  { value: "2010s", label: "2010 à 2019", start: "2010-01-01", end: "2019-12-31" },
];

const demoMovies = [
  {
    id: 27205,
    title: "Inception",
    vote_average: 8.8,
    vote_count: 37000,
    popularity: 100,
    release_date: "2010-07-16",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    overview: "A skilled thief enters dreams to steal secrets and plant ideas.",
  },
  {
    id: 155,
    title: "The Dark Knight",
    vote_average: 9.0,
    vote_count: 33000,
    popularity: 95,
    release_date: "2008-07-18",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    overview: "Batman faces the Joker in Gotham City.",
  },
  {
    id: 157336,
    title: "Interstellar",
    vote_average: 8.7,
    vote_count: 36000,
    popularity: 90,
    release_date: "2014-11-07",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    overview: "Explorers travel through a wormhole to save humanity.",
  },
  {
    id: 98,
    title: "Gladiator",
    vote_average: 8.5,
    vote_count: 19000,
    popularity: 75,
    release_date: "2000-05-05",
    poster_path: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    overview: "A betrayed Roman general seeks revenge in the arena.",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    vote_average: 8.9,
    vote_count: 28000,
    popularity: 85,
    release_date: "1994-10-14",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    overview: "Connected crime stories unfold in Los Angeles.",
  },
  {
    id: 19995,
    title: "Avatar",
    vote_average: 7.9,
    vote_count: 32000,
    popularity: 80,
    release_date: "2009-12-18",
    poster_path: "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    overview: "A marine discovers Pandora and its native civilization.",
  },
];

const demoActors = [
  { id: 6193, name: "Leonardo DiCaprio" },
  { id: 3894, name: "Christian Bale" },
  { id: 10297, name: "Matthew McConaughey" },
  { id: 934, name: "Russell Crowe" },
  { id: 31, name: "Tom Hanks" },
  { id: 500, name: "Tom Cruise" },
];

const demoCredits = {
  directors: [{ id: 525, name: "Christopher Nolan", profile_path: null }],
  cast: [
    { id: 6193, name: "Leonardo DiCaprio", character: "Dom Cobb", profile_path: null },
    { id: 24045, name: "Joseph Gordon-Levitt", character: "Arthur", profile_path: null },
    { id: 27578, name: "Elliot Page", character: "Ariadne", profile_path: null },
  ],
};

function getPosterUrl(path, label = "No Poster") {
  return path
    ? `${IMAGE_URL}${path}`
    : `https://placehold.co/500x750?text=${encodeURIComponent(label)}`;
}

function getProfileUrl(path) {
  return path ? `${IMAGE_URL}${path}` : "https://placehold.co/300x450?text=No+Photo";
}

function uniqueById(items) {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id && !map.has(item.id)) {
      map.set(item.id, item);
    }
  });
  return Array.from(map.values());
}

function getDecadeRange(value) {
  return decadeOptions.find((option) => option.value === value) || null;
}

function MovieCard({ movie, onClick, variant = "default" }) {
  const cardClass =
    variant === "netflix"
      ? "bg-gradient-to-b from-red-950 to-slate-950 border-red-900"
      : variant === "ai"
        ? "bg-gradient-to-b from-slate-800 to-slate-950 border-slate-700"
        : "bg-slate-900 border-slate-800";

  return (
    <button
      type="button"
      onClick={() => onClick(movie)}
      className={`${cardClass} text-left rounded-2xl border overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
    >
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title || "Movie poster"}
        className="w-full h-64 md:h-72 object-cover"
      />
      <div className="p-3">
        <p className="font-medium text-sm line-clamp-1 text-white">{movie.title || "Untitled"}</p>
        <p className="text-xs text-slate-400 mt-1">
          {movie.release_date?.slice(0, 4) || "Année inconnue"} • ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
        </p>
      </div>
    </button>
  );
}

function SectionMenu() {
  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav className="sticky top-0 z-40 mb-8 -mx-4 md:mx-0 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => scrollToSection("all-movies-section")}
          className="px-4 py-2 rounded-xl bg-white text-slate-950 text-sm font-bold hover:scale-105 transition-transform"
        >
          Tous les Films
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("ai-recommendations-section")}
          className="px-4 py-2 rounded-xl bg-slate-800 text-white text-sm font-bold hover:bg-slate-700 transition-colors"
        >
          Recommandations IA
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("best-movies-section")}
          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-sm font-bold hover:bg-amber-400 transition-colors"
        >
          Meilleurs Films
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("netflix-section")}
          className="px-4 py-2 rounded-xl bg-red-950 text-red-100 text-sm font-bold hover:bg-red-900 transition-colors"
        >
          Netflix
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("french-movies-section")}
          className="px-4 py-2 rounded-xl bg-blue-900 text-blue-100 text-sm font-bold hover:bg-blue-800 transition-colors"
        >
          Films Français
        </button>
      </div>
    </nav>
  );
}

function Pagination({ currentPage, totalPages, isLoading, onPrevious, onNext }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 mb-12">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1 || isLoading}
        className="px-5 py-3 bg-slate-800 text-white rounded-2xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
      >
        Page précédente
      </button>

      <span className="text-slate-300">
        Page {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages || isLoading}
        className="px-5 py-3 bg-white text-black rounded-2xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
      >
        Page suivante
      </button>
    </div>
  );
}

function runSmallTests() {
  console.assert(uniqueById([{ id: 1 }, { id: 1 }, { id: 2 }]).length === 2, "uniqueById removes duplicates");
  console.assert(getPosterUrl("/abc.jpg").includes("/abc.jpg"), "getPosterUrl uses TMDb image path");
  console.assert(getPosterUrl(null).includes("placehold.co"), "getPosterUrl falls back to placeholder");
  console.assert(getDecadeRange("1980s")?.start === "1980-01-01", "getDecadeRange returns 1980s range");
  console.assert(getDecadeRange("unknown") === null, "getDecadeRange returns null for invalid decade");
}

export default function MovieDashboard() {
  const [movies, setMovies] = useState(demoMovies);
  const [actors, setActors] = useState(demoActors);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedActor, setSelectedActor] = useState("");
  const [selectedPersonName, setSelectedPersonName] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDecade, setSelectedDecade] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(demoMovies.length);
  const [isLoading, setIsLoading] = useState(false);
  const [movieCredits, setMovieCredits] = useState(demoCredits);
  const [isCreditsLoading, setIsCreditsLoading] = useState(false);
  const [isActorsLoading, setIsActorsLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [bestMovies, setBestMovies] = useState([]);
  const [isBestMoviesLoading, setIsBestMoviesLoading] = useState(false);
  const [bestMoviesPage, setBestMoviesPage] = useState(1);
  const [bestMoviesTotalPages, setBestMoviesTotalPages] = useState(1);
  const [netflixMovies, setNetflixMovies] = useState([]);
  const [isNetflixLoading, setIsNetflixLoading] = useState(false);
  const [frenchMovies, setFrenchMovies] = useState([]);
  const [isFrenchMoviesLoading, setIsFrenchMoviesLoading] = useState(false);
  const [frenchMoviesPage, setFrenchMoviesPage] = useState(1);
  const [frenchMoviesTotalPages, setFrenchMoviesTotalPages] = useState(1);
  const [shouldScrollTopAfterLoad, setShouldScrollTopAfterLoad] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: currentYear - 1980 + 1 }, (_, index) => currentYear - index),
    [currentYear]
  );

  const selectedActorName =
    selectedPersonName || actors.find((actor) => String(actor.id) === selectedActor)?.name;

  const selectedDecadeRange = getDecadeRange(selectedDecade);

  const aiTrendingPicks = useMemo(() => {
    return [...aiRecommendations]
      .filter((movie) => movie.poster_path)
      .sort((a, b) => {
        const scoreA =
          (a.vote_average || 0) * 0.45 +
          Math.log10((a.vote_count || 1) + 1) * 1.2 +
          Math.log10((a.popularity || 1) + 1) * 1.8;
        const scoreB =
          (b.vote_average || 0) * 0.45 +
          Math.log10((b.vote_count || 1) + 1) * 1.2 +
          Math.log10((b.popularity || 1) + 1) * 1.8;
        return scoreB - scoreA;
      })
      .slice(0, 20);
  }, [aiRecommendations]);

  async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDb request failed with status ${response.status}`);
    }
    return response.json();
  }

  async function fetchAiTrendingRecommendations() {
    try {
      setIsAiLoading(true);
      const [pageOne, pageTwo] = await Promise.all([
        fetchJson(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=1`),
        fetchJson(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=2`),
      ]);

      const mergedResults = uniqueById([...(pageOne.results || []), ...(pageTwo.results || [])]).filter(
        (movie) => movie.poster_path
      );

      setAiRecommendations(mergedResults.length ? mergedResults : demoMovies);
    } catch (error) {
      console.error("Failed loading AI trending recommendations", error);
      setAiRecommendations(demoMovies);
    } finally {
      setIsAiLoading(false);
    }
  }

  async function fetchBestMovies(page = 1) {
    try {
      setIsBestMoviesLoading(true);
      const [pageOne, pageTwo, pageThree] = await Promise.all([
        fetchJson(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`),
        fetchJson(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page + 1}`),
        fetchJson(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page + 2}`),
      ]);

      const mergedResults = uniqueById([
        ...(pageOne.results || []),
        ...(pageTwo.results || []),
        ...(pageThree.results || []),
      ]).filter((movie) => movie.poster_path);

      setBestMovies(mergedResults.slice(0, 60));
      setBestMoviesTotalPages(Math.min(pageOne.total_pages || 1, 500));
    } catch (error) {
      console.error("Failed loading best movies", error);
      setBestMovies(demoMovies);
      setBestMoviesTotalPages(1);
    } finally {
      setIsBestMoviesLoading(false);
    }
  }

  async function fetchFrenchMovies(page = 1) {
    try {
      setIsFrenchMoviesLoading(true);

      const [pageOne, pageTwo, pageThree] = await Promise.all([
        fetchJson(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=fr&sort_by=vote_average.desc&vote_count.gte=500&page=${page}`),
        fetchJson(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=fr&sort_by=vote_average.desc&vote_count.gte=500&page=${page + 1}`),
        fetchJson(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=fr&sort_by=vote_average.desc&vote_count.gte=500&page=${page + 2}`),
      ]);

      const mergedResults = uniqueById([
        ...(pageOne.results || []),
        ...(pageTwo.results || []),
        ...(pageThree.results || []),
      ]).filter((movie) => {
        const genres = movie.genre_ids || [];
        return (
          movie.poster_path &&
          !genres.includes(99) &&
          !genres.includes(10770) &&
          (movie.vote_average || 0) >= 7
        );
      });

      setFrenchMovies(mergedResults.slice(0, 60));
      setFrenchMoviesTotalPages(Math.min(pageOne.total_pages || 1, 500));
    } catch (error) {
      console.error("Failed loading French movies", error);
      setFrenchMovies([]);
      setFrenchMoviesTotalPages(1);
    } finally {
      setIsFrenchMoviesLoading(false);
    }
  }

  async function fetchNetflixNewMovies() {
    try {
      setIsNetflixLoading(true);
      const today = new Date().toISOString().slice(0, 10);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      const startDate = threeMonthsAgo.toISOString().slice(0, 10);

      const buildNetflixUrl = (pageNumber) =>
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_providers=8&watch_region=BE&primary_release_date.gte=${startDate}&primary_release_date.lte=${today}&sort_by=primary_release_date.desc&without_genres=99,10770&page=${pageNumber}`;

      const pages = await Promise.all([
        fetchJson(buildNetflixUrl(1)),
        fetchJson(buildNetflixUrl(2)),
        fetchJson(buildNetflixUrl(3)),
      ]);

      const mergedResults = uniqueById(pages.flatMap((page) => page.results || [])).filter((movie) => {
        const genres = movie.genre_ids || [];
        return movie.poster_path && !genres.includes(99) && !genres.includes(10770);
      });

      setNetflixMovies(mergedResults.slice(0, 60));
    } catch (error) {
      console.error("Failed loading Netflix new movies", error);
      setNetflixMovies([]);
    } finally {
      setIsNetflixLoading(false);
    }
  }

  async function fetchActorsFromMovies(movieList) {
    if (!Array.isArray(movieList) || movieList.length === 0) {
      setActors(demoActors);
      return;
    }

    try {
      setIsActorsLoading(true);
      const movieIds = movieList.slice(0, 12).map((movie) => movie.id).filter(Boolean);

      const creditsResponses = await Promise.all(
        movieIds.map(async (id) => {
          try {
            return await fetchJson(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
          } catch {
            return null;
          }
        })
      );

      const actorsList = creditsResponses.flatMap((credits) => credits?.cast?.slice(0, 10) || []);
      const uniqueActors = uniqueById(actorsList)
        .map((actor) => ({ id: actor.id, name: actor.name }))
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, 100);

      setActors(uniqueActors.length ? uniqueActors : demoActors);
    } catch (error) {
      console.error("Failed loading actors from current movie list", error);
      setActors(demoActors);
    } finally {
      setIsActorsLoading(false);
    }
  }

  async function fetchMovies(page = 1) {
    try {
      setIsLoading(true);

      const buildUrl = (pageNumber) => {
        let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${pageNumber}`;

        if (selectedDecadeRange) {
          url += `&primary_release_date.gte=${selectedDecadeRange.start}&primary_release_date.lte=${selectedDecadeRange.end}`;
        } else if (selectedYear) {
          url += `&primary_release_year=${selectedYear}`;
        } else {
          url += "&primary_release_date.gte=1980-01-01";
        }

        if (selectedCategory) {
          url += `&with_genres=${selectedCategory}`;
        }

        if (selectedActor) {
          url += `&with_cast=${selectedActor}`;
        }

        return url;
      };

      const pages = await Promise.all([
        fetchJson(buildUrl(page)),
        fetchJson(buildUrl(page + 1)),
        fetchJson(buildUrl(page + 2)),
      ]);

      const mergedResults = uniqueById(pages.flatMap((pageData) => pageData.results || []));

      setMovies(mergedResults.slice(0, 60));
      setTotalPages(Math.min(pages[0]?.total_pages || 1, 500));
      setTotalResults(pages[0]?.total_results || 0);
    } catch (error) {
      console.error("Failed loading movies", error);
      setMovies(demoMovies);
      setTotalPages(1);
      setTotalResults(demoMovies.length);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMovieCredits(movieId) {
    try {
      setIsCreditsLoading(true);
      setMovieCredits({ directors: [], cast: [] });

      const data = await fetchJson(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
      const directors = data.crew?.filter((person) => person.job === "Director") || [];
      const cast = data.cast?.slice(0, 50) || [];

      setMovieCredits({ directors, cast });
    } catch (error) {
      console.error("Failed loading movie credits", error);
      setMovieCredits(demoCredits);
    } finally {
      setIsCreditsLoading(false);
    }
  }

  async function openMovieDetails(movie) {
    setSelectedMovie(movie);
    await fetchMovieCredits(movie.id);
  }

  function showPersonMovies(person) {
    setSelectedActor(String(person.id));
    setSelectedPersonName(person.name);
    setSelectedMovie(null);
    setSelectedCategory(null);
    setCurrentPage(1);
  }

  function clearPersonFilter() {
    setSelectedActor("");
    setSelectedPersonName("");
    setCurrentPage(1);
  }

  function handleActorSelection(actorId) {
    setSelectedActor(actorId);
    const actor = actors.find((item) => String(item.id) === String(actorId));
    setSelectedPersonName(actor?.name || "");
  }

  function handleYearSelection(year) {
    setSelectedYear(year);
    if (year) {
      setSelectedDecade("");
    }
    setCurrentPage(1);
  }

  function handleDecadeSelection(decade) {
    setSelectedDecade(decade);
    if (decade) {
      setSelectedYear("");
    }
    setCurrentPage(1);
  }

  function scrollToAbsoluteTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function scrollToPageTopAfterMoviesLoad() {
    scrollToAbsoluteTop();
    setShouldScrollTopAfterLoad(true);
  }

  function goToPreviousPage() {
    scrollToPageTopAfterMoviesLoad();
    setCurrentPage((page) => Math.max(page - 1, 1));
  }

  function goToNextPage() {
    scrollToPageTopAfterMoviesLoad();
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }

  function goToPreviousBestMoviesPage() {
    const nextPage = Math.max(bestMoviesPage - 3, 1);
    setBestMoviesPage(nextPage);
    fetchBestMovies(nextPage);
    const target = document.getElementById("best-movies-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function goToNextBestMoviesPage() {
    const nextPage = Math.min(bestMoviesPage + 3, bestMoviesTotalPages);
    setBestMoviesPage(nextPage);
    fetchBestMovies(nextPage);
    const target = document.getElementById("best-movies-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function goToPreviousFrenchMoviesPage() {
    const nextPage = Math.max(frenchMoviesPage - 3, 1);
    setFrenchMoviesPage(nextPage);
    fetchFrenchMovies(nextPage);
    const target = document.getElementById("french-movies-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function goToNextFrenchMoviesPage() {
    const nextPage = Math.min(frenchMoviesPage + 3, frenchMoviesTotalPages);
    setFrenchMoviesPage(nextPage);
    fetchFrenchMovies(nextPage);
    const target = document.getElementById("french-movies-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  useEffect(() => {
    runSmallTests();
    fetchAiTrendingRecommendations();
    fetchBestMovies(bestMoviesPage);
    fetchNetflixNewMovies();
    fetchFrenchMovies(frenchMoviesPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedActor, selectedDecade, selectedYear]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [selectedCategory, selectedActor, selectedDecade, selectedYear, currentPage]);

  useEffect(() => {
    if (!isLoading && shouldScrollTopAfterLoad) {
      window.requestAnimationFrame(() => {
        scrollToAbsoluteTop();
        setTimeout(scrollToAbsoluteTop, 50);
        setTimeout(scrollToAbsoluteTop, 250);
        setShouldScrollTopAfterLoad(false);
      });
    }
  }, [isLoading, shouldScrollTopAfterLoad, movies]);

  useEffect(() => {
    fetchActorsFromMovies(movies);
  }, [movies]);

  const allMoviesTitle = selectedActorName
    ? `Films avec ${selectedActorName}`
    : selectedDecadeRange
      ? `Films de ${selectedDecadeRange.label}`
      : selectedYear
        ? `Films de ${selectedYear}`
        : "Tous les Films";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-2">
            <span>🎬</span> Movie Dashboard
          </h1>
          <p className="text-slate-400 mb-8">
            Base de données complète de films de 1980 à aujourd’hui avec recommandations intelligentes.
          </p>
        </motion.div>

        <SectionMenu />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <select
            value={selectedYear}
            onChange={(event) => handleYearSelection(event.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >
            <option value="">Toutes les années</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedDecade}
            onChange={(event) => handleDecadeSelection(event.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >
            <option value="">Décennies</option>
            {decadeOptions.map((decade) => (
              <option key={decade.value} value={decade.value}>
                {decade.label}
              </option>
            ))}
          </select>

          <select
            value={selectedActor}
            onChange={(event) => handleActorSelection(event.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
          >
            <option value="">{isActorsLoading ? "Chargement des acteurs..." : "Acteurs des films affichés"}</option>
            {actors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition ${
              !selectedCategory ? "bg-white text-slate-950" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            Toutes catégories
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3 py-1.5 text-sm font-semibold transition ${
                selectedCategory === cat.id
                  ? "bg-white text-slate-950"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div id="all-movies-section" className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 scroll-mt-24">
          <div>
            <h2 className="text-2xl font-semibold">{allMoviesTitle}</h2>
            <p className="text-sm text-slate-400">
              {totalResults.toLocaleString()} films trouvés dans TMDb • Page {currentPage} / {totalPages}
            </p>
            {selectedActorName && (
              <button
                type="button"
                onClick={clearPersonFilter}
                className="mt-3 px-4 py-2 bg-slate-800 text-white rounded-xl text-sm hover:bg-slate-700 transition-colors"
              >
                Effacer le filtre personne
              </button>
            )}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />

        {isLoading && <p className="text-center text-slate-400 my-8">Chargement des films...</p>}

        {!isLoading && movies.length === 0 && (
          <p className="text-center text-slate-400 my-8">Aucun film trouvé pour ces filtres.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {!isLoading &&
            movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={openMovieDetails} />
            ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />

        <section id="ai-recommendations-section" className="mb-14 mt-14 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <span>🤖</span> Recommandations IA
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Suggestions basées sur les tendances TMDb de la semaine, la popularité et les notes du public.
              </p>
            </div>
          </div>

          {isAiLoading ? (
            <p className="text-slate-400">Chargement des recommandations IA...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
              {aiTrendingPicks.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={openMovieDetails} variant="ai" />
              ))}
            </div>
          )}
        </section>

        <section id="best-movies-section" className="mb-14 mt-14 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <span>🏆</span> Meilleurs Films
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Les meilleurs films du classement de tous les temps selon TMDb • Page {bestMoviesPage} / {bestMoviesTotalPages}
              </p>
            </div>
          </div>

          {isBestMoviesLoading ? (
            <p className="text-slate-400">Chargement des meilleurs films...</p>
          ) : bestMovies.length ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
                {bestMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={openMovieDetails} />
                ))}
              </div>

              <Pagination
                currentPage={bestMoviesPage}
                totalPages={bestMoviesTotalPages}
                isLoading={isBestMoviesLoading}
                onPrevious={goToPreviousBestMoviesPage}
                onNext={goToNextBestMoviesPage}
              />
            </>
          ) : (
            <p className="text-slate-400">Aucun meilleur film trouvé.</p>
          )}
        </section>

        <section id="netflix-section" className="mb-14 mt-14 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <span>🍿</span> Nouveautés Films NETFLIX
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Uniquement les nouveautés films Netflix récentes disponibles en Belgique
              </p>
            </div>
          </div>

          {isNetflixLoading ? (
            <p className="text-slate-400">Chargement des films Netflix...</p>
          ) : netflixMovies.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
              {netflixMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onClick={openMovieDetails} variant="netflix" />
              ))}
            </div>
          ) : (
            <p className="text-slate-400">Aucun film Netflix trouvé.</p>
          )}
        </section>

        <section id="french-movies-section" className="mb-14 mt-14 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <span>🇫🇷</span> Films Français
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Les meilleurs films francophones du classement TMDb de tous les temps • Page {frenchMoviesPage} / {frenchMoviesTotalPages}
              </p>
            </div>
          </div>

          {isFrenchMoviesLoading ? (
            <p className="text-slate-400">Chargement des films français...</p>
          ) : frenchMovies.length ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
                {frenchMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={openMovieDetails} />
                ))}
              </div>

              <Pagination
                currentPage={frenchMoviesPage}
                totalPages={frenchMoviesTotalPages}
                isLoading={isFrenchMoviesLoading}
                onPrevious={goToPreviousFrenchMoviesPage}
                onNext={goToNextFrenchMoviesPage}
              />
            </>
          ) : (
            <p className="text-slate-400">Aucun film français trouvé.</p>
          )}
        </section>

        {selectedMovie && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedMovie(null)}
          >
            <div
              className="bg-slate-900 rounded-2xl max-w-3xl w-full overflow-hidden relative max-h-[92vh] overflow-y-auto"
              onClick={(event) => event.stopPropagation()}
              style={{ scrollbarWidth: "thin", scrollbarColor: "#475569 transparent" }}
            >
              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 text-white text-2xl flex items-center justify-center hover:bg-black transition-colors backdrop-blur-sm"
                aria-label="Fermer les détails du film"
              >
                ×
              </button>

              <img
                src={getPosterUrl(selectedMovie.poster_path)}
                alt={selectedMovie.title || "Affiche du film"}
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-2">{selectedMovie.title}</h2>
                <p className="text-slate-400 mb-4">
                  Sortie : {selectedMovie.release_date || "Inconnue"}
                </p>
                <p className="mb-4">⭐ Note : {selectedMovie.vote_average?.toFixed(1) || "N/A"}</p>
                <p className="text-slate-300 mb-6">
                  {selectedMovie.overview || "Aucun synopsis disponible pour ce film."}
                </p>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Réalisateur</h3>
                  {isCreditsLoading ? (
                    <p className="text-slate-400">Chargement du réalisateur...</p>
                  ) : movieCredits.directors?.length ? (
                    <div className="flex flex-wrap gap-4">
                      {movieCredits.directors.map((director) => (
                        <button
                          type="button"
                          key={director.id}
                          onClick={() => showPersonMovies(director)}
                          className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 cursor-pointer hover:bg-slate-700 transition-colors text-left"
                          title={`Voir tous les films de ${director.name}`}
                        >
                          <img
                            src={getProfileUrl(director.profile_path)}
                            alt={director.name}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <span className="font-medium">{director.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">Aucune information sur le réalisateur.</p>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Casting</h3>
                  {isCreditsLoading ? (
                    <p className="text-slate-400">Chargement du casting...</p>
                  ) : movieCredits.cast?.length ? (
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-h-96 overflow-y-auto pr-2"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#475569 transparent",
                        background: "linear-gradient(to bottom, rgba(15,23,42,0.18), rgba(15,23,42,0))",
                        borderRadius: "1rem",
                        padding: "0.25rem",
                      }}
                    >
                      {movieCredits.cast.map((actor) => (
                        <button
                          type="button"
                          key={actor.cast_id || actor.credit_id || actor.id}
                          onClick={() => showPersonMovies(actor)}
                          className="bg-slate-800 rounded-xl overflow-hidden cursor-pointer hover:bg-slate-700 transition-colors text-left"
                          title={`Voir tous les films avec ${actor.name}`}
                        >
                          <img
                            src={getProfileUrl(actor.profile_path)}
                            alt={actor.name}
                            className="w-full h-40 object-cover"
                          />
                          <div className="p-3">
                            <p className="text-sm font-semibold line-clamp-1">{actor.name}</p>
                            <p className="text-xs text-slate-400 line-clamp-2">
                              {actor.character || "Rôle inconnu"}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">Aucune information sur le casting.</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMovie(null)}
                  className="mt-6 px-4 py-2 bg-white text-black rounded-xl"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
