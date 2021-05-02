import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import BackendAPI from "../apis/backendAPI";
import FinnhubAPI from "../apis/finnhubAPI";
import { setAccountId, removeAccountId, setFinnhubApikey, removeFinnhubApikey } from "../browser/cookies"
import LoginForm from "../components/LoginForm";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorMessage from "../components/ErrorMessage";
import SignupForm from "../components/SignupForm";


export default function LoginPage() {

    const [state, setState] = useState({loginForm: true, loggedIn: false, loading: false})

    const switchForms = (event, toLoginForm) => {
        event.preventDefault();
        setState(state => {
            return {
                ...state,
                loginForm: toLoginForm
            }
        })
    }

    const login = (event, username, password, remember) => {

        setState(state => {
            return {
                ...state,
                loading: true
            }
        })

        new BackendAPI().readLogin(username, password, (response, body, error) => {
            if (!error) {
                setAccountId(body.account_id, remember);
                setFinnhubApikey(body.apikey, remember);
                setState(state => {
                    return {
                        ...state,
                        loggedIn: true,
                        loading: false
                    }
                })
            } else {
                setState(state => {
                    return {
                        ...state,
                        errorMessage: body ? body.message : "Something went wrong. Check your internet connection and try again",
                        loading: false
                    }
                })
            }
        })
    }

    const validateAndSignup = (event, username, password, apikey) => {

        setState(state => {
            return {
                ...state,
                loading: true
            }
        })

        const signup = () => {

            new BackendAPI().createLogin(username, password, apikey, (response, body, error) => {
                if (!error) {
                    setAccountId(body.account_id);
                    setFinnhubApikey(body.apikey);
                    setState(state => {
                        return {
                            ...state,
                            loggedIn: true,
                            loading: false
                        }
                    })
                } else {
                    setState(state => {
                        return {
                            ...state,
                            errorMessage: body ? body.message : "Something went wrong. Check your internet connection and try again",
                            loading: false
                        }
                    })
                }
            })
        }

        if (apikey) {
            new FinnhubAPI(apikey).country((response, body, error) => {
                if (error) {
                    setState(state => {
                        return {
                            ...state,
                            errorMessage: body ? body.error : "Something went wrong. Check your internet connection and try again",
                            loading: false
                        }
                    })
                } else {
                    signup()
                }
            })
        } else {
            signup()
        }
        
    }

    const handleErrorClose = () => {
        setState(state => {
            return {
                ...state,
                errorMessage: undefined
            }
        })
    }

    useEffect(() => {
        removeAccountId();
        removeFinnhubApikey();
    }, [])

    if (state.loggedIn) {
        return <Redirect to="/" />
    }

    return (
        <Box>
            <ErrorMessage errorMessage={state.errorMessage} onClose={handleErrorClose} />
            <Box border={1} borderRadius={10} boxShadow={10} padding={4} marginTop={11} marginX="auto" width={420} >
                <Backdrop open={state.loading} style={{zIndex: 1500}}>
                    <CircularProgress size={60} style={{color: "white"}} />
                </Backdrop>
                {state.loginForm ?
                    <LoginForm onSubmit={login} onSignupClick={(event) => switchForms(event, false)} />
                :
                    <SignupForm onSubmit={validateAndSignup} onLoginClick={(event) => switchForms(event, true)} />
                }
            </Box>
        </Box>
    )
}