import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "../components/Form";
import Grid from "../components/Grid";
import styled from "styled-components";

const Title = styled.h2``

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getClients = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setClients(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getClients();
  }, [setClients]);

  return (
    <>
    <Title>Clientes</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getClients={getClients} />
      <Grid setOnEdit={setOnEdit} clients={clients} setClients={setClients} />
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}