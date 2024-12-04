import React from "react";
import styled from "styled-components";

const ErrorMessageStyled = styled.div`
  text-align: center;
  font-size: 1.25rem;
`;

export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <ErrorMessageStyled>{children}</ErrorMessageStyled>;
}
