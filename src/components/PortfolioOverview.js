import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PercentChange from "./PercentChange";

export default function PortfolioOverview(props) {

    const deposit = props.deposit;
    const value = props.cash + props.stocks.reduce((prev, current) => prev + current.value, 0)

    return (
        <Grid container direction="row" justify="space-between" alignItems="center">
            <Box>
                <Grid container direction="column" justify="space-around" alignItems="flex-start">
                    <Box fontSize="36px" p={1} height={0.33}>
                        Investment
                    </Box>
                    <Box fontSize="36px" p={1} height={0.33}>
                        Value
                    </Box>
                    <Box fontSize="36px" p={1} height={0.33}>
                        Return
                    </Box>
                </Grid>
            </Box>
            <Box>
                <Grid container direction="column" justify="space-around" alignItems="flex-end">
                    <Box fontSize="36px" height={0.33} p={1}>
                        ${deposit.toFixed(2)}
                    </Box>
                    <Box fontSize="36px" height={0.33} p={1}>
                        ${value.toFixed(2)}
                    </Box>
                    <Box fontSize="36px" height={0.33} p={1} marginY={-3}>
                        <PercentChange width={160} size="xl" current={value || 1} prev={deposit || 1} />
                    </Box>
                </Grid>
            </Box>
        </Grid>
    )

}