import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import Form from "../components/Clients/Form";
import Grid from "../components/Clients/Grid";
import Pagination from "../components/Pagination";

const Title = styled.h2``

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getClients = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clientes/listar.php`);
      setClients(res.data.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
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
      <PageContainer>
        <Pagination />
      </PageContainer>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  )
}