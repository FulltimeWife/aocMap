import React, { useEffect } from 'react';
import './App.css';
import { useCanvas } from "./hooks/useCanvas";
import HoUMap from './HoUMap.jpg'



const App = () => {

  const [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight ] = useCanvas();

  const handleCanvasClick=(event)=> {
    const currentCoordinate = { x: event.clientX, y:event.clientY };
    setCoordinates([...coordinates, currentCoordinate])
  };

  const handleClearCanvas=(event)=> {
    setCoordinates([]);
  }

  return ( 
    <main className="app-main">
      <div className="clear-button">
        <button onClick={handleClearCanvas}>Clear Screen</button>
      </div>
      <canvas 
        className="app-canvas"
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ backgroundImage: `url(${HoUMap})`}}
        onClick={handleCanvasClick}
         />
    </main>
  )
}

export default App;
