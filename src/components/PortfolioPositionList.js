import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Fragment, useState } from 'react';
import PortfolioPosition from "./PortfolioPosition";
import FormHelperText from "@material-ui/core/FormHelperText";


export default function PortfolioPositionList(props) {
    const [state, setState] = useState({sortBy: 'symbol'});

    const sortOptions = [
        {value: 'symbol', display: 'Symbol'},
        {value: 'shares', display: 'Shares'},
        {value: 'price', display: 'Current Price'},
        {value: 'value', display: 'Value'}
    ]

    const handleChange = (event, expanded) => {
        setState({
            ...state,
            expanded: expanded === state.expanded ? null : expanded
        });
    };

    const handleSort = (event) => {
        setState({
            ...state,
            sortBy: event.target.value
        })
    }

    return (
        <Fragment>
            <PortfolioPosition symbol="Cash" expanded={'$' === state.expanded} value={props.cash} trades={props.trades} onChange={(e) => handleChange(e, '$')} />
            {props.stocks.length > 0 ?
                <Fragment>
                    <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                        <Box height={88} width={140} paddingTop={3} paddingRight={2} paddingBottom={1}>
                            {props.stocks.length > 1 ?
                                <Fragment>
                                    <Select fullWidth value={state.sortBy} onChange={handleSort}>
                                        {sortOptions.map(sortBy => <MenuItem value={sortBy.value}>{sortBy.display}</MenuItem>)}
                                    </Select>
                                    <FormHelperText>Sort By</FormHelperText>
                                </Fragment>
                            :
                                null
                            }
                        </Box>
                    </Grid>
                    {props.stocks.sort(
                        (a, b) => state.sortBy === 'symbol' ? a.symbol.localeCompare(b.symbol) : b[state.sortBy] - a[state.sortBy]
                    ).map(
                        stock => (
                            <PortfolioPosition {...stock} expanded={stock.symbol === state.expanded} onChange={(e) => handleChange(e, stock.symbol)} />
                        )
                    )}
                </Fragment>
            :
                null
            }
        </Fragment>
    );
}