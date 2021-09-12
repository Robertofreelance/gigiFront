import React from "react";
import {Box,  } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Nothing(props) {
  const {fullHeight, topPad, min } = props
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      pt={topPad ? 3 : 0}
      height={fullHeight ? "100%" : "auto"}
      minHeight={min ? "60vh" : "30vh"}
      flexDirection="column"
    >
      <CircularProgress size={62} />
    </Box>
  );
}
