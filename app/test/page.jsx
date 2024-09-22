'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { roboto } from "../_app";
import Spinner from "../spinner/page";
import Nav from "../top/nav";
import Announcements from "../announcement/words";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [todaysFreePicks, setTodaysFreePicks] = useState([]);
  const [premiumPicks, setPremiumPicks] = useState([]);
  const [isPremium, setIsPremium] = useState(false); // For now, we'll hardcode this
  const [loading, setLoading] = useState(false); // No need for a spinner since no API calls

  // Hardcoded mock data for development purposes
  const mockFreePicks = [
    { match: "Team A vs Team B", time: "2024-09-15T14:30:00Z", pick: "Team A", odd: 1.75 },
    { match: "Team C vs Team D", time: "2024-09-16T16:00:00Z", pick: "Team D", odd: 2.10 },
  ];

  const mockPremiumPicks = [
    { match: "Team E vs Team F", time: "2024-09-17T18:45:00Z", pick: "Team E", odd: 2.50 },
    { match: "Team G vs Team H", time: "2024-09-18T19:30:00Z", pick: "Team G", odd: 1.95 },
  ];

  useEffect(() => {
    // Bypass authentication and subscription checks
    // For now, just set the mock data
    setUser({ name: "Test User", is_premium: true }); // Simulating a premium user
    setTodaysFreePicks(mockFreePicks);
    setPremiumPicks(mockPremiumPicks);
    setIsPremium(true); // Hardcode as premium
  }, []);

  const logout = () => {
    // Skip localStorage operations for now
    window.location.href = '/';
  };

  return (
    <div className={`${roboto.className}flex min-h-screen bg-ebony min-w-full w-auto`}>
      <Nav />

      <div className="rounded-lg p-8 max-w-4xl mx-auto">
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
