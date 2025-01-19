import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// UserContext Provider
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", location: "New York", bio: "Software Engineer" },
    { id: 2, name: "Jane Smith", location: "Los Angeles", bio: "Digital Marketer" },
    { id: 3, name: "Alice Johnson", location: "Chicago", bio: "UX Designer" },
  ]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
