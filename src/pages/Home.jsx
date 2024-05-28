import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosIndresptor";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function userAccess() {
      const response = await api.get("/users");
      console.log(response, "data fetched");
    }
    userAccess();
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const response = await api.post("/users/logout", null, {
        headers: {
          refreshToken: refreshToken,
        },
      });
      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
      console.log(response);
    } catch (error) {
      console.log(error, "logout error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold">Welcome to Our Website!</h1>
        <p className="text-gray-700">Please login or register to continue.</p>
        <div className="flex justify-around mt-4">
          <span
            onClick={() => navigate("/")}
            className="text-indigo-600 hover:underline"
          >
            Login
          </span>
          <span
            onClick={handleLogout}
            className="text-indigo-600 hover:underline"
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
