import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  return <canvas ref={props.canvasref} {...props} />;
};

export default Canvas;
