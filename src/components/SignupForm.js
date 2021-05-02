import React, { useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import Typography from '@material-ui/core/Typography';
import style from "../style";

export default function SignupForm(props) {

    const username = useRef('');
    const password = useRef('');
    const apikey = useRef(null);

    const updateUsername = (event, value) => {
        username.current = value;
    }

    const updatePassword = (event, value) => {
        password.current = value;
    }

    const updateApikey = (event, value) => {
        apikey.current = value === '' ? null : value;
    }

    return (
        <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar style={{backgroundColor: style.mainGreen}}>
                <CheckOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
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
                <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="apikey"
                label="Finnhub API Key"
                type="apikey"
                id="apikey"
                helperText="Optional API key obtained from finnhub.io (it's free!). This is recommended to help avoid data limits."
                onChange={(event) => updateApikey(event, event.target.value)}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{marginTop: "16px", marginBottom: "8px", backgroundColor: style.mainGreen, color: "white"}}
                onClick={(event) => props.onSubmit(event, username.current, password.current, apikey.current)}
                >
                    Sign Up
                </Button>
                <Box fontWeight={400} marginTop={2}>
                    Already have an account?
                </Box>
                <Grid container>
                    <Grid item xs>
                        <Link href="/login" onClick={props.onLoginClick} variant="body2">
                            Log in 
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