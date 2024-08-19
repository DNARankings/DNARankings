// src/Table.js
import React, { useMemo , useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Tooltip } from 'react-tooltip';
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
          else if(key === '备注'){
            return {
              Header: key,
              accessor: key,
              Cell: ({ value }) => (
                <RemarkCell remark={value} />
              ),
              // width: 400,
            }
          }
          // 使用脚注：
          // else if (key === '最大数据产出/Run') {
          //   return {
          //     Header: () => (
          //       <div>
          //         {key} <sup>1</sup>
          //       </div>
          //     ),
          //     accessor: key,
          //   }
          // }
          // else if (key === 'Estimated throughput (MB/S)') {
          //   return {
          //     Header: () => (
          //       <div>
          //         {key} <sup>2</sup>
          //       </div>
          //     ),
          //     accessor: key,
          //   }
          // }
          // 使用tooltip：
          else if (key === '最大数据产出/Run') {
            return {
              Header: () => (
                <div data-tooltip-id="tooltip" data-tooltip-content='表格中的 "Tb" 表示 "Terabase"。"Gb" 同理。'>
                  {key} <span style={{ cursor: 'pointer' }}><sup>①</sup></span>
                </div>
              ),
              accessor: key,
            }
          }
          else if (key === 'Estimated throughput (MB/S)') {
            return {
              Header: () => (
                <div data-tooltip-id="tooltip" data-tooltip-content="Estimated throughput中每个碱基按照 2 bits 计算。">
                  {key} <span style={{ cursor: 'pointer' }}><sup>②</sup></span>
                </div>
              ),
              accessor: key,
            }
          }
          
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
  <div>
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
    
    <Tooltip id="tooltip" place="top" type="dark" effect="solid" />
  </div>
  );
};


// 备注列
const RemarkCell = ({ remark }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', cursor: 'pointer', 
        maxWidth: '2000px', 
        // 设置宽度为250%，使得一行不会太短
        width: '250%',
        // overflow: 'hidden', 
        // textOverflow: 'ellipsis', 
        // whiteSpace: 'nowrap' 
      }}
    >
      {/* 备注内容只在悬停时显示 */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '5px',
          zIndex: 1,
          whiteSpace: 'normal',
          // maxWidth: '3000px', // 最大宽度
          wordWrap: 'break-word', // 允许换行
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 阴影
          borderRadius: '4px', // 圆角
          left: -20, // 确保备注框在左侧
          top: '100%', // 确保备注框在单元格下方
        }}>
          {remark ? remark : '无'}
        </div>
      )}
      {/* 表格内的内容保持不变 */}
      {/* 调整大小 */}
      <span style={{ visibility: isHovered ? 'hidden' : 'visible', fontSize:'90%'}}>&nbsp;&nbsp;&nbsp;💡&nbsp;&nbsp;&nbsp;</span>
    </div>
  );
};

export default Table;