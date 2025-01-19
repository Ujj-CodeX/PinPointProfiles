import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import Router and Routes
import './App.css';
import Home from "./Home";
import Profiles from "./Profiles";
import ProfileSummary from "./ProfileSummary";
import { UserProvider } from "./UserContext"; // User context provider
import Admin from "./Admin";

function App() {
  return (
    <>
      {/* Wrap everything with UserProvider for context access */}
      <UserProvider>
        <Router>
          {/* Navbar */}
          <nav class="navbar bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">PinPointProfile</Link>
              <Link className="navbar-brand" to="/">Home</Link>
              <Link className="navbar-brand" to="/profiles">Profiles</Link>
              <Link className="navbar-brand" to="/admin">Admin</Link>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                       Home
                       </Link>

                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Application Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<ProfileSummary />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
