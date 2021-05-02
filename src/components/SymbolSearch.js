import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import SymbolSuggestions from "./SymbolSuggestions";


export default function SymbolSearch(props) {

    const [state, setState] = useState({text: ""});

    const handleTextChange = (event) => {
        setState({...state, text: event.target.value})
    }

    const handleSelectionClick = (event, value) => {
        props.onSelection(event, value);
        setState({...state, text: value.symbol, selection: value.symbol})
    }

    return (
        <Box width={400}>
            <TextField autoFocus autoComplete='off' fullWidth value={state.text} id="symbol-search" label="Search" variant="outlined" onChange={handleTextChange} />
            <SymbolSuggestions q={state.text !== state.selection ? state.text : ""} maxSuggestions={props.maxSuggestions} onClick={handleSelectionClick} />
        </Box>
    )
}