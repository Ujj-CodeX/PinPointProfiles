// ProfileCard.js
import React from 'react';

const ProfileCard = ({ profile, onViewMap, onViewDetails }) => (
  <div className="profile-card">
    <img src={profile.photo} alt={`${profile.name}'s avatar`} />
    <h3>{profile.name}</h3>
    <p>{profile.description}</p>
    <button onClick={() => onViewMap(profile)}>View on Map</button>
    <button onClick={() => onViewDetails(profile)}>View Details</button>
  </div>
);

export default ProfileCard;
