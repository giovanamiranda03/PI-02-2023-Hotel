import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Pagination from "../components/Pagination";
import Form from "../components/Rooms/Form";
import Grid from "../components/Rooms/Grid";

const Title = styled.h2``

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getRooms = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/quartos/listar.php`);
      setRooms(res.data.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, [setRooms]);

  return (
    <>
      <Title>Quartos</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getRooms={getRooms} />
      <Grid setOnEdit={setOnEdit} rooms={rooms} setRooms={setRooms} />
      <PageContainer>
        <Pagination />
      </PageContainer>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}