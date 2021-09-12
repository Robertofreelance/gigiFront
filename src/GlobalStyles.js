import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  "@global": {
    /**
     * Disable the focus outline, which is default on some browsers like
     * chrome when focusing elements
     */
    "*:focus": {
      outline: 0,
    },
    ".text-white": {
      color: theme.palette.common.white,
    },
    "h2, h3, h4, h5, h6": {
      fontFamily: "Helvica !important",
    },
    h1: {
      fontFamily: "MV Boli !important",
    },
    ".listItemLeftPadding": {
      paddingTop: `${theme.spacing(1.75)}px !important`,
      paddingBottom: `${theme.spacing(1.75)}px !important`,
      paddingLeft: `${theme.spacing(4)}px !important`,
      [theme.breakpoints.down("sm")]: {
        paddingLeft: `${theme.spacing(4)}px !important`,
      },
      "@media (max-width:  420px)": {
        paddingLeft: `${theme.spacing(1)}px !important`,
      },
    },
    ".container": {
      width: "100%",
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      marginRight: "auto",
      marginLeft: "auto",
      [theme.breakpoints.up("sm")]: {
        maxWidth: 540,
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: 720,
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: 1170,
      },
    },
    ".row": {
      display: "flex",
      flexWrap: "wrap",
      marginRight: -theme.spacing(2),
      marginLeft: -theme.spacing(2),
    },
    ".container-fluid": {
      width: "100%",
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      marginRight: "auto",
      marginLeft: "auto",
      maxWidth: 1370,
    },
    ".lg-mg-top": {
      marginTop: `${theme.spacing(20)}px !important`,
      [theme.breakpoints.down("md")]: {
        marginTop: `${theme.spacing(18)}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: `${theme.spacing(16)}px !important`,
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: `${theme.spacing(14)}px !important`,
      },
    },
    ".lg-mg-bottom": {
      marginBottom: `${theme.spacing(20)}px !important`,
      [theme.breakpoints.down("md")]: {
        marginBottom: `${theme.spacing(18)}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: `${theme.spacing(16)}px !important`,
      },
      [theme.breakpoints.down("xs")]: {
        marginBottom: `${theme.spacing(14)}px !important`,
      },
    },
    ".lg-p-top": {
      paddingTop: `${theme.spacing(20)}px !important`,
      [theme.breakpoints.down("md")]: {
        paddingTop: `${theme.spacing(18)}px !important`,
      },
      [theme.breakpoints.down("sm")]: {
        paddingTop: `${theme.spacing(16)}px !important`,
      },
      [theme.breakpoints.down("xs")]: {
        paddingTop: `${theme.spacing(14)}px !important`,
      },
    },
    li: {
      fontSize: 18,
    },
    ".text-center": {
      textAlign: "center",
    },
    ".MuiTableCell-head, .MuiTableCell-body": {
      color: "#fff",
      fontSize: "18px",
    },
    ".MuiSelect-select": {
      minWidth: 120
    },
    "*::-webkit-scrollbar": {
      "-webkit-appearance": "none",
    },
    "*::-webkit-scrollbar-track": {
      borderRadius: 10,
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#797979",
      borderRadius: 20,
      border: "2px solid #f1f2f3",
    },
    "*::-webkit-scrollbar:horizontal": {
      height: "10px",
    },
    "*::-webkit-scrollbar:vertical": {
      width: "10px",
    },
    ".MuiListItem-gutters": {
      paddingLeft: "20px",
      paddingRight: "16px",
    },
    "*::-webkit-scrollbar-button:increment,.contenedor::-webkit-scrollbar-button":
      {
        display: "none",
      },
  },
});

function globalStyles() {
  return null;
}

export default withStyles(styles, { withTheme: true })(globalStyles);
