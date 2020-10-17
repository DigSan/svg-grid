import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Chart } from './features/chart/Chart';
import { ScalableText } from './features/chart/ScalableText';
import { ScalableCircle } from './features/chart/ScalableCircle';
import { AutoScroll } from './features/chart/AutoScroll';
import { Grid } from './features/chart/Grid';
function App() {
  const data = [
    { x: 10, y: 20 },
    { x: 20, y: 25 },
    { x: 30, y: 15 },
    { x: 35, y: 15 },
    { x: 45, y: 5 }
  ];
  const [rotation, setRotation] = useState(0);

  const gantData = [
    10,
    15,
    11,
    25,
    47
  ]
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <body>
        <div style={{ height: "500px", margin: "20px" }}>
          <Chart rotation={rotation} >
            <Grid></Grid>
            <AutoScroll zoom={1} position={{ x: 0, y: 0 }} rotation={0}>
              {/* {gantData.map((x, i) => <rect x={15 * i} y={10} height={10 * x} width={10} fill='green'> </rect>)} */}
              {/* <circle cx="90" cy="90" r="30"></circle>
              <ScalableCircle x={190} y={190} /> */}
              <polyline points={data.map((e) => `${e.x},${-e.y}`).join(' ')} vectorEffect="non-scaling-stroke" fill="none" stroke="white" strokeWidth="1px" />
              {data.map(point => <ScalableText x={point.x} y={-point.y} />)}

            </AutoScroll>
          </Chart>
        </div>
        <button onClick={() => setRotation(rotation + 4)}>Rotation</button>
      </body>
    </div>
  );
}

export default App;
