import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core'
import { useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useAuthContext } from '../hooks/useAuthContext';
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
    const [steamUrl, setSteamUrl] = useState(props.userDetails.steamCommunityUrl ?? "");
    const [phoneNumber, setPhoneNumber] = useState(props.userDetails.phoneNumber ?? "");
    const [nationality, setNationality] = useState(props.userDetails.nationality);
    const [lastLogin, setLastLogIn] = useState(props.userDetails.lastLogOn);
    const [isEditMode, setIsEditMode] = useState(false);
    const {user} = useAuthContext();
    const handleResetFormToPropsData = () =>{
        setEmail(props.userDetails.email);
        setNickName(props.userDetails.nickName);
        setSteamUrl(props.userDetails.steamCommunityUrl ?? "");
        setPhoneNumber(props.userDetails.phoneNumber ?? "");
        setNationality(props.userDetails.nationality);
    }
    const handleCancledEditMode = () =>{
        debugger;
        setIsEditMode(false)
        handleResetFormToPropsData();
    }

    return (
        <Grid container className={classes.root} >
            <Paper elevation={5} >
                {!user.avatarImage &&
                    <Avatar
                        variant="circle"
                        src="/Account-icon.svg"
                        className={classes.avatar}
                    />
                }
                {user.avatarImage &&

                    <Avatar
                        variant="circle"
                        src="/Account-icon.svg"
                        className={classes.avatar}
                    />
                }
                <Grid item >
                    {!isEditMode &&
                    <Button
                        className={classes.editButton}
                        startIcon={<EditIcon />}
                        variant="outlined"
                        size="small"
                        onClick={()=> setIsEditMode(prev => !prev)}
                        >
                        Edit
                    </Button> 
                    }
                    {isEditMode &&
                    <Button
                        className={classes.editButton}
                        startIcon={<CancelIcon />}
                        variant="outlined"
                        size="small"
                        onClick={()=> handleCancledEditMode()}
                        >
                        cancel
                    </Button> 
                    }
                </Grid>
                <form onSubmit={(e) => console.log(e)}>
                    <TextField
                        value={email}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled = {!isEditMode}
                    />
                    <TextField
                        value={nickName}
                        label="Nick Name"
                        onChange={(e) => setNickName(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled = {!isEditMode}

                    />
                    <TextField
                        value={steamUrl}
                        label="Community Url"
                        onChange={(e) => setSteamUrl(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled = {!isEditMode}

                    />
                    <TextField
                        value={phoneNumber}
                        label="Phone number"
                        type="number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled = {!isEditMode}

                    />
                    <TextField
                        value={nationality}
                        label="Nationality"
                        onChange={(e) => setNationality(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled = {!isEditMode}

                    />
         
                    <TextField
                        value={lastLogin}
                        label="Last login"
                        onChange={(e) => setLastLogIn(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled
                    />
                    {isEditMode &&
                    <Grid
                     item
                     style={{
                         textAlign:"center"
                     }}
                    >
                        <Button
                        type='submit'
                        variant="contained"
                        startIcon={<SaveIcon size='small'/>}
                        size='large'
                        color='secondary'
                        >
                            Save
                        </Button>
                    </Grid>
                        }
                </form>
            </Paper>
        </Grid>
    );
}

export default MyAccountDetails;