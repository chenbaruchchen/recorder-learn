import Canvas from "../components/Canvas";

import { useEffect, useRef } from "react";
import { Vex, Stave, StaveNote, Formatter } from "vexflow";

export default function MusicSheet(props) {
  const elementRef = useRef();

  function getNotesObjectFromProps(VF) {
    console.log(props);

    let notes = [
      // A quarter-note C.
      new VF.StaveNote({ clef: "treble", keys: ["c/4"], duration: "q" }),

      // A quarter-note D.
      new VF.StaveNote({ clef: "treble", keys: ["d/4"], duration: "q" }),

      // A quarter-note rest. Note that the key (b/4) specifies the vertical
      // position of the rest.
      new VF.StaveNote({ clef: "treble", keys: ["b/4"], duration: "qr" }),

      // A C-Major chord.
      new VF.StaveNote({
        clef: "treble",
        keys: ["c/4", "e/4", "g/4"],
        duration: "q"
      })
    ];
    if (!props.notes) return notes;
    notes = props.notes.map((note) => {
      let newNote = new VF.StaveNote({
        clef: "treble",
        keys: [note],
        duration: "q"
      });

      return newNote;
    });
    return notes;
  }
  useEffect(() => {
    const divElement = elementRef.current;

    const VF = Vex.Flow;

    // We created an object to store the information about the workspace
    var WorkspaceInformation = {
      // The <canvas> element in which you're going to work
      canvas: divElement,
      // Vex creates a canvas with specific dimensions
      canvasWidth: 500,
      canvasHeight: 500
    };

    // Create a renderer with Canvas
    var renderer = new VF.Renderer(
      WorkspaceInformation.canvas,
      VF.Renderer.Backends.CANVAS
    );

    // Use the renderer to give the dimensions to the canvas
    renderer.resize(
      WorkspaceInformation.canvasWidth,
      WorkspaceInformation.canvasHeight
    );

    // Expose the context of the renderer
    var context = renderer.getContext();

    // And give some style to our canvas
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    /**
     * Creating a new stave
     */
    // Create a stave of width 400 at position x10, y40 on the canvas.
    var stave = new VF.Stave(10, 40, 400);
    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");
    // Set the context of the stave our previous exposed context and execute the method draw !
    stave.setContext(context).draw();

    var notes = getNotesObjectFromProps(VF);

    // Create a voice in 4/4 and add above notes
    var voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.setStrict(false);
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, stave);
  });
  // console.log(reference);
  return <Canvas canvasref={elementRef} />;
}
