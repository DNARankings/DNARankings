// src/Table.js
import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import './Table.css';

const Table = ({ data }) => {
  const columns = useMemo(
    () =>
      data.length > 0
    // 将原本的将csv中的Source列和Link列合并成一个超链接，并且只显示带超链接的Source（不显示单独的url）
        ? Object.keys(data[0]).filter((key) => key !== 'Link').map((key) => {
          if(key === 'Source'){
            return {
              Header: key,
              accessor: key,
              Cell: ({ row }) => (
                <a href={row.original['Link']} target="_blank" rel="noopener noreferrer">
                  {row.original['Source']}
                </a>
              )
            };
          }
          // else if(key === 'Link'){
          //   return {
          //     // Header: key,
          //     // accessor: key,
          //   }
          // }
          else{
            return {
              Header: key,
              accessor: key,
            }
          }
        }
        
          
          // ({
          //   Header: key,
          //   accessor: key,
          // })
        )
        : [],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;