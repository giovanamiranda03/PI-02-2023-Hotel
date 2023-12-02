import axios from "axios";
import React from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  background-color: #16161A;  
  margin-top: 20px;
  border-radius: 5px;
  word-break: break-all;
`;

export const Thead = styled.thead`
  background-color: #f5d156;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  padding: 5px;
  color: #333;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const ContainerIcon = styled.div`
  display: flex;
  gap: 15px;
`;

const Active = styled.p`
  color: #008000;
`

const Finish = styled.p`
  color: #D42626;
`

const Grid = ({ reservations, setReservations, setOnEdit, getReservations }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/reservas/excluir.php`, { data: { id_reserva: id }, });
      const newReservations = reservations.filter((item) => item.id_reserva !== id);
      setReservations(newReservations);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOnEdit(null);
  };

  const handleFinalizarReserva = async (id_reserva) => {
    const data = new Date();

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');

    const dataFormatada = `${ano}-${mes}-${dia}`;
    console.log(dataFormatada);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/reservas/finalizar.php`, {
        id_reserva: id_reserva,
        data_saida: dataFormatada
      });
      toast.success(response.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }

    getReservations()
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Cliente</Th>
          <Th>N° Quarto</Th>
          <Th>Data entrada</Th>
          <Th>Data saida</Th>
          <Th>Forma de pagamento</Th>
          <Th>Status</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reservations.map((item, i) => (
          <Tr key={i}>
            <Td>{item.id_reserva}</Td>
            <Td>{item.nome_cliente}</Td>
            <Td>{item.numero_quarto}</Td>
            <Td>{item.data_entrada}</Td>
            <Td>{item.data_saida === "0000-00-00" ? "Nao definida" : item.data_saida}</Td>
            <Td>{item.forma_pagamento}</Td>
            <Td >{item.status ? <Active>Ativa</Active> : <Finish>Finalizada</Finish>}</Td>
            <Td alignCenter>
              <ContainerIcon>
                <FaEdit color="##1089E8" onClick={() => handleEdit(item)} />
                <FaTrash color="##D42626" onClick={() => handleDelete(item.id_cliente)} />
                <FaCheck onClick={() => handleFinalizarReserva(item.id_reserva)} />
              </ContainerIcon>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
