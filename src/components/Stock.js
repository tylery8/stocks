import StockInfo from "./StockInfo";
import Box from "@material-ui/core/Box";
import HistoricalChart from "./HistoricalChart";
import FinancialList from "./FinancialList";

export default function Stock(props) {
    return (
        <Box>
            <StockInfo {...props} />
            <HistoricalChart symbols={[props.stock ? props.stock.symbol : null]} />
            <FinancialList symbol={props.stock ? props.stock.symbol : null} />
        </Box>
    )
}