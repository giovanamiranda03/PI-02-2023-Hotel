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
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 220px;
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

const Select = styled.select`
  width: 220px;
  height: 46px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;
`;

const Label = styled.label``;

const Button = styled.button`
  width: 220px;
  height: 46px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #f5d156;
  color: #16161a;
  font-weight: bold;
`;

const Form = ({ getRooms, onEdit, setOnEdit }) => {
  const [capacidade, setCapacidade] = useState('');
  const [preco, setPreco] = useState('');
  const [selectedDisponivel, setSelectedDisponivel] = useState('');

  const onQuartoChange = value => {
    setSelectedDisponivel(value);
  };

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const { capacidade, preco, disponivel } = onEdit;
      setCapacidade(capacidade);
      setPreco(preco);
      setSelectedDisponivel(disponivel ? '1' : '0');
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!capacidade || !preco || !selectedDisponivel) {
      return toast.warn('Preencha todos os campos!');
    }

    const formData = {
      capacidade: capacidade,
      preco: preco,
      disponivel: selectedDisponivel === '0' ? false : true,
    };

    if (onEdit) {
      await axios
        .put(`http://localhost:8080/hotel-api/quartos/atualizar.php`, formData)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:8080/hotel-api/quartos/cadastrar.php', formData)
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    setCapacidade('');
    setPreco('');
    setSelectedDisponivel('');

    setOnEdit(null);
    getRooms();
  };

  return (
    <FormContainer>
      <InputArea>
        <Label>Capacidade</Label>
        <Input
          type='number'
          step=".01"
          placeholder="Insira a capacidade"
          name="capacidade"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <Label>Preço</Label>
        <Input
          type='number'
          step=".01"
          placeholder="Insira o preço da diária"
          name="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
      </InputArea>
      <InputArea>
        <Label>Disponível</Label>
        <Select
          name="disponivel"
          value={selectedDisponivel}
          onChange={(e) => onQuartoChange(e.target.value)}
        >
          <option value="" disabled hidden>Escolha uma opção</option>
          <option value="1">Sim</option>
          <option value="0">Não</option>
        </Select>

      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
