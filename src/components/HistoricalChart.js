import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useEffect, useState } from "react";
import HistoricalChartPlot from "./HistoricalChartPlot";

export default function HistoricalChart(props) {

    const periods = ["1D", "1W", "1M", "1Y", "5Y"]
    
    const [state, setState] = useState({symbol: props.symbols ? props.symbols[0] : null, period: periods[0]})

    const handleSymbolChange = (event) => {
        setState({
            ...state,
            symbol: event.target.value
        })
    }
    
    const handlePeriodChange = (event) => {
        setState({
            ...state,
            period: event.target.value
        })
    }

    useEffect(() => {
        setState(state => {
            return {...state, symbol: (props.symbols || [null])[0]}
        })
    }, [props])

    return (
        <Box width={664} p={2} border="1px solid black" boxShadow={5}>
            <Box marginBottom={2}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Box marginLeft={7} minWidth={100} fontSize="16px">
                        <InputLabel id="symbol">Symbol</InputLabel>    
                        {state.symbol && props.symbols.length > 1 ?
                            <Select labelId="symbol" value={state.symbol} onChange={handleSymbolChange}>
                                {props.symbols.map(symbol => <MenuItem value={symbol}>{symbol}</MenuItem>)}
                            </Select>
                        :
                            <Box paddingTop={0.5} minHeight={30}>
                                {state.symbol || ""}
                            </Box>
                        }
                    </Box>
                    <Box fontSize={24} marginRight={8}>
                        Time Series
                    </Box>
                    <Box marginRight={5}>
                        <InputLabel id="period">Period</InputLabel>
                        <Select labelId="period" value={state.period} onChange={handlePeriodChange}>
                            {periods.map(period => <MenuItem value={period}>{period}</MenuItem>)}
                        </Select>
                    </Box>
                </Grid>
            </Box>
            <HistoricalChartPlot symbol={state.symbol} period={state.period} />
        </Box>
    );
}