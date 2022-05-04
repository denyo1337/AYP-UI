import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: theme.spacing(60),
        marginTop: theme.spacing(30)
    },
    container: {
        width: '100%',
        height: '800px'
    },
    profileContainer: {
        width: '100%',
        height: "100%"
    }
}));

const Loader = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress
                color="secondary"
                size="300px" />
        </div>
    );
}

export default Loader;