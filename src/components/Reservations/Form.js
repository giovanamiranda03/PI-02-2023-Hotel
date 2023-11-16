import axios from 'axios';
import React, { useEffect, ref, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  column-gap: 53px;
  row-gap: 31px;
  background-color: #16161a;
  padding: 32px;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 195px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  height: 40px;
  color: #fff;

  ::placeholder {
    color: #ccc;
  }
`;

const Label = styled.label``;

const Select = styled.select`
  width: 195px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;
  height: 40px;

  ::placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
  width: 195px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #f5d156;
  color: #16161a;
  font-weight: bold;
  height: 42px;

  a {
    text-decoration: none;
    color: #16161A;
  }

  &:hover {
    background-color: #F5D189;
  }
`;

const Form = ({ getReservations, clients, rooms, onEdit, setOnEdit }) => {
  const [selectedCliente, setSelectedCliente] = useState("");
  const [selectedQuarto, setSelectedQuarto] = useState("");
  const [dataReserva, setDataReserva] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [valor, setValor] = useState("");

  const onClienteChange = (value) => {
    setSelectedCliente(value);
  };

  const onQuartoChange = (value) => {
    setSelectedQuarto(value);
  };

  useEffect(() => {
    if (onEdit) {
      const cliente = clients.find((c) => c.cpf === onEdit.cpf_cliente);
      setSelectedCliente(cliente.id);
      setSelectedQuarto(onEdit.id_quarto);
      setDataReserva(onEdit.data_reserva);
      setDataEntrada(onEdit.data_entrada);
      setDataSaida(onEdit.data_saida);
      setValor(onEdit.valor);
    }
  }, [onEdit, clients]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedCliente ||
      !dataReserva ||
      !dataEntrada ||
      !dataSaida ||
      !selectedQuarto ||
      !valor
    ) {
      return toast.warn('Preencha todos os campos!');
    }

    const cpf_cliente = clients.find((c) => c.id === selectedCliente)?.cpf;
    const id_quarto = selectedQuarto;

    if (onEdit) {
      await axios
        .put(`http://localhost:3000/reservas/${onEdit.id}`, {
          cpf_cliente,
          data_reserva: dataReserva,
          data_entrada: dataEntrada,
          data_saida: dataSaida,
          id_quarto,
          valor: valor,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:3000/reservas', {
          cpf_cliente,
          data_reserva: dataReserva,
          data_entrada: dataEntrada,
          data_saida: dataSaida,
          id_quarto,
          valor: valor,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    setSelectedCliente("");
    setSelectedQuarto("");
    setDataReserva("");
    setDataEntrada("");
    setDataSaida("");
    setValor("");

    setOnEdit(null);
    getReservations();
  };

  return (
    <FormContainer
      action="/cadastrar_cliente.php"
      method="POST"
      ref={ref}
      onSubmit={handleSubmit}
    >
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
        <Label>CPF do cliente</Label>
        <Select
          name="cpf_cliente"
          value={selectedCliente}
          onChange={e => onClienteChange(e.target.value)}
        >
          {clients.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.cpf}
            </option>
          ))}
        </Select>
      </InputArea>
      <InputArea>
        <Label>Data da reserva</Label>
        <Input placeholder="Data da reserva" name="data_reserva" type="date" />
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
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
