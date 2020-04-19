import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    block: {
        flexGrow: 1,
    },
    wrap: {
        maxWidth: 1400,
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        padding: 20,
    },
    pagination: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "30%",
        padding: 20,
    },
    prev: {
        display: "flex",
        alignItems: "center",
        color: "#FFFFFF",
        outline: "none",
        textDecoration: "none",
    },
}));