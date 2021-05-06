import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PortfolioOverview from "../components/PortfolioOverview";
import PortfolioPositionList from "../components/PortfolioPositionList";
import PortfolioActions from "../components/PortfolioActions";
import BackendAPI from "../apis/backendAPI";
import Loading from "../components/Loading";
import FinnhubAPI from "../apis/finnhubAPI";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

export default function PortfolioPage(props) {

    const [state, setState] = useState({reset: false});

    const handleDeposit = (event, amount) => {
        new BackendAPI().deposit(amount, (response, data, error) => {
            if (!error) {
                setState({
                    ...state,
                    portfolio: {
                        ...state.portfolio,
                        deposit: state.portfolio.deposit + data.amount,
                        cash: state.portfolio.cash + data.amount
                    },
                    successMessage: `Successfully deposited $${data.amount}`
                })
            } else {
                setState({
                    ...state,
                    errorMessage: data ? data.message : "Something went wrong. Check your internet connection and try again"
                })
            }
        });
        
    }

    const handleReset = () => {
        new BackendAPI().deletePortfolio((response, data, error) => {
            if (!error) {
                setState({
                    reset: !state.reset
                })
            } else {
                setState({
                    ...state,
                    errorMessage: data ? data.message : "Something went wrong. Check your internet connection and try again"
                })
            }
        });
    }

    const handleSuccessClose = () => {
        setState({
            ...state,
            successMessage: undefined
        })
    }

    const handleErrorClose = () => {
        setState({
            ...state,
            errorMessage: undefined
        })
    }

    useEffect(() => {
        new BackendAPI().readPortfolio((response, data, error) => {
            if (!error) {
                setState((state) => {
                    return {
                        ...state,
                        portfolio: data
                    }
                })

                data.stocks.forEach(stock => {
                    new FinnhubAPI().quote(stock.symbol, (response, data, error) => {
                        if (!error) {
                            setState((state) => {
                                const quotes = state.quotes || {}
                                const values = state.values || {}
                                quotes[stock.symbol] = data
                                values[stock.symbol] = data.c * stock.shares
                                return {
                                    ...state,
                                    quotes,
                                    values
                                }
                            })
                        }
                    })
                });
            } else {
                setState((state) => {
                    return {
                        ...state,
                        portfolio: null
                    }
                })
            }
        })
    }, [props, state.reset])
    
    const stocks = state.portfolio && state.portfolio.stocks.length === Object.keys(state.quotes || {}).length ?
        state.portfolio.stocks.map(
            stock => {
                return {...stock, value: state.values[stock.symbol], price: state.quotes[stock.symbol].c}
            }
        ) : null

    return (
        <Box width={1176} margin="auto">
            <SuccessMessage successMessage={state.successMessage} onClose={handleSuccessClose} />
            <ErrorMessage errorMessage={state.errorMessage} onClose={handleErrorClose} />
            <Header title="Portfolio" loggedIn={!!props.account_id} />
            {state.portfolio === null ?
                null
            : state.portfolio === undefined || !stocks ?
                <Loading />
            : 
                <Box>
                    <Grid container direction="row" justify="space-between">
                        <Box p={2} marginRight={2} width={464}>
                            <Box fontSize="36px" fontWeight={500} textAlign="center" marginBottom={2}>
                                Overview
                            </Box>
                            <Box boxShadow={5} border={1} p={2}>
                                <PortfolioOverview {...state.portfolio} stocks={stocks} />
                            </Box>
                            <Box fontSize="36px" fontWeight={500} textAlign="center" marginTop={4} marginBottom={2}>
                                Actions
                            </Box>
                            <Box boxShadow={5} border={1} p={2}>
                                <PortfolioActions onDeposit={handleDeposit} onReset={handleReset} />
                            </Box>
                        </Box>
                        <Box p={2} width={696}>
                            <Box fontSize="36px" fontWeight={500} textAlign="center" marginBottom={2}>
                                Positions
                            </Box>
                            <PortfolioPositionList {...state.portfolio} stocks={stocks} />
                        </Box>
                    </Grid>
                </Box>
            }
        </Box>
    )
}