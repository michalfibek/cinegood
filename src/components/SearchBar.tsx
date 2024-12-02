import { useRef } from "react";
import Button from "./common/Button";

export default function SearchBar({
  searchText,
  onSearchTextChange,
}: {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}) {
  const inputRef = useRef(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
      />
      <Button>Search</Button>
    </div>
  );
}
