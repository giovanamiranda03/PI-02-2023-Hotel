import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
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

const ButtonArea = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`

const Form = ({ getClients, onEdit, setOnEdit }) => {
  const [client, setclient] = useState({ id: '', nome: '', email: '', telefone: '', cpf: '' })
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      setclient({
        id: onEdit.id_cliente,
        nome: onEdit.nome,
        email: onEdit.email,
        telefone: onEdit.telefone,
        cpf: onEdit.cpf,
      })
    }
  }, [onEdit, ref]);

  const handleSubmit = async e => {
    e.preventDefault();

    const client = ref.current;
    console.log(client)
    if (
      !client.nome ||
      !client.email ||
      !client.telefone ||
      !client.cpf
    ) {
      return toast.warn('Preencha todos os campos!');
    }

    if (onEdit) {
      await axios
        .put(`${process.env.REACT_APP_API_URL}/clientes/atualizar.php`, {
          id: client.id,
          nome: client.nome,
          email: client.email,
          telefone: client.telefone,
          cpf: client.cpf,
        })
        .then(({ data }) => toast.success("Cliente atualizado"))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/clientes/cadastrar.php`, {
          nome: client.nome,
          email: client.email,
          telefone: client.telefone,
          cpf: client.cpf,
        })
        .then(({ data }) => toast.success("Cliente cadastrado"))
        .catch(({ data }) => toast.error(data));
    }
    setclient({ id: '', nome: '', email: '', telefone: '', cpf: '' });

    setOnEdit(null);
    getClients();
  };

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <InputArea>
        <Label>Nome</Label>
        <Input placeholder="Insira seu nome" name="nome" value={client.nome}
          onChange={(e) => setclient((prev) => ({ ...prev, nome: e.target.value }))} />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input placeholder="Insira seu e-mail" name="email" type="email" value={client.email}
          onChange={(e) => setclient((prev) => ({ ...prev, email: e.target.value }))} />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input placeholder="Insira seu CPF" name="cpf" value={client.cpf}
          onChange={(e) => setclient((prev) => ({ ...prev, cpf: e.target.value }))} />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input placeholder="Insira o telefone" name="telefone" value={client.telefone}
          onChange={(e) => setclient((prev) => ({ ...prev, telefone: e.target.value }))} />
      </InputArea>
      <ButtonArea>
        <Button type="submit">SALVAR</Button>
      </ButtonArea>
    </FormContainer>
  );
};

export default Form;
