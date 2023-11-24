import axios from 'axios';
import React, { ref, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 60px;
  row-gap: 20px;
  padding: 30px;
  background-color: #16161a;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px;

  @media (max-width: 600px) {
    flex-direction: column;
    column-gap: 20px;
  }
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1 0 2.5rem;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;

  ::placeholder {
    color: #ccc;
  }
`;

const Select = styled.select`
  flex: 1 0 2.5rem;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;
`;


const Label = styled.label``;

const Button = styled.button`
  flex: 1 0 2.5rem;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #f5d156;
  color: #16161a;
  font-weight: bold;

  a {
    text-decoration: none;
    color: #16161A;
  }

  &:hover {
    background-color: #F5D189;
  }
`;

const LabelButton = styled.label`
  color: #16161a;
`

const Form = ({ getReservations, clients, rooms, onEdit, setOnEdit }) => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [idQuarto, setIdQuarto] = useState("");
  const [valor, setValor] = useState("");

  const onClienteChange = (value) => {
    setSelectedCliente(value);
  };

  useEffect(() => {
    if (onEdit) {
      const cliente = clients.find((c) => c.cpf === onEdit.cpf_cliente);
      setSelectedCliente(cliente.id);
      setDataEntrada(onEdit.data_entrada);
      setDataSaida(onEdit.data_saida);
      setValor(onEdit.valor);
    }
  }, [onEdit, clients]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedCliente ||
      !valor ||
      !dataEntrada ||
      !dataSaida ||
      !idQuarto
    ) {
      return toast.warn('Preencha todos os campos!');
    }

    const cpf_cliente = clients.find((c) => c.id === selectedCliente)?.cpf;

    if (onEdit) {
      await axios
        .put(`http://localhost:3000/reservas/${onEdit.id}`, {
          cpf_cliente,
          data_entrada: dataEntrada,
          data_saida: dataSaida,
          id_quarto: idQuarto,
          valor: valor,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:3000/reservas', {
          cpf_cliente,
          data_entrada: dataEntrada,
          data_saida: dataSaida,
          id_quarto: idQuarto,
          valor: valor,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    setSelectedCliente("");
    setDataEntrada("");
    setDataSaida("");
    setIdQuarto("");
    setValor("");

    setOnEdit(null);
    getReservations();
  };

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <InputArea>
        <Label>Nome do cliente</Label>
        <Select
          name="id_cliente"
          value={selectedCliente}
          onChange={e => onClienteChange(e.target.value)}
        >
          {clients.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </Select>
      </InputArea>
      <InputArea>
        <Label>Data de entrada</Label>
        <Input placeholder="Data da entrada" name="data_entrada" type="date" />
      </InputArea>
      <InputArea>
        <Label>Data da saída</Label>
        <Input placeholder="Data de saída" name="data_saida" type="date" />
      </InputArea>
      <InputArea>
        <Label>Número do quarto</Label>
        <Input placeholder="Insira o numero do quarto" name="id_quarto" type="number" />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input placeholder="Insira o valor" name="valor" type="number" step="0.1" />
      </InputArea>
      <InputArea>
        <LabelButton>.</LabelButton>
        <Button type="submit">SALVAR</Button>
      </InputArea>
    </FormContainer>
  );
};

export default Form;
