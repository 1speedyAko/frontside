'use client';

import React, { useEffect, useState } from "react";
import axios from 'axios';
import Spinner from "../spinner/page";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${API_URL}/games/announcement/`);
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
          <li key={announcement.id} className="mb-2">
            <h3 className="text-xl font-bold">{announcement.title}</h3>
            <p>{announcement.word}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
