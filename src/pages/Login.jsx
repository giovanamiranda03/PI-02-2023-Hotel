import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginImage from '../assets/loginImage.svg';
import logo from '../assets/logo.svg';

const ContainerLogin = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSide = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  padding-left: 5rem;
  padding-right: 5rem;
`;

const LeftContent = styled.main`
  display: flex;
  flex-direction: column;
  margin-top: 7rem;
  gap: 2.5rem;
  width: 100%;
  max-width: 24rem;

  @media (max-width: 768px) {
    margin-top: 3rem;
    max-width: 90%;
  }
`;

const LeftHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 21.875rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormEmail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const RightSide = styled.img`
  background-size: cover;
  background-repeat: no-repeat;

  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  color: white;
  font-weight: bold;
`;

const SubText = styled(Title)`
  font-weight: normal;
  font-size: 1rem;
  color: #bbb;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.875rem;
  color: #fff;
`;

const Input = styled.input`
  padding: 1rem 2rem;
  font-size: 0.875rem;
  background-color: #16161A;
  color: #fff;
  line-height: 1.5;
  border: 1px solid #bbb;
  border-radius: 0.375rem;
  outline: none;

  &::placeholder {
    color: #cbd5e0;
  }

  &:focus {
    border-color: #f5d156;
    outline: 0;
  }

  &.error {
    border-color: #e53e3e;
  }

  &.error:focus {
    border-color: #e53e3e;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8rem;
`;

const Button = styled.button`
  background-color: #f5d156;
  color: #333;
  font-weight: bold;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.375rem;
  outline: none;

  &:hover {
    background-color: #F5D189;
  }

  &:focus {
    border-width: 2px;
    border-color: #f5d156;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === 'teste@teste.com' && password === 'teste123') {
      navigate('/');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <ContainerLogin>
      <LeftSide>
        <img src={logo} alt="Logo Hotel" />
        <LeftContent>
          <LeftHeader>
            <Title>Bem-vindo ao Hotel ALVERG</Title>
            <SubText>
              Faça login para começar a gerenciar o sistema do hotel ALVERG.
            </SubText>
          </LeftHeader>
          <Form onSubmit={handleLogin}>
            <FormEmail>
              <Label htmlFor="email">E-mail</Label>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu email"
              />
              {error.email && (
                <ErrorMessage>{error.email?.message}</ErrorMessage>
              )}
            </FormEmail>

            <FormPassword>
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha"
              />
              {error.password && (
                <ErrorMessage>{error.password?.message}</ErrorMessage>
              )}
            </FormPassword>

            <ButtonContainer onClick={handleLogin}>
              <Button type="submit">Entrar</Button>
            </ButtonContainer>
          </Form>
        </LeftContent>
      </LeftSide>
      <RightSide src={loginImage} alt="Imagem Hotel ALVERG" />
    </ContainerLogin>
  );
}
