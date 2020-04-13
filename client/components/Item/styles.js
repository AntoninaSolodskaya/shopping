import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    root: {
        maxWidth: 450,
    },
    media: {
        height: 300,
    },
    cardBtn: {
        display: "flex",
        justifyContent: "center"
    },
    cardTitle: {
        backgroundColor: theme.palette.primary.main,
        padding: 20,
        '& a': {
            color: "#ffffff",
        },
    },
    badge: {
        backgroundColor: theme.palette.primary.main,
        transform: "rotate(5deg)",
        color: "#ffffff",
        fontWeight: 600,
        padding: "5px",
        lineHeight: 1,
        fontSize: "40px",
        display: "inline-block",
        position: "absolute",
        top: "2px",
        right: "12px",
    },
    amountSpan: {
        backgroundColor: theme.palette.error.main,
        transform: "rotate(5deg)",
        color: "#ffffff",
        fontWeight: 600,
        padding: "5px",
        lineHeight: 1,
        fontSize: "40px",
        display: "inline-block",
        position: "absolute",
        bottom: 107,
        right: 12,
    },
    styleLink: {
        textDecoration: "none",
        margin: "3px 9px",
    },
}));