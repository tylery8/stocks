import { Box, Grid, Button, TextField } from "@material-ui/core";
import { Fragment, useState } from "react";
import style from "../style";

export default function PortfolioActions(props) {

    const [state, setState] = useState({});

    const styles = {
        button: {
            color: "white",
            minWidth: "110px"
        },
        greenButton: {
            backgroundColor: style.mainGreen
        },
        redButton: {
            backgroundColor: style.mainRed
        }
    }
    
    return (
        <Fragment>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Box width={.67}>
                    <TextField
                    autoComplete="off"
                    margin="dense"
                    id="amount"
                    label="Amount"
                    type="number"
                    inputProps={{step: 0.01}}
                    fullWidth
                    onChange={event => setState({...state, amount: parseFloat(event.target.value)})}
                    />
                </Box>
                <Box marginY={1}>
                    <Button variant="contained" size="large" onClick={event => props.onDeposit(event, state.amount || 0)} style={{...styles.button, ...styles.greenButton}}>
                        Deposit
                    </Button>
                </Box>
            </Grid>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Box width={0.67}>
                    <TextField
                    autoComplete="off"
                    margin="dense"
                    id="reset"
                    label="Type 'reset' to confirm"
                    type="text"
                    fullWidth
                    onChange={event => setState({...state, resetText: event.target.value})}
                    />
                </Box>
                <Box marginY={1}>
                    <Button variant="contained" size="large" onClick={event => {if (state.resetText === 'reset') {props.onReset(event)}}} style={{...styles.button, ...styles.redButton}}>
                        Reset
                    </Button>
                </Box>
            </Grid>
        </Fragment>
    )

}