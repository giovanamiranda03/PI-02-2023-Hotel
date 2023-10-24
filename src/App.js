import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import React from 'react';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Rooms from './pages/Rooms';
import Reservations from './pages/Reservations';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </Router>
      </Container>
      <GlobalStyle />
    </>
  );
}
