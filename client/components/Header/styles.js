import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    bar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#ffffff",
        boxShadow: "inset 20px -2px 20px 0px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
    },
    linkStyle: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        padding: theme.spacing(2),
        fontSize: "20px",
        fontFamily: "Roboto",
        textTransform: "uppercase",
    },
}));