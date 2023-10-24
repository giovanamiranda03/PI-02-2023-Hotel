import axios from "axios";
import React, { useRef , useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
  background-color: #16161A;
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
  background-color: #16161A;
  height: 40px;

  ::placeholder {
       color: #ccc;
   }
`;

const Select = styled.select`
  width: 130px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161A;
  color: #ccc;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  width: 100px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #F5D156;
  color: #16161A;
  font-weight: bold;
  height: 42px;
`;

const Form = ({ getClients, onEdit, setOnEdit }) => {
  const [selectedHosted, setSelectedHosted] = useState("");

  const onHostedChange = (value) => {
    setSelectedHosted(value);
  };

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const clients = ref.current;

      clients.nome.value = onEdit.nome;
      clients.email.value = onEdit.email;
      clients.fone.value = onEdit.fone;
      clients.cpf.value = onEdit.cpf;
      clients.hosted.value = onEdit.hosted;
    }
  }, [onEdit, ref]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clients = ref.current;

    if (
      !clients.nome.value ||
      !clients.email.value ||
      !clients.fone.value ||
      !clients.cpf.value ||
      !clients.hosted.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: clients.nome.value,
          email: clients.email.value,
          fone: clients.fone.value,
          cpf: clients.cpf.value,
          hosted: selectedHosted,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: clients.nome.value,
          email: clients.email.value,
          fone: clients.fone.value,
          cpf: clients.cpf.value,
          hosted: selectedHosted,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    clients.nome.value = "";
    clients.email.value = "";
    clients.fone.value = "";
    clients.cpf.value = "";
    clients.hosted.value = "";

    setOnEdit(null);
    getClients();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
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
        <Input placeholder="Insira o telefone" name="fone" />
      </InputArea>
      <InputArea>
        <Label>Hospedado</Label>
        <Select name="hosted" value={onEdit ? onEdit.hosted : ""} onChange={(e) => onHostedChange(e.target.value)}>
          <option value="Yes">Sim</option>
          <option value="No">Não</option>
        </Select>
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
