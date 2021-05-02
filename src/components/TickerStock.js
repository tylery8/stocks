import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FinnhubAPI from "../apis/finnhubAPI";
import { useEffect, useState } from "react";
import PercentChange from "./PercentChange";

export default function TickerStock(props) {

    const [state, setState] = useState({loadData: true});

    useEffect(() => {

        if (state.loadData) {
            setState((state) => {
                return {...state, loadData: false}
            });

            new FinnhubAPI().quote(props.symbol, (response, data, error) => {
                if (!error) {
                    setState((state) => {
                        return {...state, quote: data}
                    });
                }
            });

            setTimeout(() => setState((state) => {return {...state, loadData: true}}), 30000);
        }

    }, [props, state.loadData])

    return (
        <Box width={282} height={45} style={{...props.style}}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Box width={80} height="fit-content">
                    {props.symbol}
                </Box>
                <Box width={80} height="fit-content">
                    {state.quote ? state.quote.c.toFixed(2) : null}
                </Box>
                <Box width={80} height="fit-content">
                    <PercentChange prev={(state.quote || {pc: null}).pc} current={(state.quote || {c: null}).c} />
                </Box>
            </Grid>
        </Box>
    )
}