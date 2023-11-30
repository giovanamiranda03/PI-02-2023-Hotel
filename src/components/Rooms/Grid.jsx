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

const ContainerIcon = styled.div`
  display: flex;
  gap: 15px;
`;

const Grid = ({ rooms, setRooms, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (numero) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/quartos/excluir.php`, {
        data: {
          numero: numero,
        }
      });
      const newRooms = rooms.filter((item) => item.numero_quarto !== numero);
      setRooms(newRooms)
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
    setOnEdit(null);

  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>N°Quarto</Th>
          <Th>Capacidade</Th>
          <Th>Diaria</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rooms.sort((a, b) => a.numero_quarto - b.numero_quarto).map((item, i) => (
          <Tr key={i}>
            <Td >{item.numero_quarto}</Td>
            <Td >{item.capacidade}</Td>
            <Td >R$ {item.valor_diaria}</Td>
            <Td alignCenter >
              <ContainerIcon>
                <FaEdit onClick={() => handleEdit(item)} />
                <FaTrash onClick={() => handleDelete(item.numero_quarto)} />
              </ContainerIcon>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
