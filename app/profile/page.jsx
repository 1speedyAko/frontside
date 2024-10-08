'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { roboto } from "../_app";
import Spinner from "../spinner/page";
import Nav from "../top/nav";
import Announcements from "../announcement/words";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [todaysFreePicks, setTodaysFreePicks] = useState([]);
  const [premiumPicks, setPremiumPicks] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Access the API URL from environment variables
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/users/auth/users/me/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
      }
    };

    const fetchFreeOdds = async () => {
      try {
        const response = await axios.get(`${API_URL}/games/free-odds/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching free odds:', error);
        throw error;
      }
    };

    const fetchPremiumPicks = async () => {
      try {
        const response = await axios.get(`${API_URL}/games/premium-picks/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching premium picks:', error);
        throw error;
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);

        const userResponse = await fetchUserDetails();
        setUser(userResponse);
        setIsPremium(userResponse.is_premium);

        const freeOddsResponse = await fetchFreeOdds();
        setTodaysFreePicks(freeOddsResponse);

        if (userResponse.is_premium) {
          const premiumPicksResponse = await fetchPremiumPicks();
          setPremiumPicks(premiumPicksResponse);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        window.location.href = '/';  
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/';
  };

  if (loading) {
    return <Spinner/>  
  }

  return (
    <div className={`${roboto.className}flex min-h-screen bg-ebony min-w-full w-auto`}>
      {/* Include the Nav component */}
      <Nav />

      <div className="rounded-lg p-8 max-w-4xl mx-auto">
        {/* Profile Content */}
        <Announcements/>
        <div className="flex justify-between items-center">
          {/* Additional content can go here */}
        </div>

        {/* Free Odds Section */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-center text-indigo-600">Free Odds</h2>
          <div className="w-full">
          <table className="min-w-full rounded-lg border border-gray-200 mt-2 mx-4">
            <thead>
              <tr className="secondary">
                <th className="py-3 px-4 border-b rounded-tl-lg">Match</th>
                <th className="py-3 px-4 border-b">Time</th>
                <th className="py-3 px-4 border-b">Pick</th>
                <th className="py-3 px-4 border-b rounded-tr-lg">Odds</th>
              </tr>
            </thead>
            <tbody>
              {todaysFreePicks.map((game, index) => (
                <tr key={index} className="secondary text-center">
                  <td className="py-2 px-4 border-b">{game.match}</td>
                  <td className="py-2 px-4 border-b">{new Date(game.time).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{game.pick}</td>
                  <td className="py-2 px-4 border-b">{game.odd}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Premium Picks Section */}
        <p className="secondary mt-5 ml-4">For best experience, join the premium club to get guaranteed 10+ odds three times a week.</p>
        <h2 className="text-xl text-center mt-8 font-semibold primary">Today's Picks</h2>
        <div className="mt-5 relative ml-7">
          <div className={`w-90 bg-white border border-gray-200 mt-2 rounded-lg mx-4 ${!isPremium && 'filter blur-lg bg-white'}`}>
            <table className="min-w-full rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b rounded-tl-lg">Match</th>
                  <th className="py-3 px-4 border-b">Time</th>
                  <th className="py-3 px-4 border-b">Pick</th>
                  <th className="py-3 px-4 border-b rounded-tr-lg">Odds</th>
                </tr>
              </thead>
              <tbody>
                {premiumPicks.map((game, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{game.match}</td>
                    <td className="py-2 px-4 border-b">{new Date(game.time).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{game.pick}</td>
                    <td className="py-2 px-4 border-b">{game.odd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isPremium && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-75 rounded-lg">
              <Link href="/subscriptions" legacyBehavior>
                <a className="bg-yellow-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-yellow-600">
                  <span className="mr-2"><i className="fas fa-crown text-yellow-500"></i></span>
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
