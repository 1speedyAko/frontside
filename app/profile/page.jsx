'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Spinner from "../spinner/page";
import { Roboto } from "@next/font/google";
import { roboto } from "../_app";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [previousGames, setPreviousGames] = useState([]);
  const [todaysPicks, setTodaysPicks] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

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

        setIsPremium(userResponse.data.isPremium);

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={`${roboto.className} min-h-screen bg-ebony`}
    >
      <div className="rounded-lg p-8 max-w-4xl mx-auto">
        <h1 className={`text-2xl font-bold prime`}>Welcome, {user ? user.email : 'User'}!</h1>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-center text-indigo-600">Previous Picks</h2>
          <table className="min-w-full rounded-lg border border-gray-200 mt-2 mx-4">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b rounded-tl-lg">Date</th>
                <th className="py-3 px-4 border-b">Game</th>
                <th className="py-3 px-4 border-b rounded-tr-lg">Score</th>
              </tr>
            </thead>
            <tbody>
              {previousGames.map((game, index) => (
                <tr key={index} className="text-grey-300">
                  <td className="py-2 px-4 border-b">{game.date}</td>
                  <td className="py-2 px-4 border-b">{game.name}</td>
                  <td className="py-2 px-4 border-b">{game.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 relative">
          <h2 className="text-xl font-semibold">Today's Picks</h2>
          <div className={`w-90 bg-white border border-gray-200 mt-2 rounded-lg mx-4 ${!isPremium && 'filter blur-sm'}`}>
            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b rounded-tl-lg">Pick</th>
                  <th className="py-2 px-4 border-b rounded-tr-lg">Details</th>
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
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 rounded-lg">
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
