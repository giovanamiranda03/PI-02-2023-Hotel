import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Form from "../components/Rooms/Form";
import Grid from "../components/Rooms/Grid";

const Title = styled.h2``

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8080/hotel-api/quartos/listar.php");
      setRooms(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
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
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}