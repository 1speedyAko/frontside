'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "@/app/spinner/page";
import { roboto } from "@/app/_app";
import { fetchUserDetails, fetchPremiumPicks } from '../../services/page'

const Premium = () => {
  const [user, setUser] = useState(null);
  const [premiumPicks, setPremiumPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');
    
    if (!token) {
      // Comment out the redirect to login for development
      // window.location.href = '/login';
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const userResponse = await fetchUserDetails(token);
        setUser(userResponse.data);

        const premiumPicksResponse = await fetchPremiumPicks(token);
        console.log("Premium Picks Response:", premiumPicksResponse.data); 
        setPremiumPicks(premiumPicksResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        
        // Comment out the redirect on error for development
        // window.location.href = '/';  
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  if (loading) {
    return <Spinner/>  
  }

  return (
    <div className={`${roboto.className} min-h-screen bg-ebony`}>
      <div className="rounded-lg p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold prime`}>Hello, {user ? user.email : 'User'}!</h1>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-center text-indigo-600">Premium Picks</h2>
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
              {premiumPicks.map((game, index) => (
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
    </div>
  );
};

export default Premium;
