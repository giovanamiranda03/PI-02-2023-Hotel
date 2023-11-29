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
`

const Form = ({ getRooms, onEdit, setOnEdit }) => {
  const [room, setRoom] = useState({ id: '', capacidade: '', valor: '', disponivel: '' })
  const [selectedDisponivel, setSelectedDisponivel] = useState('')
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      setRoom({
        id: onEdit.id_quarto,
        capacidade: onEdit.capacidade,
        valor: onEdit.valor,
        disponivel: onEdit.disponivel,
      })
      setSelectedDisponivel(onEdit.disponivel);
    }
  }, [onEdit, ref]);

  const onQuartoChange = value => {
    setSelectedDisponivel(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const quarto = ref.current;
      if (
        !quarto.id ||
        !quarto.capacidade ||
        !quarto.valor ||
        !quarto.disponivel
      ) {
        return toast.warn('Preencha todos os campos!');
      }

      if (onEdit) {
        await axios
          .put(`${process.env.REACT_APP_API_URL}/quartos/atualizar.php`, {
            id: quarto.id,
            capacidade: quarto.capacidade,
            valor: quarto.valor,
            disponivel: quarto.disponivel,
          })
        toast.success("Quarto atualizado");
      } else {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/quartos/cadastrar.php`, {
            id: quarto.id,
            capacidade: quarto.capacidade,
            valor: quarto.valor,
            disponivel: quarto.disponivel,
          })
        toast.success("Quarto cadastrado");
      }
      setRoom({ id: '', capacidade: '', valor: '', disponivel: '' });

      setOnEdit(null);
      getRooms();
    } catch (error) {
      console.error('Erro ao processar requisição:', error);
      toast.error('Erro ao processar a requisição. Tente novamente.');
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <LineWrapper>
        <LineUp>
          <InputArea>
            <Label>Capacidade</Label>
            <Input
              type='number'
              step=".01"
              placeholder="Insira a capacidade"
              name="capacidade"
              value={room.capacidade}
              onChange={(e) => setRoom((prev) => ({ ...prev, capacidade: e.target.value }))} />
          </InputArea>
          <InputArea>
            <Label>Preço</Label>
            <Input
              type='number'
              step=".01"
              placeholder="Insira o preço da diária"
              name="preco"
              value={room.valor}
              onChange={(e) => setRoom((prev) => ({ ...prev, valor: e.target.value }))} />
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
        </LineUp>
        <LineDown>
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
