import { useEffect, useState } from "react";
import Financial from "./Financial";
import FinancialHeader from "./FinancialHeader";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import FinnhubAPI from "../apis/finnhubAPI";

export default function FinancialList(props) {
    const [state, setState] = useState({financials: null});

    useEffect(() => {
        let mounted = true;

        if (!props.symbol) {
            return
        }

        setState((state) => {
            return {...state, financials: undefined}
        })

        new FinnhubAPI().financials(props.symbol, (response, body, error) => {
            if (mounted) {
                setState((state) => {
                    if (!error) {
                        return {...state, financials: body}
                    } else {
                        return {...state, financials: null}
                    }
                })
            }
        })

        return () => {mounted = false;}
    }, [props])

    const metric = state.financials ? state.financials.metric : {};

    return (
        <Box>
            <Box marginTop={4} fontSize="36px" fontWeight={500}>
                Financials
            </Box>
            <Grid container direction="row" justify="space-between" alignItems="flex-start">
                <Box width={0.475}>
                    <FinancialHeader header="52 Week Stats" />
                    <Financial label="High" value={metric["52WeekHigh"]} round={3} />
                    <Financial label="High Date" value={metric["52WeekHighDate"]} />
                    <Financial label="Low" value={metric["52WeekLow"]} round={3} />
                    <Financial label="Low Date" value={metric["52WeekLowDate"]} />
                    <FinancialHeader header="Average Trading Volume" />
                    <Financial label="3 Month" value={metric["3MonthAverageTradingVolume"]} round={2} />
                    <Financial label="10 Day" value={metric["10DayAverageTradingVolume"]} round={2} />
                </Box>
                <Box width={0.475}>
                    <FinancialHeader header="Price Relative to S&P" />
                    <Financial label="Year To Date" value={metric["priceRelativeToS&P500Ytd"]} round={3} />
                    <Financial label="4 Week" value={metric["priceRelativeToS&P5004Week"]} round={3} />
                    <Financial label="13 Week" value={metric["priceRelativeToS&P50013Week"]} round={3} />
                    <Financial label="26 Week" value={metric["priceRelativeToS&P50026Week"]} round={3} />
                    <Financial label="52 Week" value={metric["priceRelativeToS&P50052Week"]} round={3} />
                    <FinancialHeader header="Other" />
                    <Financial label="Beta" value={metric["beta"]} round={4} />
                </Box>
            </Grid>
        </Box>
    );
}

