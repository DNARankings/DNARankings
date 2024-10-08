import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Box
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableContainer = styled(TableContainer)({
  maxWidth: '80%',
  margin: 'auto',
  border: '1px solid #ccc',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
});

const StyledTableCell = styled(TableCell)({
  border: '1px solid #ccc',
});

function CSVTable() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    // 读取 CSV 文件
    fetch('/DNA synthesis.csv')
      .then(response => response.text())
      .then(csvText => {
        // 使用 PapaParse 解析 CSV 数据
        const result = Papa.parse(csvText, { header: true });
        setData(result.data);

        // 设置列
        if (result.data.length > 0) {
          setColumns(Object.keys(result.data[0]));
          setOrderBy(Object.keys(result.data[0])[0]);
        }
      });
  }, []);

  const handleSortRequest = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const sortedData = data.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box mt={4}>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : 'asc'}
                    onClick={() => handleSortRequest(column)}
                  >
                    {column}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <StyledTableCell key={column}>{row[column]}</StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
}

export default CSVTable;