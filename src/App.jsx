import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from 'react-toastify';
import './App.css';
import About from './Components/About';
import Alert from './Components/Alert';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import NotesState from './context/notes/NoteState';
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useState } from "react";

function App() {


  return (
    <>
      <NotesState>
        <BrowserRouter>
          <Navbar />
          <Alert message="If any functionality is not working, please refresh the page once!!" />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<SignUp />} />
              {/* <Route exact path="/users" element={<Users />} /> */}
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
      </NotesState>
    </>
  )
}

export default App

