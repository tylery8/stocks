import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import TickerStock from "./TickerStock";
import RemoveIcon from '@material-ui/icons/Remove';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import style from "../style";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";

export default function Watchlist(props) {

    const [state, setState] = useState({});

    useEffect(() => {
        setState(state => {
            return {...state, removing: null}
        })
    }, [props])

    const handleRemove = (event, stock) => {
        if (!state.removing) {
            props.onRemove(event, stock)
            setState({
                ...state,
                removing: stock
            })
        }
    }

    const handleSelect = (event, stock) => {
        if (!state.removing) {
            props.onSelect(event, stock)
        }
    }

    if (!props.stocks || props.stocks.length === 0) {
        return (
            <Box m={2} width={322} textAlign="center">
                You are watching no stocks.
            </Box>
        )
    }

    return (
        <Box border="1px solid black" boxShadow={5} width={390}>
            {props.stocks.map(stock =>
                <Grid container direction="row" alignItems="center" style={{marginLeft: "24px"}}>
                    <Fab onClick={event => handleRemove(event, stock)} style={{minHeight: 22, height: 22, width: 22, backgroundColor: style["mainRed"], color: "white"}}>
                        {state.removing === stock ?
                            <CircularProgress style={{height: 14, width: 14, color: "white"}} />
                        :
                            <RemoveIcon style={{height: 18, width: 18}} />
                        }
                    </Fab>
                    <TickerStock symbol={stock.symbol} />
                    <Fab onClick={event => handleSelect(event, stock)} style={{marginLeft: "8px", minHeight: 22, height: 22, width: 22, backgroundColor: style["mainGreen"], color: "white"}}>
                        <KeyboardArrowRightIcon style={{height: 18, width: 18}} />
                    </Fab>
                </Grid>
            )}
        </Box>
    )
}