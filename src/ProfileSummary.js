import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "./MapComponent";

const ProfileSummary = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const [profile, setProfile] = useState(null); // State to store profile data
  const [location, setLocation] = useState(null); // State to store the location

  // Fetch profile details based on the ID
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/profiles/${id}`) // Adjust the endpoint as needed
      .then((response) => {
        setProfile(response.data); // Set profile data
        // Convert location to lat/lng format
        if (response.data.location) {
          const [lat, lng] = response.data.location.split(",").map(Number); // Assuming location is "lat,lng"
          setLocation({ lat, lng });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
      });
  }, [id]);

  // Display a loading state while fetching data
  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Profile Summary</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{profile.name}</h5>
          <p className="card-text"><strong>Email:</strong> {profile.email}</p>
          <p className="card-text"><strong>Age:</strong> {profile.age}</p>
          <p className="card-text"><strong>Bio:</strong> {profile.bio}</p>
          <p className="card-text"><strong>Location:</strong> {profile.location}</p>
        </div>
      </div>

      <h3 className="mt-4">Location on Map</h3>
      <MapComponent location={location} /> {/* Pass location to MapComponent */}
    </div>
  );
};

export default ProfileSummary;
