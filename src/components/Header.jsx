import { List } from '@phosphor-icons/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import hotelImage from '../assets/hotel.svg';
import logo from '../assets/logo.svg';
import logoutImage from '../assets/logout.svg';
import roomImage from '../assets/room.svg';
import userImage from '../assets/user.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  color: #fff;
  background-color: #16161a;
  border-radius: 5px;
  width: 100%;
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 30px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 38px 5px 38px;
`;
const ImageLogo = styled.img`
  width: 100%;
  display: block;
  margin: 0 auto 0.5em;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-radius: 0 0 0 25px;
  width: 100%;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 60px;
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
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

  @media (max-width: 768px) {
    width: 1em;
  }
`;

const Logout = styled.div`
  padding: 10px;
  background-color: #16161a;
  a {
    text-decoration: none;
    color: #db3030;
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    background-color: #1f1f1f;
  }
`;

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <HeaderContainer>
      <HamburgerIcon onClick={toggleNav}>
        <List size={40} />
      </HamburgerIcon>
      <Logo>
        <Link href="/home">
          <ImageLogo src={logo} alt="Logo do site" />
        </Link>
      </Logo>
      <Navigation isOpen={isNavVisible}>
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
