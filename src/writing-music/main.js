// import { Vex, Stave, StaveNote, Formatter } from "vexflow";
// import React, { useRef, useEffect } from "react";

// import Canvas from "../components/Canvas";

// export default function App() {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     //Our first draw
//     // context.fillStyle = "#000000";
//     // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

//     const vexflow = () => {
//       const VF = Vex.Flow;
//       const stave = new Stave(10, 40, 400);

//       // Add a clef and time signature.
//       stave.addClef("treble").addTimeSignature("4/4");

//       // Connect it to the rendering context and draw!
//       stave.setContext(context);
//       console.log(stave);
//     };
//     vexflow();
//   }, []);

//   return (
//     <div>
//       <Canvas canvasRef={canvasRef} />
//     </div>
//   );
// }

import React, { useRef, useEffect } from "react";


const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

const clefAndTimeWidth = 60;

export default function Score({
  staves = [],
  clef = "treble",
  timeSignature = "4/4",
  width = 450,
  height = 150,
})
export default function Scor()
 {
  const container = useRef();
  const rendererRef = useRef();
  useEffect(() => {
    if (rendererRef.current == null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      );
    }
    const renderer = rendererRef.current;
    renderer.resize(width, height);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    const staveWidth = (width - clefAndTimeWidth) / staves.length;

    let currX = 0;
    staves.forEach((notes, i) => {
      const stave = new Stave(currX, 0, staveWidth);
      if (i === 0) {
        stave.setWidth(staveWidth + clefAndTimeWidth);
        stave.addClef(clef).addTimeSignature(timeSignature);
      }
      currX += stave.getWidth();
      stave.setContext(context).draw();

      const processedNotes = notes
        .map((note) => (typeof note === "string" ? { key: note } : note))
        .map((note) =>
          Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        )
        .map(({ key, ...rest }) =>
          typeof key === "string"
            ? {
                key: key.includes("/") ? key : `${key[0]}/${key.slice(1)}`,
                ...rest,
              }
            : rest
        )
        .map(
          ({ key, keys, duration = "q" }) =>
            new StaveNote({
              keys: key ? [key] : keys,
              duration: String(duration),
            })
        );
      Formatter.FormatAndDraw(context, stave, processedNotes, {
        auto_beam: true,
      });
    });
  }, [staves]);

  return <div ref={container} />;
}
