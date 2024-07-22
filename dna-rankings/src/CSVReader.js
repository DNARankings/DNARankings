// with nav
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Table from './Table';

const CSVReader = ({ fileName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/${fileName}`)
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