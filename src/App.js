import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Header from "./components/Header";
import Clients from './pages/Clients';
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Rooms from './pages/Rooms';
import GlobalStyle from "./styles/global";

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
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
