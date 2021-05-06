import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import PortfolioPositionSummary from "./PortfolioPositionSummary";
import Trade from "./Trade";
import Box from "@material-ui/core/Box";
import { Fragment } from 'react';

export default function PortfolioPosition(props) {
    return (
        <MuiAccordion square {...props} >
            <Box border={1}>
                <MuiAccordionSummary>
                    <Box p={1} width={1}>
                        <PortfolioPositionSummary {...props} />
                    </Box>
                </MuiAccordionSummary>
            </Box>
            <Box border={1} borderTop={0}>
                <MuiAccordionDetails>
                    <Box p={1} width={1}>
                    {props.trades.length > 0 ?
                        <Fragment>
                            <Box fontSize={20} paddingBottom={.2} marginBottom={1} borderBottom={1} width="fit-content">
                                {props.symbol === 'Cash' ? 'All' : props.symbol} Trades
                            </Box>
                            <Box>
                                {props.trades.map(
                                    trade => (
                                        <Trade {...trade} />
                                    )
                                )}
                            </Box>
                        </Fragment>
                    :
                        "No trades. Go to the Explore or Watchlist page to place a trade."
                    }
                    </Box>
                </MuiAccordionDetails>
            </Box>
        </MuiAccordion>
    )
}