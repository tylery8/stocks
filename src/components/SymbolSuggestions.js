import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import TwelveDataAPI from "../apis/twelvedataAPI";

export default function SymbolSuggestions(props) {
    const [state, setState] = useState({});

    useEffect(() => {

        if (props.q === null || props.q === undefined) {
            return
        }

        setState((state) => {
            return {
                ...state,
                suggestions: props.q.length > 0 ? null : undefined,
                forQ: props.q
            }
        })

        if (props.q.length > 0) {

            new TwelveDataAPI().search(props.q, (result, body, error) => {
                setState((state) => {
                    if (props.q === state.forQ) {
                        if (!error && body.status === 'ok') {
                            return {
                                ...state,
                                suggestions: body.data.filter(e => (e.country === "United States"))
                            }
                        } else {
                            return {
                                ...state,
                                suggestions: undefined
                            }
                        }
                    } else {
                        return state;
                    }
                })
            })

        }

    }, [props])

    return (
        <Box width={400} >
            {state.suggestions ?
                state.suggestions.filter((e, i) => (props.maxSuggestions === undefined || i < props.maxSuggestions)).map(suggestion =>
                    <Box style={{border: "1px solid black", borderTop: "none"}}>
                        <Button onClick={event => props.onClick(event, suggestion)}>
                            <Box width={384} p={1}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Box>
                                        {suggestion.instrument_name.length > 30 ?
                                            suggestion.instrument_name.substr(0, 27).trim() + "..."
                                        :
                                            suggestion.instrument_name
                                        }
                                    </Box>
                                    <Box>
                                        {suggestion.symbol}
                                    </Box>
                                </Grid>
                            </Box>
                        </Button>
                    </Box>
                )
            :
                state.suggestions === null ?
                    <Loading />
                :
                    ""
            }
        </Box>
    )
}