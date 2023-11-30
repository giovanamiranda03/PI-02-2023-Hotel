import axios from 'axios';
import React, { useEffect, useRef } from 'react';
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
`

const Form = ({ getClients, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      ref.current.nome.value = onEdit.nome;
      ref.current.email.value = onEdit.email;
      ref.current.telefone.value = onEdit.telefone;
      ref.current.cpf.value = onEdit.cpf;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const client = ref.current;
    const id = onEdit?.id_cliente;
    const nome = client?.nome.value;
    const email = client?.email.value;
    const telefone = client?.telefone.value;
    const cpf = client?.cpf.value;

    if (
      !nome ||
      !email ||
      !telefone ||
      !cpf
    ) {
      return toast.warn('Preencha todos os campos!');
    }

    if (onEdit) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/clientes/atualizar.php`, {
          id_cliente: id,
          nome: nome,
          email: email,
          fone: telefone,
          cpf: cpf,
        });
        toast.success(response.data.message);
      }
      catch (err) {
        toast.error(err.response.data.message);
      }
    }
    else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/clientes/cadastrar.php`, {
          nome: nome,
          email: email,
          fone: telefone,
          cpf: cpf,
        });
        toast.success(response.data.message);
      }
      catch (err) {
        console.log(err)
        toast.error(err.response.data.message);
      }
    }


    if (ref.current) {
      ref.current.reset()
    }
    setOnEdit(null);
    getClients();
  };

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <LineWrapper>
        <LineUp>
          <InputArea>
            <Label>Nome</Label>
            <Input placeholder="Insira seu nome" name="nome"
            />
          </InputArea>
          <InputArea>
            <Label>E-mail</Label>
            <Input placeholder="Insira seu e-mail" name="email" type="email"
            />
          </InputArea>
          <InputArea>
            <Label>CPF</Label>
            <Input placeholder="Insira seu CPF" name="cpf"
            />
          </InputArea>
        </LineUp>
        <LineDown>
          <InputArea>
            <Label>Telefone</Label>
            <Input placeholder="Insira o telefone" name="telefone"
            />
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