import { Vex, Stave, StaveNote, Formatter } from "vexflow";
import React, { useRef, useEffect } from "react";

import Canvas from "../components/Canvas";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    //Our first draw
    // context.fillStyle = "#000000";
    // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    const vexflow = () => {
      const VF = Vex.Flow;
      const { Factory, EasyScore, System } = Vex.Flow;

      const vf = new Factory({
        renderer: { elementId: "canvas", width: 500, height: 200 }
      });

      const score = vf.EasyScore();
      const system = vf.System();

      system
        .addStave({
          voices: [
            score.voice(score.notes("C#5/q, B4, A4, G#4", { stem: "up" }))
            // score.voice(score.notes("C#4/h, C#4", { stem: "down" }))
          ]
        })
        .addClef("treble")
        .addTimeSignature("4/4");

      vf.draw();
    };
    vexflow();
  }, []);

  return <Canvas id="canvas" canvasRef={canvasRef} />;
}
