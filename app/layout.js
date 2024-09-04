import React from 'react';
import './globals.css'

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="cryptomus" content="fea1d58b" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
