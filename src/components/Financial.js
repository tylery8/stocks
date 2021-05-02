import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

export default function Financial(props) {
    return (
        <Box py={1}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Box>
                    {props.label}
                </Box>
                <Box fontWeight="bold">
                    {!props.value ? "NA" : props.round === undefined ? props.value : props.value.toFixed(props.round)}
                </Box>
            </Grid>
        </Box>
    )
}