// with nav
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Table from './Table';

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
    </div>
  );
};

export default CSVReader;