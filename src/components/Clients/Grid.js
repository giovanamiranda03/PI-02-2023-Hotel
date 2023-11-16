import axios from "axios";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  background-color: #16161A;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px; 
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

const Grid = ({ clients, setClients, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8080/hotel-api/clientes/excluir.php" + id)
      .then(({ data }) => {
        const newArray = clients.filter((user) => user.id !== id);

        setClients(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };


  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Fone</Th>
          <Th>CPF</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clients.map((item, i) => (
          <Tr key={i}>
            <Td>{item.nome}</Td>
            <Td>{item.email}</Td>
            <Td>{item.fone}</Td>
            <Td onlyWeb>{item.cpf}</Td>
            <Td alignCenter>
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
