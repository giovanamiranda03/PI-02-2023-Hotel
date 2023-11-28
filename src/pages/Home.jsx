import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import footerImage from '../assets/footerImage.svg';
import hotelImage from '../assets/hotel.svg';
import roomImage from '../assets/room.svg';
import userImage from '../assets/user.svg';

const Container = styled.div`
  width: 100%;
  margin-top: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Box = styled.div`
  width: 336px;
  height: 337px;
  background-color: #16161A;
  border: 1px solid #F5D156;
  border-radius: 25px;
  box-shadow: 0px 0px 15px #C0C0C0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  gap: 20px;
  font-size: 22px;
  cursor: pointer;
`;

const Paragraph = styled.p`
  color: #ccc;
  text-align: center;
  font-size: 18px;
`;

const Image = styled.img`
  width: 3em;
  display: block;
  margin: 0 auto 0.5em;
`;

const Link = styled.a`
  text-decoration: none;
  color: #16161A;
`;

const Button = styled.button`
  width: 300px;
  height: 53px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #F5D156;
  color: #16161A;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.5s;

  &:hover {
    background-color: #F5D189;
  }
`;

const Footer = styled.img`
  max-width: 1200px;
`;

const Title = styled.h4``;

export default function Home() {
  return (
    <>
      <Container>
        <Box>
          <Image src={userImage} alt="Ícone de usuário" />
          <Title>Gerenciar clientes</Title>
          <Paragraph>Acesse para poder gerenciar totalmente as informações de seus clientes</Paragraph>
          <Link href="/clients">
            <Button>Acessar</Button>
          </Link>
        </Box>
        <Box>
          <Image src={roomImage} alt="Ícone de quarto" />
          <Title>Gerenciar quartos</Title>
          <Paragraph>Acesse para poder gerenciar totalmente as informações de seus quartos</Paragraph>
          <Link href="/rooms">
            <Button>Acessar</Button>
          </Link>
        </Box>
        <Box>
          <Image src={hotelImage} alt="Ícone de hotel" />
          <Title>Gerenciar reservas</Title>
          <Paragraph>Acesse para poder gerenciar totalmente as informações de suas reservas</Paragraph>
          <Link href="/reservations">
            <Button>Acessar</Button>
          </Link>
        </Box>
      </Container>
      <Footer src={footerImage} alt="Rodapé" />
    </>
  );
}