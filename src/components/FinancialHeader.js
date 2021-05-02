import Box from "@material-ui/core/Box";

export default function FinancialHeader(props) {
    return (
        <Box marginTop={1} py={1} fontWeight={500} borderBottom="2px solid black">
            {props.header}
        </Box>
    )
}