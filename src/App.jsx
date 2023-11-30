import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Clients from './pages/Clients';
import Home from './pages/Home';
import Login from './pages/Login';
import Reservations from './pages/Reservations';
import Rooms from './pages/Rooms';
import GlobalStyle from "./styles/global";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export default function App() {
  return (
    <>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Container>
      <GlobalStyle />
    </>
  );
}
