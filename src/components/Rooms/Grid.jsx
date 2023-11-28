import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
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

const Grid = ({ rooms, setRooms, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
    .delete(`${process.env.API_URL}/quartos/excluir.php`, {
      id
    })
      .then(({ data }) => {
        const newArray = rooms.filter((user) => user.id !== id);

        setRooms(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>N°Quarto</Th>
          <Th>Capacidade</Th>
          <Th>Preço</Th>
          <Th>Disponível</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rooms.map((item, i) => (
          <Tr key={i}>
            <Td >{item.id}</Td>
            <Td >{item.capacidade}</Td>
            <Td >{item.preco}</Td>
            <Td >{item.disponivel ? "Sim" : "Não"}</Td>
            <Td alignCenter >
              <FaEdit onClick={() => handleEdit(item)} />
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
