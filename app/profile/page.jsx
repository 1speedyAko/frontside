'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { roboto } from "../_app";
import Spinner from "../spinner/page";
import { fetchUserDetails, fetchFreeOdds, fetchPremiumPicks } from '../services/page';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [todaysFreePicks, setTodaysFreePicks] = useState([]);
  const [premiumPicks, setPremiumPicks] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      // Redirect to login or handle unauthenticated state
      window.location.href = '/login';
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const userResponse = await fetchUserDetails(token);
        setUser(userResponse.data);
        setIsPremium(userResponse.data.is_premium);

        const freeOddsResponse = await fetchFreeOdds(token);
        setTodaysFreePicks(freeOddsResponse.data);

        if (userResponse.data.is_premium) {
          const premiumPicksResponse = await fetchPremiumPicks(token);
          setPremiumPicks(premiumPicksResponse.data);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        
        window.location.href = '/';  
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh')
    window.location.href = '/'
    
  };

  if (loading) {
    return <Spinner/>  
  }

  return (
    <div className={`${roboto.className} min-h-screen bg-ebony`}>
      <div className="rounded-lg p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold prime`}>Welcome, {user ? user.email : 'User'}!</h1>
          <button
            onClick={logout}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-600"
          >
            <span className="mr-2"><i className="fas fa-sign-out-alt"></i></span>
            Logout
          </button>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-center text-indigo-600">Free Odds</h2>
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
        <p className="secondary mt-5 ml-4"> For  best expirience, join  the premium club to get guaranteed 10+ odds  three times a week. </p>
        <h2 className="text-xl text-center mt-8 font-semibold primary">Today's Picks</h2>
        <div className="mt-5 relative ml-7">
          
          <div className={`w-90 bg-white border border-gray-200 mt-2 rounded-lg mx-4 ${!isPremium && 'filter blur-lg'}`}>
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
              <Link href="/pricing" legacyBehavior>
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
