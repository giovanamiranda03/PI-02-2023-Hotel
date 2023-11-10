import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Form from "../components/Reservations/Form";
import Grid from "../components/Reservations/Grid";

const Title = styled.h2``

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [clients, setClients] = useState([]);

  const getReservations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/reservas");
      setReservations(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  const getClients = async () => {
    try {
      const res = await axios.get("http://localhost:3000/clientes");
      setClients(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getReservations();
    getClients();
  }, [setReservations]);

  return (
    <>
      <Title>Reservas</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getReservations={getReservations} clients={clients} />
      <Grid setOnEdit={setOnEdit} reservations={reservations} setReservations={setReservations} />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}