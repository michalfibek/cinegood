import React from "react";
import { Film as IconFilm } from "@styled-icons/heroicons-solid";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  /* max-width: 600px; */
  max-width: 340px;
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

const Logo = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5rem 2rem;
  margin-bottom: 1rem;

  h1 {
    padding: 0;
    margin: 0.5rem;
    font-size: 3rem;
    color: #e6fffd;
    animation: glow 3s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from {
      text-shadow:
        0 0 10px #ffffff60,
        0 0 20px #ffffff60,
        0 0 50px #8aa6a3;
    }
    to {
      text-shadow:
        0 0 20px #ffffff60,
        0 0 30px #e6fffd,
        0 0 80px #e6fffd;
    }
  }
`;

const StyledIconFilm = styled(IconFilm)`
  margin: 0 0.5rem;
  line-height: 1.5;
  color: #e6fffd;
`;

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <Logo href="/">
          <StyledIconFilm size={46} />
          <h1>Cinegood</h1>
        </Logo>
        {children && children}
      </HeaderContainer>
    </StyledHeader>
  );
}
