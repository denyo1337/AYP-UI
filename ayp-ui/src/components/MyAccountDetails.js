import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core'
import { useState } from 'react';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: theme.spacing(1),
            margin: theme.spacing(10),
            width: theme.spacing(130),
            height: theme.spacing(100),
        },
    },
    avatar: {
        marginTop: theme.spacing(10),
        margin: "auto",
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    editButton: {
        marginLeft: theme.spacing(110),
        marginBottom: theme.spacing(2)
    },
    formInputs: {
        padding: "0px",
        width: theme.spacing(50),
        borderRadius: "3px",
        boxSizing: "border-box",
        appearance: "none",
        marginLeft: theme.spacing(40),
        borderRadius: '3px',
        marginBottom: theme.spacing(2)

    }
}));
const MyAccountDetails = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState(props.userDetails.email);
    const [nickName, setNickName] = useState(props.userDetails.nickName);
    const [steamNickName, setSteamNickName] = useState(props.userDetails.steamNickName);
    const [phoneNumber, setPhoneNumber] = useState(props.userDetails.phoneNumber);
    const [nationality, setNationality] = useState(props.userDetails.nationality);
    const [gender, setGender] = useState(props.userDetails.gender);
    const [lastLogin, setLastLogIn] = useState(props.userDetails.lastLogOn);


    return (
        <Grid container className={classes.root} >
            <Paper elevation={5} >
                <Avatar
                    variant="circle"
                    src="/Account-icon.svg"
                    className={classes.avatar}
                />
                <Grid item >
                    <Button
                        className={classes.editButton}
                        startIcon={<EditIcon />}
                        variant="outlined"
                        size="small">
                        Edit
                    </Button>
                </Grid>
                <form onSubmit={(e) => console.log(e)}>
                    <TextField
                        value={email}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />
                    <TextField
                        value={nickName}
                        label="Nick Name"
                        onChange={(e) => setNickName(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />
                    <TextField
                        value={steamNickName}
                        label="Steam"
                        onChange={(e) => setSteamNickName(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />
                    <TextField
                        value={phoneNumber}
                        label="Phone number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />
                    <TextField
                        value={nationality}
                        label="Nationality"
                        onChange={(e) => setNationality(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />
                    <TextField
                        value={gender}
                        label="Gender"
                        onChange={(e) => setGender(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />
                    <TextField
                        value={lastLogin}
                        label="Last login"
                        onChange={(e) => setLastLogIn(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                    />

                </form>
            </Paper>
        </Grid>
    );
}

export default MyAccountDetails;