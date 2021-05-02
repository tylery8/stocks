import TickerStock from "./TickerStock";
import Marquee from "react-fast-marquee";
import Box from "@material-ui/core/Box";

export default function Ticker(props) {
    let symbols = props.symbols.length >= 5 ? props.symbols : props.symbols.concat(props.symbols);
    symbols = props.symbols.length >= 3 ? symbols : symbols.concat(props.symbols);
    symbols = props.symbols.length >= 2 ? symbols : symbols.concat(props.symbols).concat(props.symbols);

    return (
        <Marquee speed={props.speed || 40} gradientWidth={100} gradientColor={[0, 0, 0]} pauseOnClick>
            {symbols.length >= 1 ?
                symbols.map(symbol => <Box border="1px solid black"><TickerStock symbol={symbol} /></Box>)
            :
                <Box height={45} width={1000} fontSize={32}>
                    Add stocks to your watchlist from the Explore page to view them here.
                </Box>
            }
        </Marquee>
    )
}