import React from 'react';

const Navbar = ({ files, currentFile, setCurrentFile }) => {
  return (
    <nav>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <button
              onClick={() => setCurrentFile(file)}
              style={{
                fontWeight: currentFile === file ? 'bold' : 'normal',
                textDecoration: currentFile === file ? 'underline' : 'none',
              }}
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