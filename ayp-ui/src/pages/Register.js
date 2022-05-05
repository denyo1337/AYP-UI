import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core'
import { useEffect, useState } from 'react';
import EmailValidator from 'email-validator'
import useAxios from '../hooks/useAxios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useStyles = makeStyles({
    paperStyle: {
        padding: '30px 20px',
        width: 300,
        margin: "20px auto"
    },
    headerStyle: {
        margin: 0
    },
    avatarStyle: {
        backgroundColor: '#1bbd7e'
    },
    marginTop: {
        marginTop: 5
    }

})
const Register = () => {
    const classes = useStyles();
    const [nick, setNick] = useState("");
    const [nickError, setNickError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [gender, setGender] = useState("male");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [nationality, setNationality] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState("");
    const [agreePolicy, setAgreePolicy] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [conrfirmPasswordErr, setConfirmPasswordErr] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { axiosInstance: axios, handleNickNameVerification, handleEmailVerification } = useAxios();
    const history = useHistory();

    const validateNick = async () => {
        if (nick.length < 2 || await handleNickNameVerification(nick)) {
            setNickError(true)
        } else {
            setNickError(false);
        }
        if (!nick) {
            setNickError(false)
        }
    }
    const validateEmail = async () => {
        if (!EmailValidator.validate(email)) {
            setEmailError("Please enter a valid email address");
        } else if (await handleEmailVerification(email)) {
            setEmailError("Email you provided is already taken.");
        } else {
            setEmailError("")
        }
        if (!email) {
            setEmailError("");
        }
    }
    const validatePhoneNumber = () => {
        if (phoneNumber.length < 9 || isNaN(phoneNumber)) {
            setPhoneNumberError(true)
        } else {
            setPhoneNumberError(false)
        }
        if (!phoneNumber) {
            setPhoneNumberError(false);
        }
    }
    const validatePasswords = () => {
        if (password.length < 6) {
            setPasswordErrors("Password has to be at least 6 characters long.")
        } else if (password !== confirmPassword && confirmPassword && password) {
            setPasswordErrors("You need to enter equal passwords.")
            setConfirmPasswordErr(true)
        }
        else {
            setPasswordErrors("")
            setConfirmPasswordErr(false);
        }
        if (!password && !confirmPassword) {
            setPasswordErrors("");
            setConfirmPasswordErr(false);
        }
    }

    useEffect(() => {
        if (nick &&
            email &&
            phoneNumber &&
            password &&
            password === confirmPassword &&
            !nickError &&
            !emailError &&
            !phoneNumberError &&
            agreePolicy
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }

    }, [nick, email, phoneNumber, nationality, password, confirmPassword, agreePolicy, disabled, nickError, emailError, phoneNumberError])

    const handleSubmit = async (e) => {
        setEmailError("");
        setNickError(false)
        setIsPending(true);
        e.preventDefault();


        const response = await axios.post("Users/register", {
            email: email,
            nickName: nick,
            natonality: nationality,
            password: password,
            confirmPassword: confirmPassword,
            gender: gender
        })
        if (response.status === 200 && response.data) {
            setIsPending(false);
            history.push("/login");
        } else if (response.status === 400) {
            setIsPending(false);
            const er = response.data.errors;
            if (er.email.length > 0) {
                setEmailError("Email you provided is already taken.");
            }
            if (er.nickName.length > 0) {
                setNickError(true);
            }
            if (er.password.length > 0) {
                //TO DO 
            }
        } else {
            setIsPending(false)
        }

    }
    return (
        <Grid>
            <Paper elevation={20} className={classes.paperStyle}>
                <Grid align='center'>
                    <Avatar className={classes.avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5" className={classes.headerStyle}>Sign Up</Typography>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label='Nick'
                        placeholder="Enter your nickname"
                        value={nick}
                        onChange={(e) => setNick(e.target.value.trim())}
                        error={nickError}
                        onBlur={validateNick}

                    />
                    {nickError && <Typography variant='body1' color="error" >Nick is invalid or already taken.</Typography>}

                    <TextField
                        fullWidth
                        label='Email'
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        onBlur={validateEmail}
                        error={emailError}
                    />
                    {emailError && <Typography variant='body1' color="error" >{emailError}</Typography>}

                    <FormControl component="fieldset" className={classes.marginTop} >
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}
                            onChange={(e) => setGender(e.target.value)} value={gender} >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        fullWidth
                        label='Phone Number'
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={validatePhoneNumber}
                        error={phoneNumberError}
                    />
                    {phoneNumberError && <Typography variant='body1' color="error" >{isNaN(phoneNumber) ? "Phone number can include only nubmers " : "Phone number has to have at least 9 digits."}</Typography>}
                    <TextField
                        fullWidth
                        label='Nationality'
                        placeholder="Enter your nationality"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label='Password'
                        placeholder="Enter your password"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={validatePasswords}
                        error={passwordErrors.length}
                    />
                    <TextField
                        fullWidth
                        label='Confirm Password'
                        placeholder="Confirm your password"
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={validatePasswords}
                        error={conrfirmPasswordErr}
                    />
                    {passwordErrors && <Typography variant='body1' color="error" > {passwordErrors} </Typography>}

                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                        checked={agreePolicy}
                        onChange={() => {
                            setAgreePolicy(prev => !prev);
                        }}
                    />
                    <div style={{ textAlign: "center" }}>
                        {!isPending && <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={disabled}
                        >
                            Sign up
                        </Button>}
                        {isPending && <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled
                        >
                            Proccessing..
                        </Button>}

                    </div>

                </form>
            </Paper>
        </Grid>
    )
}

export default Register;