import main from "vexflow";
import React, { useRef, useEffect } from "react";

import Canvas from "../components/Canvas";


export default function App() {
    
    const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    context.fillStyle = "#000000";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);
  
  
  return (
    <div>
        
      <Canvas canvasRef={canvasRef} />
      
    </div>
  );
}
