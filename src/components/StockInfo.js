import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FinnhubAPI from "../apis/finnhubAPI";
import { useEffect, useState } from "react";
import PercentChange from "./PercentChange";
import WatchlistButton from "./WatchlistButton";
import TradeButton from "./TradeButton";

export default function StockInfo(props) {

    const [state, setState] = useState({});

    useEffect(() => {
        if (!props.stock) {
            return
        }

        new FinnhubAPI().quote(props.stock.symbol, (response, data, error) => {
            if (!error) {
                setState((state) => {
                    return {...state, quote: data}
                });
            }
        });

    }, [props])

    return (
        <Box>
            <Box fontSize="42px" fontWeight={500} marginTop={1}>
                {props.stock ? `${props.stock.instrument_name} (${props.stock.symbol})` : "No Stocks"}
            </Box>
            <Box>
                <Grid container>
                    <Box fontSize="24px" height={64} paddingTop={2}>
                        {state.quote ? state.quote.c.toFixed(2) : null}
                    </Box>
                    <Box>
                        <PercentChange size="large" width={120} prev={(state.quote || {pc: null}).pc} current={(state.quote || {c: null}).c} />
                    </Box>
                    {props.tradeButton ?
                        <Box height={64} paddingTop={2} marginLeft={1}>
                            <TradeButton stock={props.stock} />
                        </Box>
                    :
                        null
                    }
                    {props.watchlistButton ?
                        <Box height={64} paddingTop={2} marginLeft={2}>
                            <WatchlistButton stock={props.stock} />
                        </Box>
                    :
                        null
                    }
                </Grid>
            </Box>
        </Box>
    )
}