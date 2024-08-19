// with nav
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Table from './Table';
import './Footnote.css';

const CSVReader = ({ fileName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 由于添加了homepage，所以需要修改fetch的路径
    // 原本是'/DNA synthesis.csv'，现在是'/DNARankings/DNA synthesis.csv'
    fetch(`${process.env.PUBLIC_URL}/${fileName}`)
    // fetch(`/${fileName}`)
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      });
  }, [fileName]);

  return (
    <div>
      {data.length > 0 ? <Table data={data} /> : <p>Loading...</p>}
      {/* 脚注，表明Gb、Tb等单位中b的含义为base，而非byte或bit */}
      <div className="footnote">

        <div className="footnote-left">
          {
            fileName === 'DNA sequencing.csv' ? 
            // <footer style={{ textAlign: 'right', fontSize: '0.9em', color: '#666', marginTop: '10px' }}>
            // <footer style={{ textAlign: 'left', fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
            <footer>
              {/* <p>注：表格中的 "Tb" 表示 "Terabase" 而非 "Terabyte" 或 "Terabit"。"Gb" 同理。</p> */}
              {/* <p><sup>1</sup> 表格中的 "Tb" 表示 "Terabase" 而非 "Terabyte" 或 "Terabit"。"Gb" 同理。</p> */}
              <p style={{margin:1}}><sup>①</sup> 表格中的 "Tb" 表示 "Terabase"。"Gb" 同理。</p>
              <p style={{margin:1}}><sup>②</sup> Estimated throughput中，将每个碱基按照 2 bits 计算。</p>
            </footer> : null
          }
        </div>
        <div className="footnote-right">
          {/* <footer className="footnote-left" style={{ textAlign: 'right', fontSize: '0.9em', marginTop: '10px' }}>数据为人工整理，欢迎大家指正、补充</footer> */}
          <footer>
            数据为人工整理，欢迎大家指正、补充到 
            <a href="https://github.com/DNARankings/DNARankings-Data" style={{ textDecoration: 'underline', color: 'DarkGreen'}} target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </footer>
        </div>
        {/* <footer className="footnote-right">数据为人工整理，欢迎大家指正、补充</footer> */}
      </div>
    </div>
  );
};

export default CSVReader;