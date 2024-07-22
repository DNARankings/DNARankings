import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// import CSVTable from './CSVTable';
import CSVReader from './CSVReader';
import Navbar from './Navbar';

// function App() {
//   return (
//     <div className="App">
      
//       <h1>DNA synthesizers</h1>
//       {/* <CSVTable /> */}
//       <CSVReader />
//     </div>
//   );
// }
const App = () => {
  const files = ['DNA synthesis.csv', 'DNA sequencing.csv'];
  const [currentFile, setCurrentFile] = useState(files[0]);

  return (
    <div className="App">
      <h1>DNA Rankings</h1>
      <Navbar files={files} currentFile={currentFile} setCurrentFile={setCurrentFile} />
      <CSVReader fileName={currentFile} />
    </div>
  );
};

export default App;
