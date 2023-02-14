import React from "react";
import logoImg from "../../assets/logo.svg";
import { 
  Container,
  Header,
  LogImg,
  MenuContainer,
  MenuItemLink
} from "./styles";

import { 
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from 'react-icons/md'

import {  } from "./styles";

const Aside = () => {
  return (
    <Container>
      <Header>
        <LogImg src={logoImg} alt="Logo Minha Carteira" />
      </Header>
      <MenuContainer>
        <MenuItemLink href="#">
          <MdDashboard />
            Dashiboard
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdArrowUpward />
            Entradas
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdArrowDownward />
            Saídas
        </MenuItemLink>
        <MenuItemLink href="#">
          <MdExitToApp />
            Exit
        </MenuItemLink>
      </MenuContainer>
    </Container>
  );
}

export default Aside;