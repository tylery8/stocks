import Fab from "@material-ui/core/Fab";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import style from "../style";
import Box from "@material-ui/core/Box";
import TradeDialogue from "./TradeDialogue";
import { useState } from "react";

export default function TradeButton(props) {

    const [state, setState] = useState({});

    const setDialogue = (open) => {
        setState({
            ...state,
            dialogueOpen: open
        })
    }

    return (
        <Box>
            <TradeDialogue stock={props.stock} open={!!state.dialogueOpen} onClose={() => setDialogue(false)} />
            <Fab size="small" variant="extended" onClick={() => setDialogue(true)} style={{backgroundColor: style["mainGreen"], color: "white"}}>
                <AttachMoneyIcon />
                <Box marginRight={1}>
                    Place Trade
                </Box>
            </Fab>
        </Box>
    )
}