import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    bar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#B3D6E8",
        boxShadow: "10px 10px 35px -9px rgba(0,0,0,0.65)",
    },
    linkStyle: {
        color: "#000000",
        textDecoration: "none",
        padding: theme.spacing(2),
        fontSize: 60,
        fontFamily: "Bangers, cursive",
        textTransform: "uppercase",
    },
}));