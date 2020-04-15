import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: theme.spacing(2),
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        '& .MuiLinearProgress-root': {
            height: 6,
        },
    },
}));