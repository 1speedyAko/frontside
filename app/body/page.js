'use client'

import React from "react"
import Button from '@mui/material/Button';
import { createTheme,ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
      primary: {
        main: '#FFD700', // Gold color
      },
    },
  });

const Body =()=>{
    return(
        <div className="w-full">
            <div className="grid grid-cols-2 gap-20">
               <div>
                <p> lorep adsjfhkasnckanslclkasnfackfasdasncxdlknsadn <br/>uiasgdasdhasodklasndkalsdns
                </p>
               </div>
               <div>
                <ThemeProvider theme={theme}>
                    <Button variant="contained" disableElevation color="primary">
                        Get Started
                    </Button>
                </ThemeProvider>
               </div>
            </div>
           
        </div>
    )
}

export default Body