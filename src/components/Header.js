import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import hotelImage from '../assets/hotel.svg';
import userImage from '../assets/user.svg';
import roomImage from '../assets/room.svg';
import logoutImage from '../assets/logout.svg';

const HeaderContainer = styled.header`
  background-color: #16161A;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Navigation = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 20px;
    
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const Logout = styled.div`
  a {
    text-decoration: none;
    color: #DB3030;
    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 2em;
    display: block;
    margin: 0 auto 0.5em;
  }
`;

const NavItem = styled.li`
  a {
    text-decoration: none;
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 2em;
    display: block;
    margin: 0 auto 0.5em;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <img src={logo} alt="Logo do site" />
      </Logo>
      <Navigation>
        <ul>
          <NavItem>
            <img src={userImage} alt="Ícone de usuário" />
            <a href="/clients">Clientes</a>
          </NavItem>
          <NavItem>
            <img src={roomImage} alt="Ícone de quarto" />
            <a href="/rooms">Quartos</a>
          </NavItem>
          <NavItem>
            <img src={hotelImage} alt="Ícone de hotel" />
            <a href="/reservations">Reservas</a>
          </NavItem>
        </ul>
      </Navigation>
      <Logout>
        <img src={logoutImage} alt="Ícone de logout" />
        <a href="/logout">Sair</a>
      </Logout>
    </HeaderContainer>
  );
}
