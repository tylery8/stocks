import SymbolSearch from "../components/SymbolSearch";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MarketNews from "../components/MarketNews";
import Header from "../components/Header";
import Stock from "../components/Stock";

export default function ExplorePage(props) {
    const [state, setState] = useState({stock: {
        symbol: "SPY",
        instrument_name: "SPDR S\u0026P 500 ETF Trust",
        exchange: "NYSE",
        exchange_timezone: "America/New_York",
        instrument_type: "ETF",
        country: "United States",
        currency: "USD"
    }});

    return (
        <Box width={1176} margin="auto">
            <Header title="Explore" loggedIn={!!props.account_id} />
            <Grid container direction="row">
                <Box p={2} marginRight={6} width={432}>
                    <Box>
                        <SymbolSearch onSelection={(e, v) => setState({...state, stock: v})} maxSuggestions={6} />
                    </Box>
                    <Box marginTop={2}>
                        <MarketNews symbol={state.stock.symbol} maxStories={10} />
                    </Box>
                </Box>
                <Box p={2} width={696}>
                    <Stock stock={state.stock} watchlistButton={!!props.account_id} tradeButton={!!props.account_id} />
                </Box>
            </Grid>
        </Box>
    );
}