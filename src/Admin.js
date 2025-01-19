import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    bio: "",
    location: "",
    latitude: "", // Latitude input field
    longitude: "", // Longitude input field
  });

  const [profiles, setProfiles] = useState([]); // To store the fetched profiles

  // Fetch profiles on page load
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profiles")
      .then((response) => {
        setProfiles(response.data); // Store profiles in state
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle form submission to add or update a profile
  const handleSubmit = (e) => {
    e.preventDefault();

    // If profile has an ID, it's an update
    if (profile.id) {
      // Send profile data to update
      axios
        .put(`http://localhost:5000/api/profiles/${profile.id}`, profile)
        .then((response) => {
          alert("Profile updated successfully!");
          // Update the profile in the state
          setProfiles(
            profiles.map((p) =>
              p.id === profile.id ? { ...p, ...profile } : p
            )
          );
          // Reset the form
          setProfile({
            name: "",
            email: "",
            age: "",
            bio: "",
            location: "",
            latitude: "",
            longitude: "",
          });
        })
        .catch((error) => {
          console.error("Failed to update profile:", error);
          alert("Failed to update profile");
        });
    } else {
      // Send profile data to the backend to add a new profile
      axios
        .post("http://localhost:5000/api/profiles", profile)
        .then((response) => {
          alert("Profile added successfully!");
          setProfile({
            name: "",
            email: "",
            age: "",
            bio: "",
            location: "",
            latitude: "",
            longitude: "",
          });
          // Refresh the profiles list
          setProfiles([...profiles, { ...profile, id: response.data.id }]);
        })
        .catch((error) => {
          console.error("Failed to add profile:", error);
          alert("Failed to add profile");
        });
    }
  };

  // Handle editing a profile
  const handleEdit = (profileToEdit) => {
    setProfile(profileToEdit); // Populate the form with the profile data to edit
  };

  // Handle deleting a profile
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/profiles/${id}`)
      .then((response) => {
        alert("Profile deleted successfully!");
        // Remove the deleted profile from the state
        setProfiles(profiles.filter((profile) => profile.id !== id));
      })
      .catch((error) => {
        console.error("Failed to delete profile:", error);
        alert("Failed to delete profile");
      });
  };

  return (
    <div className="container mt-4">
      <h1>{profile.id ? "Edit Profile" : "Add New Profile"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={profile.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            className="form-control"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={profile.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="text"
            className="form-control"
            name="latitude"
            value={profile.latitude}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="text"
            className="form-control"
            name="longitude"
            value={profile.longitude}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {profile.id ? "Update Profile" : "Add Profile"}
        </button>
      </form>

      <h2 className="mt-5">Profile List</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Location</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>{profile.email}</td>
              <td>{profile.age}</td>
              <td>{profile.location}</td>
              <td>{profile.latitude}</td>
              <td>{profile.longitude}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(profile)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(profile.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
