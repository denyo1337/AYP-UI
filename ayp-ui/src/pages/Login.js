import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useHistory, Link } from 'react-router-dom'
import { Grid, Paper } from '@material-ui/core'
import { Avatar } from '@material-ui/core';
import { Checkbox } from '@material-ui/core'
import EmailValidator from 'email-validator'
import { useAuthContext } from '../hooks/useAuthContext'
import { handleLogin } from '../ayb-requests/requestHandlers'


const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    },
    loginForm: {
        marginTop: "200px",
        textAlign: "center",
        backgroundColor: "white"
    },
    btnstyle: {
        margin: "8px 0"
    },
    avatarStyle: {
        backgroundColor: '#1bbd7e'
    },
    paperStyle: {
        padding: 20,
        height: '60vh',
        width: 280,
        margin: "20px auto"
    }
})

const Login = () => {

    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [emailError, setEmailError] = useState(false);
    const [authErorr, setAuthError] = useState(null);
    const { jwtToken, dispatch } = useAuthContext();
    const history = useHistory();

    useEffect(() => {
        if (email) {
            if (!EmailValidator.validate(email)) {
                setEmailError("Enter valid email please")
            } else {
                setEmailError(null)
            }
        }
        else {
            setDisabled(true)
            setEmailError(null)
        }
        if (emailError || !password || !email) {
            setDisabled(true)
        } else {
            setDisabled(false);
        }

    }, [email, password, email, emailError])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError(null);

        const data = await handleLogin(email, password);

        switch (data.verificationResult) {
            case 0:
                dispatch({ type: "LOGIN", payload: data.token })
                if (jwtToken) {
                    history.push('/');
                }
                break;
            case 1:
                setAuthError("Wrong Email or Password");
                break;
            case 2:
                setAuthError("Your account has been banned. ")
                break;
            default:
                break;
        }
    }

    return (
        <Grid>
            <Paper elevation={10} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Email'
                        placeholder='Enter email'
                        fullWidth required
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        value={email}

                    />
                    {emailError && <Typography color="error" >Enter valid email</Typography>}
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        type='password'
                        fullWidth required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {authErorr && <Typography color="error" >{authErorr}</Typography>}
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="Remember me"
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        className={classes.btnstyle}
                        fullWidth disabled={disabled}
                    >Sign in
                    </Button>
                </form>
                <Typography >
                    <Link to="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link to="/register" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
        </Grid>

    );
}

export default Login;