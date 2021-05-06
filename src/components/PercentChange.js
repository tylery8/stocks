import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import style from "../style";

export default function PercentChange(props) {

    const width = props.width || 80;

    let arrowFontSize;
    let textFontSize;
    let arrowWidth;
    switch (props.size) {
        case "xl":
            arrowFontSize = "80px";
            textFontSize = "36px";
            arrowWidth = 60;
            break;
        case "large":
            arrowFontSize = "60px";
            textFontSize = "24px";
            arrowWidth = 45;
            break;
        case "small":
            arrowFontSize = "28px";
            textFontSize = "12px";
            arrowWidth = 20;
            break;
        default:
            arrowFontSize = "40px";
            textFontSize = "16px";
            arrowWidth = 30;
            break;
    }

    if (props.prev === undefined || props.prev === null || props.current === undefined || props.current === null) {
        return null;
    }

    const percentChange = props.prev === 0 ? 0 : ((props.current - props.prev)/props.prev * 100);

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Box width={arrowWidth}>
                {percentChange >= 0 ?
                    <ArrowDropUpRoundedIcon style={{ fill: style.mainGreen, fontSize: arrowFontSize }} />
                :
                    <ArrowDropDownRoundedIcon style={{ fill: style.mainRed, fontSize: arrowFontSize }} />
                }
            </Box>
            <Box width={width - arrowWidth} fontSize={textFontSize} fontWeight={500} style={{color: percentChange >= 0 ? style.mainGreen : style.mainRed}}>
                {Math.abs(percentChange).toFixed(2) + "%"}
            </Box>
        </Grid>
    )
}