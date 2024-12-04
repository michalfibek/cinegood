import React from "react";
import { Film as IconFilm } from "@styled-icons/heroicons-solid";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  max-width: 600px;
  position: relative;
  margin: 2rem auto 0;
  /* background-color: #000;  #127369;#10403B;#8AA6A3;#4C5958;#BFBFBF; */
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 2rem;

  h1 {
    padding: 0;
    margin: 0.5rem;
    font-size: 3rem;
    color: #8aa6a3;
  }
`;

const StyledIconFilm = styled(IconFilm)`
  margin: 0 0.25rem;
  line-height: 1.5;
  color: #8aa6a3;
`;

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo>
          <StyledIconFilm size={32} />
          <h1>Cinegood</h1>
        </Logo>
        {children && children}
      </HeaderContainer>
    </StyledHeader>
  );
}
