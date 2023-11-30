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

const Grid = ({ reservations, setReservations, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.API_URL}/reservas/excluir.php`, {
        id
      })
      .then(({ data }) => {
        const newArray = reservations.filter((user) => user.id !== id);

        setReservations(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const handleFinalizarReserva = (id_reserva) => {
    console.log(`Finalizando reserva com o ID: ${id_reserva}`);
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome do cliente</Th>
          <Th>Data de entrada</Th>
          <Th>Data da saída</Th>
          <Th>Número do Quarto</Th>
          <Th>Valor</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reservations.map((item, i) => (
          <Tr key={i}>
            <Td>{item.cliente}</Td>
            <Td onlyWeb>{item.data_entrada}</Td>
            <Td onlyWeb>{item.data_saida}</Td>
            <Td onlyWeb>{item.id_quarto}</Td>
            <Td onlyWeb>{item.valor}</Td>
            <Td alignCenter>
              <ContainerIcon>
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.id)} />
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
