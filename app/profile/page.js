'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [previousGames, setPreviousGames] = useState([]);
  const [todaysPicks, setTodaysPicks] = useState([]);
  const [isPremium, setIsPremium] = useState(false); // Assume this is determined by user data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
          return;
        }

        const userResponse = await axios.get('http://localhost:8000/auth/users/me/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(userResponse.data);

        // Check if the user is premium
        setIsPremium(userResponse.data.isPremium);

        // Fetch previous games and today's picks data from your React admin
        const previousGamesResponse = await axios.get('http://localhost:8000/api/previous-games/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPreviousGames(previousGamesResponse.data);

        const todaysPicksResponse = await axios.get('http://localhost:8000/api/todays-picks/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTodaysPicks(todaysPicksResponse.data);
      } catch (error) {
        console.error("Error fetching user data or tables data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://th.bing.com/th/id/R.21f1a301c64fa08c773ba79e9dbfb24e?rik=apQpyOLEIExj%2bw&riu=http%3a%2f%2fgamification-research.org%2fwp-content%2fuploads%2f2017%2f11%2fVirtual-Money-768x432.jpg&ehk=FCl0kDQAWkOdqaDmwDqyVv8B0doW2LjaHFRTPSX5x8M%3d&risl=&pid=ImgRaw&r=0')`,
      }}
    >
      <div className="bg-white bg-opacity-75 rounded-lg p-8">
        <h1 className="text-2xl font-bold">Welcome, {user ? user.email : 'User'}!</h1>
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Previous Games</h2>
          <table className="min-w-full bg-white border border-gray-200 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Game</th>
                <th className="py-2 px-4 border-b">Score</th>
              </tr>
            </thead>
            <tbody>
              {previousGames.map((game, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{game.date}</td>
                  <td className="py-2 px-4 border-b">{game.name}</td>
                  <td className="py-2 px-4 border-b">{game.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 relative">
          <h2 className="text-xl font-semibold">Today's Picks</h2>
          <div className={`min-w-full bg-white border border-gray-200 mt-2 ${!isPremium && 'filter blur-sm'}`}>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Pick</th>
                  <th className="py-2 px-4 border-b">Details</th>
                </tr>
              </thead>
              <tbody>
                {todaysPicks.map((pick, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{pick.name}</td>
                    <td className="py-2 px-4 border-b">{pick.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isPremium && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75">
              <Link href="/go-premium" legacyBehavior>
                <a className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-yellow-600">
                  <span className="mr-2"><i className="fas fa-crown"></i></span>
                  Go Premium
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
