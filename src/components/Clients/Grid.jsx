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

export const Tbody = styled.tbody`

`;

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
  gap: 20px;
`;

const Grid = ({ clients, setClients, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/clientes/excluir.php`, { data: { id_cliente: id }, });
      const newClients = clients.filter((item) => item.id_cliente !== id);
      setClients(newClients);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOnEdit(null);
  };


  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>CPF</Th>
          <Th>Telefone</Th>
          <Th>Hospedado</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {clients
          .sort((a, b) => a.id_cliente - b.id_cliente)
          .map((item, i) => (
            <Tr key={i}>
              <Td>{item.id_cliente}</Td>
              <Td>{item.nome}</Td>
              <Td>{item.email}</Td>
              <Td onlyWeb>{item.cpf}</Td>
              <Td onlyWeb>{item.telefone}</Td>
              <Td>{item.hospedado ? "Sim" : "Não"}</Td>
              <Td alignCenter>
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.id_cliente)} />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
