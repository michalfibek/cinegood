import React from "react";
import styled from "styled-components";

const Label = styled.strong`
  color: #8aa6a3;
`;

const MovieRecordStyled = styled.p`
  margin: 0.75rem 0;
  line-height: 1.2;
`;

type RecordProps<T> = {
  record: T;
  label?: string;
  onFormat?: (record: T) => React.ReactNode;
};

export default function MovieRecord<T>({
  record,
  label,
  onFormat,
}: RecordProps<T>): React.ReactElement | null {
  if (record == null) return null;

  const formattedRecord: React.ReactNode = onFormat ? onFormat(record) : String(record);

  return (
    <MovieRecordStyled>
      {label && <Label>{label}:</Label>} {formattedRecord}
    </MovieRecordStyled>
  );
}
