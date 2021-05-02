import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import style from "../style";

export default function LoginForm(props) {

    const username = useRef('');
    const password = useRef('');
    const remember = useRef(false);

    const updateUsername = (event, value) => {
        username.current = value;
    }

    const updatePassword = (event, value) => {
        password.current = value;
    }

    const updateRemember = (event, value) => {
        remember.current = value;
    }

    return (
        <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar style={{backgroundColor: style.mainRed}}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Log in
            </Typography>
            <Box>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={(event) => updateUsername(event, event.target.value)}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => updatePassword(event, event.target.value)}
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" onChange={(event) => updateRemember(event, event.target.checked)} />}
                label="Remember me"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{marginTop: "16px", marginBottom: "8px", backgroundColor: style.mainGreen, color: "white"}}
                onClick={(event) => props.onSubmit(event, username.current, password.current, remember.current)}
                >
                    Log In
                </Button>
                <Box fontWeight={400} marginTop={2}>
                    Don't have an account?
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Link href="/login" onClick={props.onSignupClick} variant="body2">
                            Sign up 
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/" variant="body2">
                            Continue without logging in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}