import styled from 'styled-components';

const cellStyling = `
  border-bottom: 1px solid #32394e;
  padding: 8px 12px;
`;

const edgePadding = `
  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

export const Container = styled.div`
  margin-top: 48px;
  width: 100%;
`;

export const Heading = styled.h1`
  color: #f6f6f6;
  font-size: 15px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 13px;
  width: 100%;
`;

export const Td = styled.td`
  ${cellStyling}
  ${edgePadding}
`;

export const Th = styled.th`
  font-weight: 600;
  text-align: left;

  ${cellStyling}
  ${edgePadding}
`;
