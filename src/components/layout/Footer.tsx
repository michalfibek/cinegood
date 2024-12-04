import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
  color: #999;
`;

export default function Footer() {
  return <StyledFooter>Created by Michal Fíbek, {new Date().getFullYear()}</StyledFooter>;
}
