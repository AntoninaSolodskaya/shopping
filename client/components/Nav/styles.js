import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        '& .MuiPaper-elevation4': {
            boxShadow: "none",
        },
    },
    linkWrap: {
       display: "flex",
       justifyContent: "space-around",
    },
    title: {
        color: "#FFFFFF",
        textDecoration: "none",
        fontSize: "16px",
        fontFamily: "Roboto",
        textTransform: "uppercase",
    },
}));