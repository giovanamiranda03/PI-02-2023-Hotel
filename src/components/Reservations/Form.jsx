import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 20px 60px;
  padding: 20px 241px;
  background-color: #16161a;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px;

  @media (max-width: 600px) {
    flex-direction: column;
    column-gap: 20px;
  }
`;

const LineUp = styled.div`
  display: flex;
  gap: 59px;
  align-items: start;
  justify-content: start;
  margin-bottom: 16px;
`;

const LineDown = styled.div`
  display: flex;
  gap: 59px;
  width: 100%;
`;

const LineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  width: 200px;
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
`;

const Form = ({ getReservations, clients, rooms, onEdit, setOnEdit }) => {
  const [reservation, setReservation] = useState({
    id: '',
    id_cliente: '',
    id_quarto: '',
    data_entrada: '',
    data_saida: '',
    forma_pagamento: '',
  });
  const [selectedCliente, setSelectedCliente] = useState('');
  const [selectedQuarto, setSelectedQuarto] = useState('');
  const [selectedPagamento, setSelectedPagamento] = useState('');
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      setReservation({
        id: onEdit.id,
        id_cliente: onEdit.id_cliente,
        id_quarto: onEdit.id_quarto,
        data_entrada: onEdit.data_entrada,
        data_saida: onEdit.data_saida,
        forma_pagamento: onEdit.forma_pagamento,
      });
      setSelectedCliente(onEdit.id_cliente);
      setSelectedQuarto(onEdit.id_quarto);
      setSelectedPagamento(onEdit.forma_pagamento);
    }
  }, [onEdit, ref]);

  const onClienteChange = (value) => {
    setSelectedCliente(value);
  };

  const onQuartoChange = (value) => {
    setSelectedQuarto(value);
  };

  const onPagamentoChange = (value) => {
    setSelectedPagamento(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reserva = ref.current;
      if (
        !reserva.id_cliente ||
        !reserva.id_quarto ||
        !reserva.data_entrada ||
        !reserva.data_saida ||
        !reserva.forma_pagamento
      ) {
        return toast.warn('Preencha todos os campos!');
      }

      if (onEdit) {
        await axios.put(`${process.env.REACT_APP_API_URL}/reservas/atualizar.php`, {
          id: reserva.id,
          id_cliente: reserva.id_cliente,
          id_quarto: reserva.id_quarto,
          data_entrada: reserva.data_entrada,
          data_saida: reserva.data_saida,
          forma_pagamento: reserva.forma_pagamento,
        });
        toast.success("Reserva atualizada");
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/reservas/cadastrar.php`, {
          id_cliente: reserva.id_cliente,
          id_quarto: reserva.id_quarto,
          data_entrada: reserva.data_entrada,
          data_saida: reserva.data_saida,
          forma_pagamento: reserva.forma_pagamento,
        });
        toast.success("Reserva cadastrada");
      }
      setReservation({
        id_cliente: '',
        id_quarto: '',
        data_entrada: '',
        data_saida: '',
        forma_pagamento: '',
      });

      setOnEdit(null);
      getReservations();
    } catch (error) {
      console.error('Erro ao processar requisição:', error);
      toast.error('Erro ao processar a requisição. Tente novamente.');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <LineWrapper>
        <LineUp>
          <InputArea>
            <Label>Nome do cliente</Label>
            <Select
              name="id_cliente"
              value={selectedCliente}
              onChange={(e) => onClienteChange(e.target.value)}
            >
              {clients && clients.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </Select>
          </InputArea>
          <InputArea>
            <Label>Número do quarto</Label>
            <Select
              name="id_quarto"
              value={selectedQuarto}
              onChange={(e) => onQuartoChange(e.target.value)}
            >
              {rooms && rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.id}
                </option>
              ))}
            </Select>
          </InputArea>
          <InputArea>
            <Label>Data de entrada</Label>
            <Input
              placeholder="Data da entrada"
              name="data_entrada"
              type="date"
              value={reservation.data_entrada}
              onChange={(e) => setReservation({ ...reservation, data_entrada: e.target.value })}
            />
          </InputArea>
        </LineUp>
        <LineDown>
          <InputArea>
            <Label>Data da saída</Label>
            <Input
              placeholder="Data de saída"
              name="data_saida"
              type="date"
              value={reservation.data_saida}
              onChange={(e) => setReservation({ ...reservation, data_saida: e.target.value })}
            />
          </InputArea>
          <InputArea>
            <Label>Forma de pagamento</Label>
            <Select
              name="forma_pagamento"
              value={selectedPagamento}
              onChange={(e) => onPagamentoChange(e.target.value)}
            >
              <option value="" disabled hidden>
                Escolha uma opção
              </option>
              <option value="2">Dinheiro</option>
              <option value="1">Cartão de Crédito</option>
              <option value="0">Cartão de Débito</option>
            </Select>
          </InputArea>
          <InputArea>
            <LabelButton>.</LabelButton>
            <Button type="submit">SALVAR</Button>
          </InputArea>
        </LineDown>
      </LineWrapper>
    </FormContainer>
  );
};

export default Form;
