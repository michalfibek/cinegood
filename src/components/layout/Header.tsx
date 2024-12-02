import { Film as IconFilm } from "@styled-icons/heroicons-solid";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  position: relative;
  /* background-color: #000; */
  padding: 1rem 0;
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #10403b;
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
      <StyledHeaderContainer>
        <Logo>
          <StyledIconFilm size={32} />
          <h1>Cinegood</h1>
        </Logo>
        {children && <div>{children}</div>}
      </StyledHeaderContainer>
    </StyledHeader>
  );
}
