import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core'
import { useEffect, useState } from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useAuthContext } from '../hooks/useAuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAxios from '../hooks/useAxios'
import Typography from '@material-ui/core/Typography';

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
    },
    editSteamIdButton: {
        marginLeft: theme.spacing(5),
        marginTop: theme.spacing(1.5)
    }
}));

const MyAccountDetails = () => {
    const classes = useStyles();
    const history = useHistory()
    const { user, dispatch } = useAuthContext();
    const [email, setEmail] = useState(user.email);
    const [nickName, setNickName] = useState(user.nickName);
    const [steamUrl, setSteamUrl] = useState(user.steamCommunityUrl ?? "");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ?? "");
    const [nationality, setNationality] = useState(user.nationality);
    const [lastLogin, setLastLogIn] = useState(user.lastLogOn);
    const [steamID, setSteamID] = useState(user.steamId)
    const [isSteamIdValid, setIsSteamIdValid] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [steamEdition, setSteamEdition] = useState(false);
    const [reload, setReload] = useState(false);
    const { axiosInstance: axios, validateSteamId } = useAxios()

    const handleValidateSteamId = () => {
        if (steamID !== user.steamId && steamID.length) {
            validateSteamId(steamID)
                .then(success => {
                    setIsSteamIdValid(success.data);
                }, err => {
                    console.log(err);
                })
        }
    }
    const handleSteamIdUpdate = () => {
        debugger;
        axios.put("Account/setSteamId", {
            steamId: steamID,
            resetValue: false // temporary
        }).then(success => {
            axios.put("Account/updateSteamData").then(succ => {
                setReload(prev => !prev)
            }, err => {
            })
        }, (err) => {
            setReload(prev => !prev)
        })
        setSteamEdition(false)
    }
    const handleResetFormToPropsData = () => {

        setEmail(user.email);
        setNickName(user.nickName);
        setSteamUrl(user.steamCommunityUrl ?? "");
        setPhoneNumber(user.phoneNumber ?? "");
        setNationality(user.nationality);
    }
    const handleCancledEditMode = () => {
        setIsEditMode(false)
        handleResetFormToPropsData();
    }

    useEffect(() => {
        axios.get("Account").then((resp) => {
            dispatch({ type: "UPDATE_USER_STEAMDATA", payload: resp.data })
        }, (err) => {
            console.log(err);
        })
    }, [reload, user])

    return (
        <Grid container className={classes.root} >
            <Paper elevation={5} >
                {!user?.avatarImage &&
                    <Avatar
                        variant="circle"
                        src="/Account-icon.svg"
                        className={classes.avatar}
                    />
                }
                {user?.avatarImage && (
                    <>
                        <Avatar
                            variant="circle"
                            src={user.avatarImage ?? "/Account-icon.svg"}
                            className={classes.avatar}
                        />
                    </>
                )
                }
                <Grid item >
                    {!isEditMode && !steamEdition &&
                        <Button
                            className={classes.editButton}
                            startIcon={<EditIcon />}
                            variant="outlined"
                            size="small"
                            onClick={() => setIsEditMode(prev => !prev)}
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
                            onClick={() => handleCancledEditMode()}
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
                        disabled={!isEditMode}
                    />
                    <TextField
                        value={nickName}
                        label="Nick Name"
                        onChange={(e) => setNickName(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!isEditMode}

                    />
                    <TextField
                        value={steamUrl}
                        label="Community Url"
                        onChange={(e) => setSteamUrl(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!isEditMode}

                    />
                    <TextField
                        value={phoneNumber}
                        label="Phone number"
                        type="number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!isEditMode}

                    />
                    <TextField
                        value={nationality}
                        label="Nationality"
                        onChange={(e) => setNationality(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!isEditMode}

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
                    <TextField
                        value={steamID ?? "Add SteamID"}
                        label="SteamID"
                        onChange={(e) => setSteamID(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!steamEdition}
                        onBlur={() => handleValidateSteamId()}
                        error={!isSteamIdValid && steamEdition && user.steamId !== steamID}
                    />

                    {!steamEdition && !isEditMode && <Button
                        className={classes.editSteamIdButton}
                        startIcon={<EditIcon />}
                        variant="outlined"
                        size="small"
                        onClick={() => setSteamEdition(prev => !prev)}
                    >
                        EDIT STEAMID
                    </Button>
                    }
                    {steamEdition &&
                        <ButtonGroup>
                            <Button
                                className={classes.editSteamIdButton}
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                size="small"
                                onClick={() => handleSteamIdUpdate()}
                                disabled={!isSteamIdValid || steamID === user.steamId}
                            >
                                Save Changes
                            </Button>
                            <Button
                                className={classes.editSteamIdButton}
                                startIcon={<CancelIcon />}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={() => {
                                    setSteamEdition(false)
                                    setSteamID(user.steamId)
                                }}
                            >
                                Cancel
                            </Button>
                        </ButtonGroup>}
                    {!isSteamIdValid && user.steamId !== steamID &&
                        <Typography
                            style={{
                                textAlign: "center"
                            }}
                            color="error"
                            variant='body2'
                        >
                            SteamID you provided is already taken or does not exists.
                        </Typography>
                    }

                    {isEditMode &&
                        <Grid
                            item
                            style={{
                                textAlign: "center"
                            }}
                        >
                            <Button
                                type='submit'
                                variant="contained"
                                startIcon={<SaveIcon size='small' />}
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