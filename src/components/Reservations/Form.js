import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
  background-color: #16161a;
  padding: 20px;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
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
  width: 130px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;
  height: 40px;
`;

const Button = styled.button`
  width: 100px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #f5d156;
  color: #16161a;
  font-weight: bold;
  height: 42px;
`;

const Form = ({ getReservations, clients, onEdit, setOnEdit }) => {
  const [selectedCliente, setSelectedCliente] = useState("")
  const ref = useRef();


  const onClienteChange = value => {
    setSelectedCliente(value);
  }

  useEffect(() => {
    if (onEdit) {
      const reservations = ref.current;
      const cliente = clients.filter(c => c.cpf == onEdit.cpf_cliente)
      setSelectedCliente(cliente.id)

      reservations.data_reserva.value = onEdit.data_reserva;
      reservations.data_entrada.value = onEdit.data_entrada;
      reservations.data_saida.value = onEdit.data_saida;
      reservations.id_quarto.value = onEdit.id_quarto;
      reservations.valor.value = onEdit.valor;
    }
  }, [onEdit, ref]);

  const handleSubmit = async e => {
    e.preventDefault();

    const reservations = ref.current;
    if (
      !reservations.id.value ||
      !reservations.cliente.value ||
      !reservations.cpf_cliente.value ||
      !reservations.data_reserva.value ||
      !reservations.data_entrada.value ||
      !reservations.data_saida.value ||
      !reservations.id_quarto.value ||
      !reservations.valor.value
    ) {
      return toast.warn('Preencha todos os campos!');
    }

    if (onEdit) {
      await axios
        .put('http://localhost:3000/reservas' + onEdit.id, {
          id: reservations.id.value,
          cliente: reservations.cliente.value,
          cpf_cliente: reservations.cpf_cliente.value,
          data_reserva: reservations.data_reserva.value,
          data_entrada: reservations.data_entrada.value,
          data_saida: reservations.data_saida.value,
          id_quarto: reservations.id_quarto.value,
          valor: reservations.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:3000/reservas', {
          id: reservations.id.value,
          cliente: reservations.cliente.value,
          cpf_cliente: reservations.cpf_cliente.value,
          data_reserva: reservations.data_reserva.value,
          data_entrada: reservations.data_entrada.value,
          data_saida: reservations.data_saida.value,
          id_quarto: reservations.id_quarto.value,
          valor: reservations.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    reservations.id.value = ""
    reservations.cliente.value = ""
    reservations.cpf_cliente.value = ""
    reservations.data_reserva.value = ""
    reservations.data_entrada.value = ""
    reservations.data_saida.value = ""
    reservations.id_quarto.value = ""
    reservations.valor.value = ""

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
          value={onEdit ? onEdit.id_cliente : selectedCliente}
          onChange={e => onClienteChange(e.target.value)}
        >
          {
            clients.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))
          }
        </Select>
      </InputArea>
      <InputArea>
        <Label>CPF do cliente</Label>
        <Select
          name="cpf_cliente"
          value={onEdit ? onEdit.id_cliente : selectedCliente}
          onChange={e => onClienteChange(e.target.value)}
        >
          {
            clients.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.cpf}</option>
            ))
          }
        </Select>
      </InputArea>
      <InputArea>
        <Label>Data da reserva</Label>
        <Input placeholder="Data da reserva" name="data_reserva" type='date' />
      </InputArea>
      <InputArea>
        <Label>Data de entrada</Label>
        <Input placeholder="Data da entrada" name="data_entrada" type='date' />
      </InputArea>
      <InputArea>
        <Label>Data da saida</Label>
        <Input placeholder="Data de saida" name="data_saida" type='date' />
      </InputArea>
      <InputArea>
        <Label>N°Quarto</Label>
        <Input placeholder="Numero do quarto" name="id_quarto" type='number' />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input placeholder="Insira o valor" name="valor" type='number' step="0.1" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
