import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: "1400px",
        margin: "0 auto",
    },
    itemWrap: {
        position: "relative",
    },
    wrap: {
        display: "flex",
        justifyContent: "center",
    },
}));