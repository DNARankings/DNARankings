import React from 'react';
import './Navbar.css';

// const Navbar = ({ files, currentFile, setCurrentFile }) => {
//   return (
//     <nav>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>
//             <button
//               onClick={() => setCurrentFile(file)}
//               style={{
//                 fontWeight: currentFile === file ? 'bold' : 'normal',
//                 textDecoration: currentFile === file ? 'underline' : 'none',
//               }}
//             >
//               {file.replace('.csv', '').replace('_', ' ')}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };



const Navbar = ({ files, currentFile, setCurrentFile }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <button
            onClick={() => setCurrentFile('Overview')}
            className={currentFile === 'Overview' ? 'active' : ''}
          >
            Overview
          </button>
        </li>
        {files.map((file, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentFile(file)}
              className={currentFile === file ? 'active' : ''}
            >
              {file.replace('.csv', '').replace('_', ' ')}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default Navbar;