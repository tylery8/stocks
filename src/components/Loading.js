import { CircularProgress, Box, Grid } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import style from "../style";

export default function Loading(props) {
    const [state, setState] = useState({visible: false});
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        setTimeout(() => {
            if (mounted.current) {
                setState({visible: true})
            }
        }, props.delay || 800);

        return () => (mounted.current = false);
    }, [props]);

    return (
        <Box height={props.height} width={props.width} >
            <Grid container justify="center">
                {state.visible || state.delay === 0 ? <CircularProgress style={{color: style.mainRed}} /> : ""}
            </Grid>
        </Box>
    );
}