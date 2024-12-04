import React from "react";
import styled from "styled-components";

const MainContentStyled = styled.main`
  flex: 1;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export default function MainContent({ children }: { children: React.ReactNode }) {
  return <MainContentStyled>{children}</MainContentStyled>;
}
