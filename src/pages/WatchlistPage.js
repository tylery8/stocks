import Ticker from "../components/Ticker";
import Box from "@material-ui/core/Box";
import Header from "../components/Header";
import Stock from "../components/Stock";
import Watchlist from "../components/Watchlist";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import BackendAPI from "../apis/backendAPI";
import BuySellChart from "../components/BuySellChart";

export default function WatchlistPage(props) {

    const [state, setState] = useState({})

    const handleRemove = (event, stock) => {
        const stocks = [...state.stocks];
        const index = stocks.map(stock => stock.symbol).indexOf(stock.symbol);
        if (index > -1) {
            stocks.splice(index, 1);
        }

        new BackendAPI().updateWatchlist(stocks, (response, data, error) => {
            if (!error) {
                setState((state) => {
                    return {
                        ...state,
                        stocks,
                        selectedStock: stock === state.selectedStock ? stocks[0] : state.selectedStock
                    }
                })
            } else {
                setState((state) => {
                    return {
                        ...state,
                        stocks: state.stocks
                    }
                })
            }
        })
    }

    const handleSelect = (event, stock) => {
        setState({
            ...state,
            selectedStock: stock
        })
    }

    useEffect(() => {
        new BackendAPI().readWatchlist((response, data, error) => {
            if (!error) {
                setState((state) => {
                    return {
                        ...state,
                        stocks: data,
                        selectedStock: data[0]
                    }
                })
            } else {
                setState((state) => {
                    return {
                        ...state,
                        stocks: null
                    }
                })
            }
        })
    }, [props])

    return (
        <Box width={1176} margin="auto">
            <Header title="Watchlist" loggedIn={!!props.account_id} />
            {state.stocks ? 
                <Box>
                    <Box borderBottom="4px solid black" boxShadow={5}>
                        <Ticker symbols={state.stocks.map(stock => stock.symbol)} />
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="space-around">
                            <Box marginTop={10}>
                                <Box height={594}>
                                    <Box fontSize="36px" fontWeight={500} textAlign="center" marginBottom={2}>
                                        Your Stocks
                                    </Box>
                                    <Watchlist stocks={state.stocks} onSelect={handleSelect} onRemove={handleRemove} />
                                </Box>
                                <Box fontSize="36px" fontWeight={500} textAlign="center" marginBottom={2}>
                                    Recommendations
                                </Box>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <BuySellChart symbol={state.selectedStock ? state.selectedStock.symbol : null} />
                                </Grid>
                            </Box>
                            <Box p={2} width={696}>
                                <Stock tradeButton stock={state.selectedStock || state.stocks[0]} />
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            :
                state.stocks === null ? "An error has occured. Please refresh" : <Loading />
            }
        </Box>
    )
}