import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  primary?: boolean;
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  background-color: ${(props) => (props.primary ? "#e6fffd" : "#5f5f5f")};
  color: ${(props) => (props.primary ? "#0f0f0f" : "#e6fffd")};
  border: none;
  cursor: pointer;
  border-radius: 1.5rem;
  padding: 1em 1em;
  font-size: 1em;
  font-weight: 600;
  align-items: center;
  font-family: inherit;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${(props) => (props.primary ? "#adfff8" : "#747474")};
    color: ${(props) => (props.primary ? "#0f0f0f" : "#fff")};
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

export default function Button({ children, href, to, onClick, ...rest }: ButtonProps) {
  let Component: React.ElementType = "button";
  if (to) {
    Component = Link;
  } else if (href) {
    Component = "a";
  }
  return (
    <StyledButton as={Component} to={to} href={href} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );
}
