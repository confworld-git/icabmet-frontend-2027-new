import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

const Protected = () => {
  const [isProtected, setIsProtected] = useState(null);

  useEffect(() => {
    const checkProtection = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/protected",
          {
            withCredentials: true,
          }
        );
        setIsProtected(res.status === 200);
      } catch (error) {
        console.error(error);
        setIsProtected(false);
      }
    };

    checkProtection();
  }, []);

  if (isProtected === null) return <div>Loading...</div>; // Optional: Show a loading state

  return isProtected ? <Outlet /> : <Navigate to="/" />;
};

export default Protected;
