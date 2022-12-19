import { useState } from "react";
import styled from "@emotion/styled";
import { Box, Link } from "@mui/material";
import "../styles/globals.css";

import { Viewer } from "../features/Viewer";

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid black;
  background-color: #eee;
`;

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Box display="flex">
      <Box display="flex" flexDirection="column" width="100%" height="100vh">
        <Navigation>
          <Link href="/">All</Link>
          <Link href="/random">Random</Link>
        </Navigation>
        <Component {...pageProps} />
      </Box>
      {isOpen ? (
        <Viewer url="https://cnn.com" handleClose={() => setIsOpen(false)} />
        ) : null}
    </Box>
  );
}

export default MyApp;
