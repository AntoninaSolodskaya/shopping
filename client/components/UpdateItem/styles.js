import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    form: {
        margin: 10,
        maxWidth: "95%",
    },
    item: {
        fontFamily: "Bangers, cursive",
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        position: "relative",
        zIndex: 2,
        transform: "skew(-9deg)",
        marginLeft: "2rem",
    },
    margin: {
        margin: 10,
    },
    marginInput: {
        marginTop: 20,
    },
    inputWrap: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 10,
    },
    btnWrap: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 20,
    },
}));