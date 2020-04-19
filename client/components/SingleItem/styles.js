import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }
}));