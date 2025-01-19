import React, { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent"; // Assuming you have this component for the map

const Profile = () => {
  const [profiles, setProfiles] = useState([]); // State to hold the profiles
  const [selectedProfile, setSelectedProfile] = useState(null); // State to hold the selected profile's details
  const [showMap, setShowMap] = useState(false); // State to manage the map visibility

  // Fetch profiles from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profiles") // Adjust the URL if your server is running on another port
      .then((response) => {
        setProfiles(response.data); // Update state with profiles
      })
      .catch((error) => {
        console.error("Failed to fetch profiles:", error);
      });
  }, []);

  // Function to handle profile card click
  const handleProfileClick = (profile) => {
    setSelectedProfile(profile); // Set the selected profile's details
    setShowMap(true); // Show the map when a profile is clicked
  };

  return (
    <div className="container mt-4">
      {selectedProfile ? (
        // If profile is selected, show its details and map
        <>
          <h1 className="text-center mb-4">{selectedProfile.name}'s Profile</h1>
          <div className="card">
            <img
              src={selectedProfile.image || "/images/your-image.jpg"}
              className="card-img-top"
              alt={selectedProfile.name}
            />
            <div className="card-body">
              <h5 className="card-title">{selectedProfile.name}</h5>
              <p className="card-text">
                <strong>Email:</strong> {selectedProfile.email}
              </p>
              <p className="card-text">
                <strong>Location:</strong> {selectedProfile.location}
              </p>
              <p className="card-text">
                <strong>Bio:</strong> {selectedProfile.bio}
              </p>
            </div>
          </div>

          {showMap && (
            <>
              {/* Map to display the location */}
              <h3 className="mt-5">Location on Map</h3>
              <MapComponent
                latitude={selectedProfile.latitude}
                longitude={selectedProfile.longitude}
              />
            </>
          )}
        </>
      ) : (
        // If no profile is selected, show the list of profiles
        <>
          <h1 className="text-center mb-4">Profiles</h1>
          <div className="row">
            {profiles.map((profile) => (
              <div className="col-md-4 mb-4" key={profile.id}>
                <div
                  className="card h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProfileClick(profile)} // Navigate to profile detail
                >
                  <img
                    src={profile.image || "https://via.placeholder.com/150"}
                    className="card-img-top"
                    alt={profile.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{profile.name}</h5>
                    <p className="card-text">
                      <strong>Email:</strong> {profile.email}
                    </p>
                    <p className="card-text">
                      <strong>Location:</strong> {profile.location}
                    </p>
                    <p className="card-text">
                      <strong>Bio:</strong> {profile.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
