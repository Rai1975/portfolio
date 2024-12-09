import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommandLineNavigation = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCommand = (command) => {
    setError(''); // Clear any previous errors

    // Parse the command
    const parts = command.trim().split(' ');
    let x = false;

    if (command === 'sudo rm -fr ./*'){
        navigate('/error');
        x = true;
    }

    if (parts[0] === 'cd') {
      if (parts[1] === '../' || parts[1] === 'home') {
        navigate('/'); // Go to home
      } else if (parts[1] === 'about') {
        navigate('/about'); // Go to About page
      } else if (parts[1] === 'projects') {
        navigate('/projects'); // Go to Projects page
      } else if (parts[1] === 'experience' || parts[1] === 'experiences') {
        navigate('/experiences'); // Go to Experiences page
      } else {
        setError(`Error: '${parts[1]}' is not a valid directory.`);
      }
    } else if (parts[0] === 'help') {
      setError(`Available commands:
      - cd [directory]: Navigate to a page (e.g., cd about, cd ../).
      - help: Show this help message.
      !! DO NOT use sudo commands`);
    } else if  (x === false) {
      setError(`Error: '${command}' is not a valid command. Type 'help' for assistance.`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Consolas, monospace',
        padding: '10px 15px',
        boxSizing: 'border-box',
        borderTop: '2px solid #00ff00',
        zIndex: 1000,
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px' }}></span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Use commands to navigate! (e.g., cd about to go to About Me)"
          style={{
            backgroundColor: 'transparent',
            color: '#00ff00',
            border: 'none',
            outline: 'none',
            flexGrow: 1,
            fontSize: '16px',
            fontFamily: 'Consolas, monospace', // Apply Consolas font here
          }}
        />
      </form>
      {error && (
        <div
          style={{
            color: 'red',
            marginTop: '5px',
            fontSize: '14px',
            fontFamily: 'Consolas, monospace', // Ensure error text uses Consolas
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default CommandLineNavigation;
