import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import hotelImage from '../assets/hotel.svg';
import userImage from '../assets/user.svg';
import roomImage from '../assets/room.svg';
import Header from "../components/Header";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Box = styled.div`
  width: 300px;
  height: 250px;
  background-color: #16161A;
  border: 1px solid #F5D156;
  border-radius: 8px;
  box-shadow: 0px 0px 8px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  gap: 10px;
  cursor: pointer;

  img {
    width: 3em;
    display: block;
    margin: 0 auto 0.5em;
  }

  p {
    color: #ccc;
    text-align: center;
    font-size: 12px;
  }
`;

const Button = styled.button`
  width: 200px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #F5D156;
  color: #16161A;
  font-weight: bold;
  height: 42px;
  transition: background-color 0.5s;

  a {
    text-decoration: none;
    color: #16161A;
  }

  &:hover {
    background-color: #F5D189;
  }
`;

const Title = styled.h4``;

export default function Menu() {
  return (
    <>
      <Container>
        <Box>
          <img src={userImage} alt="Ícone de usuário" />
          <Title>Gerenciar clientes</Title>
          <p>Acesse para poder gerenciar totalmente as informações de seus clientes</p>
          <Button>
          <a href="/clients">Acessar</a>
          </Button>
        </Box>
        <Box>
          <img src={roomImage} alt="Ícone de quarto" />
          <Title>Gerenciar quartos</Title>
          <p>Acesse para poder gerenciar totalmente as informações de seus clientes</p>
          <Button>
            <a href="/rooms">Acessar</a>
          </Button>
        </Box>
        <Box>
          <img src={hotelImage} alt="Ícone de hotel" />
          <Title>Gerenciar reservas</Title>
          <p>Acesse para poder gerenciar totalmente as informações de seus clientes</p>
          <Button>
          <a href="/reservations">Acessar</a>
          </Button>
        </Box>
      </Container>
    </>
  );
}