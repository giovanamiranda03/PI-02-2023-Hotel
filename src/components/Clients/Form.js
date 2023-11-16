import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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
  width: 260px;
  height: 46px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;

  ::placeholder {
    color: #ccc;
  }
`;

const Label = styled.label``;

const Button = styled.button`
  width: 260px;
  height: 46px; 
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #f5d156;
  color: #16161a;
  font-weight: bold;
`;

const Form = ({ getClients, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const clients = ref.current;

      clients.nome.value = onEdit.nome;
      clients.email.value = onEdit.email;
      clients.fone.value = onEdit.fone;
      clients.cpf.value = onEdit.cpf;
    }
  }, [onEdit, ref]);

  const handleSubmit = async e => {
    e.preventDefault();

    const clients = ref.current;
    if (
      !clients.nome.value ||
      !clients.email.value ||
      !clients.fone.value ||
      !clients.cpf.value 
    ) {
      return toast.warn('Preencha todos os campos!');
    }

    if (onEdit) {
      await axios
        .put('http://localhost:8080/hotel-api/clientes/atualizar.php', {
          nome: clients.nome.value,
          email: clients.email.value,
          fone: clients.fone.value,
          cpf: clients.cpf.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:8080/hotel-api/clientes/cadastrar.php', {
          nome: clients.nome.value,
          email: clients.email.value,
          fone: clients.fone.value,
          cpf: clients.cpf.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    clients.nome.value = '';
    clients.email.value = '';
    clients.fone.value = '';
    clients.cpf.value = '';

    setOnEdit(null);
    getClients();
  };

  return (
    <FormContainer>
      <InputArea>
        <Label>Nome</Label>
        <Input placeholder="Insira seu nome" name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input placeholder="Insira seu e-mail" name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input placeholder="Insira seu CPF" name="cpf" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input placeholder="Insira o telefone" name="telefone" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
