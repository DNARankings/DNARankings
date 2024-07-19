import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useTable } from 'react-table';

function CSVTable() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // 读取 CSV 文件
    fetch('/DNA synthesis.csv')
      .then(response => response.text())
      .then(csvText => {
        // 使用 PapaParse 解析 CSV 数据
        const result = Papa.parse(csvText, { header: true });
        setData(result.data);
		// console.log(result.data[0]);
        // 设置列
        if (result.data.length > 0) {
          const columnHeaders = Object.keys(result.data[0]).map(key => ({
            Header: key,
            accessor: key
          }));
          setColumns(columnHeaders);
        }
      });
  }, []);

  // 使用 react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default CSVTable;