import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  background-color: #16161A;
  padding: 20px;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

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

const Grid = ({ reservations, setReservations, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:3000/reservas/" + id)
      .then(({ data }) => {
        const newArray = reservations.filter((user) => user.id !== id);

        setReservations(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };


  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome do cliente</Th>
          <Th>CPF do cliente</Th>
          <Th>Data da reserva</Th>
          <Th>Data de entrada</Th>
          <Th>Data da saida</Th>
          <Th>N°Quarto</Th>
          <Th>Valor</Th>
        </Tr>
      </Thead>
      <Tbody>
        {reservations.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.cliente}</Td>
            <Td width="20%">{item.cpf_cliente}</Td>
            <Td width="15%" onlyWeb>{item.data_reserva}</Td>
            <Td width="15%" onlyWeb>{item.data_entrada}</Td>
            <Td width="15%" onlyWeb>{item.data_saida}</Td>
            <Td width="10%" onlyWeb>{item.id_quarto}</Td>
            <Td width="10%" onlyWeb>{item.valor}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
