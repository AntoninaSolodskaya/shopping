import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    list: {
        width: 650,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
    },
    title: {
        width: '100%',
        color: theme.palette.primary.main,
        fontFamily: "Bangers, cursive",
        textTransform: "uppercase",
    },
    footer: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(2),
    },
    btn: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(2),
    },
    icon: {
        paddingLeft: 10,
    },
}));