import { Box, Grid } from "@material-ui/core";

export default function Trade(props) {

    const renderDate = function(timestamp) {
        let diff = new Date().getTime() - timestamp;
        diff /= 1000;
    
        if (diff < 60) {
            return `${Math.floor(diff)}s ago`;
        }
        diff /= 60;
    
        if (diff < 60) {
            return `${Math.floor(diff)}m ago`;
        }
        diff /= 60;
    
        if (diff < 24) {
            return `${Math.floor(diff)}h ago`;
        }
    
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(timestamp);
    
        return `${months[date.getMonth()]} ${date.getDate() + (new Date().getFullYear() === date.getFullYear() ? "" : ", " + date.getFullYear())}` ;
    }

    return (
        <Grid container direction="row" justify="space-between" alignItems="center">
            <Box>
                {renderDate(props.time)}
            </Box>
            <Box>
                {props.buy ? "Purchased" : "Sold"}
                {" " + props.shares.toFixed(5)}
                {props.symbol ? " " + props.symbol : ""}
                {" shares priced at $" + props.price.toFixed(2)}
                {" for $" + props.amount.toFixed(2)}
            </Box>
        </Grid>
    )
}