'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "../spinner/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access')
    if(!token){
      window.location.href='/login'
    }

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API_URL}/games/announcement/`,{
          headers:{Authorization:`Bearer ${token}`}
        });
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-center mb-4 primary">Announcements</h2>
      <ul className="list-disc list-inside">
  {announcements.map((announcement) => (
    <table key={announcement.id}>
      <thead>
        <tr>
          <th className="text-xl font-bold primary">{announcement.title}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-white">{announcement.word}</td>
        </tr>
      </tbody>
    </table>
  ))}
</ul>

    </div>
  );
};

export default Announcements;
