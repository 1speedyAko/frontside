"use client";

import React from 'react';

import '../app/globals.css';

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </head>
      <body>
      
         
          {children}
        
      </body>
    </html>
  );
}

export default RootLayout;