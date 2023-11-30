import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Form from "../components/Reservations/Form";
import Grid from "../components/Reservations/Grid";

const Title = styled.div`
  padding: 10px;
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getReservations = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/reservas/listar.php`);
      setReservations(res.data.data.sort((a, b) => (a.id_reserva > b.id_reserva ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getReservations();
  }, [setReservations]);

  return (
    <>
      <Header />
      <Title>
        <h2>Reservas</h2>
      </Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getReservations={getReservations} />
      <Grid setOnEdit={setOnEdit} reservations={reservations} setReservations={setReservations} getReservations={getReservations} />
      <PageContainer>
        <Pagination />
      </PageContainer>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}