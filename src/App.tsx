import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Chart } from './features/chart/Chart';
const divStyle = {
  hieght: '500px'
};
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
      <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </body>
      <div style={{height: "300px", margin: "20px"}}>
        <Chart/>
      </div>
    </div>
  );
}

export default App;
