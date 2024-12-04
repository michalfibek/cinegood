import { useRef } from "react";
// import Button from "./Button";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  gap: 0.5rem;

  input {
    flex: 1;
  }
`;

export default function SearchBar({
  searchText,
  onSearchTextChange,
}: {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}) {
  const inputRef = useRef(null);

  return (
    <StyledSearchBar>
      <input
        ref={inputRef}
        type="text"
        placeholder="Movie name..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        autoFocus
      />
      {/* <Button>Search</Button> */}
    </StyledSearchBar>
  );
}
