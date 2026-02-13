import "./App.css";

// Main App file with routing and Redux
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";

// Styles
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetails />} />

              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <a href="/">Go to Home</a>
                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
