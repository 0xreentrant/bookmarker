import { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { Close } from "@mui/icons-material";

export const Viewer = ({ url, handleClose }) => {
  const ref = useRef(null);
  const [parentWidth, setParentWidth] = useState(0);

  // get height of parent container so our list can match it
  useEffect(() => {
    // need ResizeObserver used because it's 0 px originally
    const resizeObserver = new ResizeObserver((event) => {
      const height = event[0].contentBoxSize[0].blockSize;
      setParentWidth(height);
    });

    resizeObserver.observe(ref.current.parentElement);
  }, [ref]);

  return (
    <Box flex="1" ref={ref}>
      <Close onClick={handleClose} />
      <iframe src={url} width={parentWidth} />
    </Box>
  );
};
