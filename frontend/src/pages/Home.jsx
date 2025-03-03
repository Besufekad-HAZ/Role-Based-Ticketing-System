import React, { useEffect, useState } from "react";
import axios from "../services/api";
import Login from "./Login";
import Signup from "./Signup";

const Home = () => {
  const [hasUsers, setHasUsers] = useState(null);

  useEffect(() => {
    const checkUsers = async () => {
      try {
        // Assuming you have created a corresponding backend endpoint that returns:
        // { count: <number_of_users> }
        const response = await axios.get("/auth/users/count");
        setHasUsers(response.data.count > 0);
      } catch (error) {
        console.error("Error checking user count:", error);
        // Fallback: assume users exist
        setHasUsers(true);
      }
    };
    checkUsers();
  }, []);

  if (hasUsers === null) {
    return <div>Loading...</div>;
  }
  return hasUsers ? <Login /> : <Signup />;
};

export default Home;
