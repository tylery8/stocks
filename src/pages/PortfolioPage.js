import Box from "@material-ui/core/Box";
import Header from "../components/Header";

export default function PortfolioPage(props) {
    return (
        <Box width={1176} margin="auto">
            <Header title="Portfolio" loggedIn={!!props.account_id} />
            <Box marginTop={4} fontSize={24}>
                Page under construction. Check back soon
            </Box>
        </Box>
    )
}