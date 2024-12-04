import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 1.5rem;
  border-radius: 2rem;
`;

const LoaderElm = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: #fff #4c5958 #4c5958 #4c5958;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  animation: spin 3s infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderText = styled.div`
  margin-left: 1rem;
`;

export default function Loader({ children }: { children?: React.ReactNode }) {
  return (
    <Container>
      <LoaderElm />
      {children && (
        <>
          {" "}
          <LoaderText>{children}</LoaderText>
        </>
      )}
    </Container>
  );
}
