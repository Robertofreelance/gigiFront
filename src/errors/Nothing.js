import React from "react";
import {Box, Typography} from "@material-ui/core"
import ErrorIcon from "@material-ui/icons/Error";
export default function Nothing(props) {
  const {text, fullHeight, top, min} = props
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      pt={top ? 12 : 0}
      minHeight={min ? "65vh" : "auto"}
      height={fullHeight ? "100%" : "auto"}
      flexDirection="column"
    >
      <ErrorIcon style={{fontSize: "62px"}} />

      <Typography variant="h5" align="center">
        {text}
      </Typography>
    </Box>
  );
}
