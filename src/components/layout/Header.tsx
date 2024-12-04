import React from "react";
import { Film as IconFilm } from "@styled-icons/heroicons-solid";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  position: relative;
  /* background-color: #000;  #127369;#10403B;#8AA6A3;#4C5958;#BFBFBF; */
`;

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 2rem 2rem;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #127369;
  padding: 0.25rem 1rem;
  border-radius: 1.25rem;

  h1 {
    padding: 0;
    margin: 0.5rem;
  }
`;

const StyledIconFilm = styled(IconFilm)`
  margin: 0 0.25rem;
  line-height: 1.5;
`;

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo>
          <StyledIconFilm size={32} />
          <h1>Cinegood</h1>
        </Logo>
        {children && <div>{children}</div>}
      </HeaderContainer>
    </StyledHeader>
  );
}
