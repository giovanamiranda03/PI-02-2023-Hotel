import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import hotelImage from '../assets/hotel.svg';
import userImage from '../assets/user.svg';
import roomImage from '../assets/room.svg';
import logoutImage from '../assets/logout.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  font-size: 22px;
  background-color: #16161A;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    font-size: 16px;
    padding: 10px; 
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;
const ImageLogo = styled.img`
  width: 100%; 
  display: block;
  margin: 0 auto 0.5em;
`;

const Navigation = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 60px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 10px; 
    }
  }
`;


const NavItem = styled.li`
  @media (max-width: 768px) {
    margin-bottom: 10px;  
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: #fff;
  display: flex;
  flex-direction: column;  

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    text-align: center;  
  }
`;

const Image = styled.img`
  width: 1.5em;
  display: block;
  margin: 0 auto 0.5em;
`;

const Logout = styled.div`
  a {
    text-decoration: none;
    color: #DB3030;
    &:hover {
      text-decoration: underline;
    }
  }

`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <Link href="/">
          <ImageLogo src={logo} alt="Logo do site" />
        </Link>
      </Logo>
      <Navigation>
        <ul>
          <NavItem>
            <Image src={userImage} alt="Ícone de usuário" />
            <Link href="/clients">Clientes</Link>
          </NavItem>
          <NavItem>
            <Image src={roomImage} alt="Ícone de quarto" />
            <Link href="/rooms">Quartos</Link>
          </NavItem>
          <NavItem>
            <Image src={hotelImage} alt="Ícone de hotel" />
            <Link href="/reservations">Reservas</Link>
          </NavItem>
        </ul>
      </Navigation>
      <Logout>
        <Image src={logoutImage} alt="Ícone de logout" />
        <Link href="/login">Sair</Link>
      </Logout>
    </HeaderContainer>
  );
}
