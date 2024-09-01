// 'use client'
// import React, { useState } from "react"
// import axios from "axios"

// const API_URL = 'http://localhost:8000/api';

// const Announcement = () =>{

//     const[todaysAnnouncement, setTodaysAnnouncement] = useState([])
//     const fetchAnnouncement = async () => {
//         try{
//             const response = await axios.get(`${API_URL}/games/announcement/`, {
//                 headers : {Authorization: `Bearer ${token}`},
//             })
//             return response.data
//         }catch(error){
//             console.error('Error fetching announcements:', error)
//             throw error
//         }
//         }
//     const fetchData = async () =>{
//         const announcementResponse = await fetchAnnouncement();
//         setTodaysAnnouncement(announcementResponse)
//     }  
//     fetchData();
    
//         return (
//         <div>
//             <thead>
//                   <tr className="secondary">
//                     <th className="py-3 px-4 border-b rounded-tl-lg">Announcements</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//             {todaysAnnouncement.map((word, index) => (
//                 <tr key={index} className="secondary text-center">
//                   <td className="py-2 px-4 border-b">{word.title}</td>
//                   <td className="py-2 px-4 border-b">{word.word}</td>
//                 </tr>
//               ))}
//             </tbody>
//         </div>
//         )
//     }

// export default Announcement