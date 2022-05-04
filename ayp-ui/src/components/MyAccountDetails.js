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
import EmailValidator from 'email-validator'
import Loader from './Loader';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginTop: theme.spacing(1),
            margin: theme.spacing(10),
            width: theme.spacing(125),
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
        marginLeft: theme.spacing(94),
        marginBottom: theme.spacing(2),
        width: theme.spacing(18),

    },
    largeAvatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        border: "2px solid black"
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
const STEAMID_ERRROR_1 = "Your steamId can be changed within 7 days of last update."
const STEAMID_ERRROR_2 = "SteamId you provided is already taken";
const STEAMID_ERRROR_3 = "SteamId you provided is invalid or does not exist";
const STEAMID_ERRROR_4 = "Something went wrong, please try again later";

const MyAccountDetails = () => {
    const classes = useStyles();
    const { user, dispatch } = useAuthContext();
    const { axiosInstance: axios, validateSteamId, handleEmailVerification, handleNickNameVerification, handleUserDetailsUpdate, handleLogin } = useAxios()
    const [email, setEmail] = useState(user.email);
    const [nickName, setNickName] = useState(user.nickName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber ?? "");
    const [nationality, setNationality] = useState(user.nationality);
    const [lastLogin, setLastLogIn] = useState(user.lastLogOn);
    const [steamID, setSteamID] = useState(user.steamId)
    const [steamIdErrorMessage, setSteamIdErrorMessage] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [steamEdition, setSteamEdition] = useState(false);
    const [reload, setReload] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [nickError, setNickError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [password, setPassword] = useState("");
    const [errorInSavingData, setErrorInSavingData] = useState(false);
    const [loader, setLoader] = useState(true);
    const history = useHistory();

    const handleUpdateUserDataSubmit = (e) => {
        setErrorInSavingData(false);
        e.preventDefault();
        const user = {
            email,
            nickName,
            phoneNumber,
            nationality,
            password
        };
        handleUserDetailsUpdate(user).then(success => {
            setReload(prev => !prev);
        }, err => {
            setErrorInSavingData(true)
            console.log(err);
        })

        if (!errorInSavingData) {
            handleLogin(email, password).then(success => {
                if (success.verificationResult === 0) {
                    dispatch({ type: "UPDATE_TOKEN", payload: success.token })
                } else {
                    dispatch({ type: "LOGOUT" })
                    history.push('/login');
                }
            }, err => {
                console.log(err);
            })
        }
        setIsEditMode(false);
        setPassword("");
    }

    const validateNick = async () => {
        if (user.nickName !== nickName) {
            if (nickName.length < 2 || await handleNickNameVerification(nickName)) {
                setNickError("Nick is invalid or already taken.")
            } else {
                setNickError("");
            }
            if (!nickName) {
                setNickError("")
            }
        } else {
            setNickError("")
        }
    }

    const handleValidateSteamId = () => {
        setSteamIdErrorMessage("");
        if (steamID !== user.steamId && steamID.length) {
            validateSteamId(steamID)
                .then(result => {
                    switch (result.data) {
                        case 0: {
                            setSteamIdErrorMessage("")
                            break;
                        }
                        case 2: {
                            setSteamIdErrorMessage(STEAMID_ERRROR_2);
                            break;
                        }
                        case 3: {
                            setSteamIdErrorMessage(STEAMID_ERRROR_3);
                            break;
                        }
                        default: {
                            setSteamIdErrorMessage("");
                            break;
                        }
                    }
                    const test = !steamIdErrorMessage || steamID === user.steamId;
                }, err => {
                    setSteamIdErrorMessage("SteamId you provided is invalid or does not exist");
                    console.log(err);
                })
        }
    }
    const handleErrorForSteamId = (errMsg, editState) => {
        setSteamIdErrorMessage(errMsg)
        setSteamEdition(editState);
    }
    const handleSteamIdUpdate = () => {
        axios.put("Account/setSteamId", {
            steamId: steamID,
            resetValue: false // temp
        }).then(success => {
            switch (success.data) {
                case 0: {
                    axios.put("Account/updateSteamData").then(succ => {
                        setReload(prev => !prev)
                    }, err => {
                        console.log(err);
                    })
                    handleErrorForSteamId("", false);
                    break;
                }
                case 1: {
                    handleErrorForSteamId(STEAMID_ERRROR_1, true);
                    break;
                }
                case 2: {
                    handleErrorForSteamId(STEAMID_ERRROR_2, true);
                    break;
                }
                case 3: {
                    handleErrorForSteamId(STEAMID_ERRROR_3, true);
                    break;
                }
                case 4: {
                    handleErrorForSteamId(STEAMID_ERRROR_4, true);
                    break;
                }
            }
        }, (err) => {
            setReload(prev => !prev)
        })
    }
    const handleResetFormToPropsData = () => {
        setEmail(user.email);
        setNickName(user.nickName);
        setPhoneNumber(user.phoneNumber ?? "");
        setNationality(user.nationality);
    }
    const handleCancledEditMode = () => {
        setIsEditMode(false)
        handleResetFormToPropsData();
    }

    const validateEmail = async () => {
        if (!EmailValidator.validate(email)) {
            setEmailError("Please enter a valid email address");
        } else if (user.email !== email && await handleEmailVerification(email)) {
            setEmailError("Email you provided is already taken.");
        } else {
            setEmailError("")
        }
        if (!email) {
            setEmailError("");
        }
    }

    useEffect(() => {
        setLoader(true)
        axios.get("Account").then((resp) => {
            dispatch({ type: "UPDATE_USER_STEAMDATA", payload: resp.data })
        }, (err) => {
            console.log(err);
        })
        setLoader(false);
    }, [reload, user])

    useEffect(() => {
        if (!email ||
            !nickName ||
            emailError ||
            nickError ||
            !password ||
            user.email === email &&
            user.nickName === nickName &&
            user.nationality === nationality &&
            user.phoneNumber === phoneNumber
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [email, nickName, phoneNumber, nationality, isEditMode, password])

    return (
        <Grid container className={classes.root}>
            {loader && <Loader/>}
            {!loader && 
            <Paper elevation={5} >
                <Grid item style={{
                    marginBottom: steamEdition ? "57px" : "10px"
                }}>
                    {!user?.avatarImage &&
                        <Avatar
                            variant="circle"
                            src="/Account-icon.svg"
                            className={classes.largeAvatar}
                        />
                    }
                    {user?.avatarImage && (
                        <div className={classes.avatar} >
                            <a href={user.steamProfileUrl} target="_blank" >
                                <Avatar
                                    variant="circle"
                                    src={user.avatarImage ?? "/Account-icon.svg"}
                                    className={classes.largeAvatar}
                                >
                                </Avatar>
                            </a>
                        </div>
                    )}

                </Grid>
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
                <form onSubmit={handleUpdateUserDataSubmit}>
                    <TextField
                        value={email}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!isEditMode}
                        onBlur={validateEmail}
                        error={emailError}
                    />
                    {emailError && <Typography variant='body1' color="error" style={{ textAlign: 'center', marginTop: "-14px" }} >{emailError}</Typography>}
                    <TextField
                        value={nickName}
                        label="Nick Name"
                        onChange={(e) => setNickName(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!isEditMode}
                        onBlur={validateNick}
                        error={nickError}
                    />
                    {nickError && <Typography variant='body1' color="error" style={{ textAlign: 'center', marginTop: "-14px" }} >{nickError}</Typography>}

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
                        value={steamID}
                        placeholder={steamID ?? "Add SteamID"}
                        label="SteamID"
                        onChange={(e) => setSteamID(e.target.value)}
                        className={classes.formInputs}
                        id="outlined"
                        variant="outlined"
                        disabled={!steamEdition}
                        onBlur={() => handleValidateSteamId()}
                        error={steamIdErrorMessage.length > 0 && steamEdition && user.steamId !== steamID}
                    />
                    {isEditMode && <TextField
                        value={password}
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className={classes.formInputs}
                        type="password"
                        id="outlined"
                        variant="outlined"
                    />
                    }

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
                                disabled={steamIdErrorMessage || steamID === user.steamId}
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
                    {steamIdErrorMessage.length > 0 && user.steamId !== steamID &&
                        <Typography
                            style={{
                                textAlign: "center"
                            }}
                            color="error"
                            variant='body2'
                        >
                            {steamIdErrorMessage}
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
                                disabled={disabled}
                            >
                                Save
                            </Button>
                        </Grid>
                    }
                </form>
            </Paper>
            }
        </Grid>
    
    );
}

export default MyAccountDetails;