import React, { useState, useEffect } from 'react';
import './App.css';
import scriptjs from 'scriptjs';
import { MSF_2_3_4_MIN_JS } from './vendor';

const LOGGER_LENGTH = 20;

function App() {
  const [logger, updateLogger] = useState([]);

  const logOnScreen = (newLog) => {
    updateLogger((prevLog) => {
      if (prevLog.length >= LOGGER_LENGTH) {
        return [...prevLog.slice(1, LOGGER_LENGTH), newLog];
      }

      return [...prevLog, newLog];
    });
  };

  useEffect(() => {
    scriptjs(MSF_2_3_4_MIN_JS, () => {
      logOnScreen("Carregou script do SmartView SDK!");

      window.msf.search((err, services) => {
        logOnScreen("Entrou no msf.search!");
        if (err) logOnScreen(`Erro ao conectar ao canal: ${err}`);
        logOnScreen(`Services: ${services.length}`);
      });
    });
  }, []);

  return (
    <div className="app">
      <h1>Poc Wifi!</h1>
      {logger.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
}

export default App;
