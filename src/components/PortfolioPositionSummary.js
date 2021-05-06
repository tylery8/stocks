import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Fragment } from "react";

export default function PortfolioPositionSummary(props) {

    const symbol = props.symbol;
    const value = props.value.toFixed(2);
    const price = props.price ? props.price.toFixed(2) : null;
    const shares = props.shares ? props.shares.toFixed(5) : null;

    return (
        <Grid container direction="row" justify="space-between" alignItems="center">
            <Box width={100} fontSize={24} fontWeight={500}>
                {symbol}
            </Box>
            <Box width={80}>
                {shares ? 
                    <Fragment>
                        <Box width={80} textAlign="center" fontWeight={500}>
                            Shares
                        </Box>
                        <Box width={80} textAlign="center">
                            {shares}
                        </Box>
                    </Fragment>
                :
                    null
                }
            </Box>
            <Box width={140}>
                {price ? 
                    <Fragment>
                        <Box width={140} textAlign="center" fontWeight={500}>
                            Current Price
                        </Box>
                        <Box width={140} textAlign="center">
                            ${price}
                        </Box>
                    </Fragment>
                :
                    null
                }
            </Box>
            <Box width={80}>
                <Box width={80} textAlign="center" fontWeight={500}>
                    Value
                </Box>
                <Box width={80} textAlign="center">
                    ${value}
                </Box>
            </Box>
            <Box width={40}>
                {props.expanded ?
                    <ExpandLessIcon fontSize="large" />
                :
                    <ExpandMoreIcon fontSize="large" />
                }
            </Box>
        </Grid>
    )
}