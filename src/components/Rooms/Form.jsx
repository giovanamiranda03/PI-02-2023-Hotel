import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 59px;
  align-items: start;
  justify-content: start;
  padding: 20px 110px;
  background-color: #16161a;
  box-shadow: 0px 0px 2px #ccc;
  border-radius: 5px;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px; 
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

  @media (max-width: 600px) {
    width: 100%;
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

  @media (max-width: 600px) {
    width: 100%; 
  }
`;

const LabelButton = styled.label`
  color: #16161a;
`

const Form = ({ getRooms, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      ref.current.numero.value = onEdit.numero_quarto;
      ref.current.capacidade.value = onEdit.capacidade;
      ref.current.diaria.value = onEdit.valor_diaria;
    }
  }, [onEdit]);

  const handleSubmit = async e => {
    e.preventDefault();

    const quarto = ref.current;
    const numero = quarto?.numero.value;
    const capacidade = quarto?.capacidade.value;
    const diaria = quarto?.diaria.value;

    if (
      !numero ||
      !capacidade ||
      !diaria
    ) {
      return toast.warn('Preencha todos os campos!');
    }
    if (onEdit) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/quartos/atualizar.php`, {
          numero: numero,
          capacidade: capacidade,
          diaria: diaria
        })
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message)
      }
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/quartos/cadastrar.php`, {
          numero: numero,
          capacidade: capacidade,
          diaria: diaria
        })
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message)
      }
    }

    if (ref.current) {
      ref.current.reset()
    }

    setOnEdit(null);
    getRooms();
  }

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <InputArea>
        <Label>Numero do quarto</Label>
        <Input
          type='number'
          step="1"
          placeholder="Insira o numero do quarto"
          name="numero"
        />
      </InputArea>
      <InputArea>
        <Label>Capacidade</Label>
        <Input
          type='number'
          step=".01"
          placeholder="Insira a capacidade"
          name="capacidade"
        />
      </InputArea>
      <InputArea>
        <Label>Diaria</Label>
        <Input
          type='number'
          step=".01"
          placeholder="Insira o preço da diária"
          name="diaria"
        />
      </InputArea>
      <InputArea>
        <LabelButton>.</LabelButton>
        <Button type="submit">SALVAR</Button>
      </InputArea>
    </FormContainer>
  );
};

export default Form;
