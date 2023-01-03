import styled from 'styled-components';

export const Table = styled.table`
  border: 1px solid #eff2f7;
  border-collapse: collapse;
  font-size: 13px;
  vertical-align: top;
  width: 100%;

  td,
  th {
    border: 1px solid #eff2f7;
    padding: 8px 12px;
  }

  td {
    word-break: break-all;
  }

  th {
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
  }
`;
