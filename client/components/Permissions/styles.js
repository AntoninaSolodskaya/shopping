import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    paper: {
        minWidth: 300,
        maxWidth: 1200,
        margin: "auto",
        '& .MuiTableHead-root': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiTableCell-head': {
                color: "#ffffff",
            }
        },
    },
    wrap: {
        margin: 20,
    },
    table: {
        minWidth: 650,
    },
    btn: {
        backgroundColor: "#32CD32",
        color: "#ffffff",
        '&:hover': {
            backgroundColor: "#3CB371",
        }
    },
}));