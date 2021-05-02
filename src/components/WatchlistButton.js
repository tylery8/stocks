import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import style from "../style";
import Box from "@material-ui/core/Box";
import RemoveIcon from '@material-ui/icons/Remove';
import { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import BackendAPI from "../apis/backendAPI";

export default function WatchlistButton(props) {

    const [state, setState] = useState({});
    const watchlist = useRef([]);

    const toggleWatchlist = () => {
        setState((state) => {
            return {
                ...state,
                onWatchlist: !state.onWatchlist,
                isAcked: false
            }
        })

        if (state.onWatchlist) {
            const index = watchlist.current.map(stock => stock.symbol).indexOf(props.stock.symbol);
            if (index > -1) {
                watchlist.current.splice(index, 1);
            }
        } else {
            watchlist.current.push(props.stock);
        }
        
        new BackendAPI().updateWatchlist(watchlist.current, (response, body, error) => {
            if (!error) {
                setState((state) => {
                    return {
                        ...state,
                        isAcked: true
                    }
                })
            } else {
                setState((state) => {
                    return {
                        ...state,
                        onWatchlist: !state.onWatchlist,
                        isAcked: true,
                        errorMessage:  body ? body.message : "Something went wrong. Check your internet connection and try again"
                    }
                })
            }
        })
    }

    const handleErrorClose = () => {
        setState({
            ...state,
            errorMessage: undefined
        })
    }

    useEffect(() => {
        let mounted = true;
        
        new BackendAPI().readWatchlist((response, body, error) => {
            if (mounted && props.stock) {
                if (!error) {
                    watchlist.current = body;
                    setState((state) => {
                        return {
                            ...state,
                            onWatchlist: body.map(stock => stock.symbol).includes(props.stock.symbol),
                            isAcked: true
                        }
                    })
                } else {
                    setState((state) => {
                        return {
                            ...state,
                            onWatchlist: null,
                            isAcked: true
                        }
                    })
                }
            }
        })

        return () => {mounted = false;}
    }, [props])

    if (state.onWatchlist === undefined) {
        return <Loading />;
    } else if (state.onWatchlist === null) {
        return null;
    }

    return (
        <Box>
            <ErrorMessage errorMessage={state.errorMessage} onClose={handleErrorClose} />
            <Fab disabled={!state.isAcked} onClick={toggleWatchlist} size="small" variant="extended" style={{backgroundColor: style[!state.onWatchlist ? "mainGreen" : "mainRed"], color: "white"}}>
                {!state.onWatchlist ? <AddIcon /> : <RemoveIcon />}
                <Box marginRight={1}>
                    {!state.onWatchlist ? "Add to" : "Remove from"} Watchlist
                </Box>
                {state.isAcked ?
                    null
                :
                    <CircularProgress size={20} color={"white"} />
                }
            </Fab>
        </Box>
    )
}