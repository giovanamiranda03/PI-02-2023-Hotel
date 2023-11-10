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

const Select = styled.select`
  width: 130px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #16161a;
  color: #fff;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  width: 100px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;s
  background-color: #f5d156;
  color: #16161a;
  font-weight: bold;
  height: 42px;
`;

const Form = ({ getRooms, onEdit, setOnEdit }) => {
  const [selectedDisponivel, setSelectedDisponivel] = useState('');

  const onDisponivelChange = value => {
    setSelectedDisponivel(value);
  };

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const rooms = ref.current;

      rooms.capacidade.value = onEdit.capacidade;
      rooms.preco.value = onEdit.preco;
      rooms.disponivel.value = onEdit.disponivel;
    }
  }, [onEdit, ref]);

  const handleSubmit = async e => {
    e.preventDefault();

    const rooms = ref.current;
    // if (
    //   !rooms.id.value ||
    //   !rooms.capacidade.value ||
    //   !rooms.preco.value ||
    //   !rooms.disponivel.value ||
    // ) {
    //   return toast.warn('Preencha todos os campos!');
    // }

    if (onEdit) {
      await axios
        .put('http://localhost:3000/quartos' + onEdit.id, {
          capacidade: rooms.capacidade.value,
          preco: rooms.preco.value,
          disponivel: selectedDisponivel
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post('http://localhost:3000/quartos', {
          capacidade: rooms.capacidade.value,
          preco: rooms.preco.value,
          disponivel: selectedDisponivel
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    rooms.capacidade.value = '';
    rooms.preco.value = '';
    rooms.disponivel.value = '';

    setOnEdit(null);
    getRooms();
  };

  return (
    <FormContainer
      action="/cadastrar_cliente.php"
      method="POST"
      ref={ref}
      onSubmit={handleSubmit}
    >
      <InputArea>
        <InputArea>
          <Label>Capacidade</Label>
          <Input type='number' step=".01" placeholder="" name="capacidade" />
        </InputArea>
        <Label>Preço</Label>
        <Input type='number' step=".01" placeholder="Insira o preço da diaria" name="preco" />
      </InputArea>
      <InputArea>
        <Label>Disponivel</Label>
        <Select
          name="disponivel"
          value={onEdit ? onEdit.disponivel : selectedDisponivel ? "1" : "0"}
          onChange={e => onDisponivelChange(e.target.value)}
        >
          <option value="1">Sim</option>
          <option value="0">Não</option>
        </Select>
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
