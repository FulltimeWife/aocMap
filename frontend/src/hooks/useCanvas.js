import React, { useState, useEffect, useRef } from "react";
import HoUMap from '../HoUMap.jpg'

const heartSVG = "M0 200 v-200 h200 a100,100 90 0,1 0,200 a100,100 90 0,1 -200,0 z"
const SVG_PATH = new Path2D(heartSVG);

const canvasScale = 0.1;
const canvasOffset = 80;
export const canvasWidth = window.innerWidth;
export const canvasHeight = window.innerHeight;

export function draw (ctx, location) {
  ctx.fillStyle = 'pink';
  ctx.shadowColor = 'red';
  ctx.shadowBlur = 15;
  ctx.save();
  ctx.scale(canvasScale, canvasScale);
  ctx.translate(location.x / canvasScale - canvasOffset + 90, location.y / canvasScale + canvasOffset + 90);
  ctx.rotate(255 * Math.PI / 200);
  ctx.fill(SVG_PATH)
  console.log(`X coordinate: ${location.x / canvasScale - canvasOffset}`)
  console.log(`Y coordinate: ${location.y / canvasScale - canvasOffset}`)
  ctx.restore();
};

export function useCanvas() {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    coordinates.forEach((coordinate) => {draw(ctx, coordinate)});
  });

  return [ coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight]
}
