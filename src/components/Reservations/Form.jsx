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
  width: 180px;
  height: 44px;
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
  width: 200px;
  height: 44px;
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

const SpanWarn = styled.span`
  text-align: center;
  color: #f5d156;
  width: 100%;
`

const Form = ({ getReservations, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      ref.current.id_cliente.value = onEdit.id_cliente;
      ref.current.numero_quarto.value = onEdit.numero_quarto;
      ref.current.data_entrada.value = onEdit.data_entrada;
      ref.current.data_saida.value = onEdit.data_saida;
      ref.current.forma_pagamento.value = onEdit.forma_pagamento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reservation = ref.current; 
    const id_cliente = reservation?.id_cliente.value;
    const numero_quarto = reservation?.numero_quarto.value;
    const data_entrada = reservation?.data_entrada.value;
    const data_saida = reservation?.data_saida.value;
    const forma_pagamento = reservation?.forma_pagamento.value;

    if (
      !id_cliente ||
      !numero_quarto ||
      !data_entrada ||
      !forma_pagamento
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit){
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/reservas/atualizar.php`, {
          id_reserva: onEdit.id_reserva,
          data_saida: data_saida,
          forma_pagamento: forma_pagamento,
        });
        toast.success(response.data.message);
      } catch (err) {
        console.log("oi", err);
        toast.error(err.response.data.message);
      }
    }
    else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reservas/cadastrar.php`, {
          id_cliente: id_cliente,
          numero_quarto: numero_quarto,
          data_entrada: data_entrada,
          data_saida: data_saida,
          forma_pagamento: forma_pagamento,
        })
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }

    if (ref.current) {
      ref.current.reset();
    }

    getReservations();
    setOnEdit(null);
  };

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <LineWrapper>
        <LineUp>
          <InputArea>
            <Label>ID do cliente</Label>
            <Input placeholder="Insira o ID do cliente" name="id_cliente" type='number'/>
          </InputArea>
          <InputArea>
            <Label>Número do quarto</Label>
            <Input placeholder="Insira o número do quarto" name="numero_quarto" type='number'/>
          </InputArea>
          <InputArea>
            <Label>Data de entrada</Label>
            <Input
              placeholder="Data da entrada"
              name="data_entrada"
              type="date"
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
            />
          </InputArea>
          <InputArea>
            <Label>Forma de pagamento</Label>
            <Select
              name="forma_pagamento"
            >
              <option value="" disabled hidden>
                Escolha uma opção
              </option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartao de credito">Cartão de Crédito</option>
              <option value="Cartao de debito">Cartão de Débito</option>
              <option value="Pix">Pix</option>
            </Select>
          </InputArea>
          <InputArea>
            <LabelButton>.</LabelButton>
            <Button type="submit">SALVAR</Button>
          </InputArea>
        </LineDown>
      </LineWrapper>
      {onEdit && <SpanWarn>Só é possivel editar as seguintes informações: Data de saida e forma de pagamento!</SpanWarn>}
    </FormContainer>
  );
};

export default Form;
