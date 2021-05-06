import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BuySellSwitch from "./BuySellSwitch";
import { Fragment, useState } from 'react';
import BackendAPI from '../apis/backendAPI';
import FinnhubAPI from '../apis/finnhubAPI';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from "./SuccessMessage";

export default function TradeDialogue(props) {

    const [state, setState] = useState({amount: 0, buy: true})

    const placeTrade = () => {
        new FinnhubAPI().quote(props.stock.symbol, (response, data, error) => {

            if (!error) {

                new BackendAPI().trade(
                    props.stock.symbol,
                    new Date().getTime(),
                    data.c,
                    state.amount,
                    state.buy,
                    (response, data, error) => {
                        if (!error) {
                            setState({
                                ...state,
                                successMessage: `Successfully ${data.buy ? 'purchased' : 'sold'} ${data.shares} shares of ${props.stock.symbol} at $${data.price} for $${data.amount}`
                            })
                        } else {
                            setState({
                                ...state,
                                errorMessage: data ? data.message : "Something went wrong. Check your internet connection and try again"
                            })
                        }
                        props.onClose();
                    }
                )

            } else {
                setState({
                    ...state,
                    errorMessage: data ? data.message : "Something went wrong. Check your internet connection and try again"
                })
            }
        }, undefined)
    }

    const handleErrorClose = () => {
        setState({
            ...state,
            errorMessage: undefined
        })
    }

    const handleSuccessClose = () => {
        setState({
            ...state,
            successMessage: undefined
        })
    }

    return (
        <Fragment>
            <SuccessMessage successMessage={state.successMessage} onClose={handleSuccessClose} />
            <ErrorMessage errorMessage={state.errorMessage} onClose={handleErrorClose} />
            <Dialog open={props.open && props.stock} onClose={props.onClose} maxWidth='xs'>
                <DialogTitle>Place a Trade on {props.stock ? props.stock.instrument_name : undefined}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose whether to buy or sell and enter the amount in dollars
                    </DialogContentText>
                    <BuySellSwitch checked={state.buy} onChange={event => setState({...state, buy: event.target.checked})} />
                    <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="amount"
                    label="Amount"
                    type="number"
                    inputProps={{step: 0.01}}
                    fullWidth
                    onChange={event => setState({...state, amount: parseFloat(event.target.value)})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={placeTrade} color="primary">
                        Place Trade
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
