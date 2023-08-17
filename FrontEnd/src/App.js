import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//view
import Home from './view/Home';
import SignUp from './view/signup';
import SignIn from './view/signin';
import Tournament from './view/Tournament';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TournamentDetails from "./view/TournamentDetails";


const theme = createTheme({
  typography: {
    fontFamily: 'Prompt', 
  },
});


//component

//admin

function App() {
  return (
    <BrowserRouter>

      <Routes>
        //view
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Tournament" element={<Tournament />} />
        <Route path="/TournamentDetails" element={<TournamentDetails />} />
        

        //componen
      
      </Routes>

    </BrowserRouter>

  );
}

export default App;
