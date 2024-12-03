import styled from "styled-components";
import { getVisiblePages } from "../../utility/getVisiblePages";

const PaginatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
`;

const PaginatorItemCount = styled.div`
  display: block;
  margin: 2rem 1rem;
`;

const PaginatorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
`;

const PaginatorLink = styled.a<{ $active: number }>`
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem;
  min-width: 2.5rem;
  text-align: center;
  border-radius: 1rem;
  color: ${({ $active }) => ($active ? "#4c5958" : "#7ea19e")};
  background-color: ${({ $active }) => ($active ? "#7ea19e" : "#4c5958")};
`;

const PageSeparator = styled.span`
  display: inline-block;
  padding: 0.5rem;
  letter-spacing: 2px;
`;

type PaginatorProps = {
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
};

export default function Paginator({
  totalCount,
  currentPage,
  itemsPerPage,
  onPageChange,
}: PaginatorProps) {
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <PaginatorContainer>
      <PaginatorItemCount>
        Page {currentPage} from {pageCount}
      </PaginatorItemCount>
      <PaginatorList>
        {getVisiblePages(pageCount, currentPage).map((pageNumber, index) => {
          if (pageNumber === "...") {
            return <PageSeparator key={`ellipsis-${index}`}>...</PageSeparator>;
          }

          return (
            <PaginatorLink
              $active={+(pageNumber === currentPage)}
              key={pageNumber}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </PaginatorLink>
          );
        })}
      </PaginatorList>
    </PaginatorContainer>
  );
}
