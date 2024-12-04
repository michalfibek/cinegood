import React from "react";
import styled from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  primary?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? "blue" : "gray")};
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;

  &:hover {
    background-color: ${(props) => (props.primary ? "darkblue" : "darkgray")};
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export default function Button({ children }: ButtonProps) {
  return <StyledButton className="button">{children}</StyledButton>;
}
