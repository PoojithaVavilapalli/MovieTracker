import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUp";
import ExplorePage from "./pages/Explore";
import GenrePage from "./pages/GenrePage";
import FavouritesPage from "./pages/Favourites";
import WatchlistPage from "./pages/WatchList";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar /> {/* Navbar always visible */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/genre/:genre" element={<GenrePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Routes>
    </div>
  );
}

export default App;
