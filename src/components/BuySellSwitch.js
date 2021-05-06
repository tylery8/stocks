import Switch from "@material-ui/core/Switch";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Box } from "@material-ui/core";
import style from "../style";

const StyledSwitch = withStyles({
    switchBase: {
      color: style.mainRed,
      '& + $track': {
        backgroundColor: style.mainRed,
      },
      '&$checked': {
        color: style.mainGreen,
      },
      '&$checked + $track': {
        backgroundColor: style.mainGreen,
      },
    },
    checked: {},
    track: {},
})(Switch);

export default function BuySellSwitch(props) {
    return (
        <Box fontWeight={500} fontSize={18}>
            <Grid container direction="row" alignItems="center">
                <StyledSwitch checked={props.checked} onChange={props.onChange} />
                <Box color={props.checked ? style.mainGreen : style.mainRed}>
                    {props.checked ? "Buy" : "Sell"}
                </Box>
            </Grid>
        </Box>
    )
}