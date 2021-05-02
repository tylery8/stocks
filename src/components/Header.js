import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import style from "../style";

export default function Header(props) {

    const publicLinkStyle = {
        margin: "0 16px",
        backgroundColor: style.mainGreen,
        color: "white",
        minWidth: "130px"
    }

    const privateLinkStyle = {
        margin: "0 16px",
        backgroundColor: props.loggedIn ? style.mainGreen : style.lightGreen,
        color: "white",
        minWidth: "130px"
    }

    const loginStyle = {
        margin: "0 16px",
        backgroundColor: props.loggedIn ? style.mainRed : style.mainGreen,
        color: "white",
        minWidth: "130px"
    }

    return (
        <Box borderBottom="4px solid black" p={2} width={1176}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Box width={300} fontSize="48px" fontWeight="bold">
                    {props.title}
                </Box>
                <Box>
                    <Button href="/" variant="contained" size="large" style={publicLinkStyle}>
                        Explore
                    </Button>
                    <Button href="/watchlist" disabled={!props.loggedIn} variant="contained" size="large" style={privateLinkStyle}>
                        Watchlist
                    </Button>
                    <Button href="/portfolio" disabled={!props.loggedIn} variant="contained" size="large" style={privateLinkStyle}>
                        Portfolio
                    </Button>
                    <Button href="/login" variant="contained" size="large" style={loginStyle}>
                        {props.loggedIn ? "Log out" : "Log in"}
                    </Button>
                </Box>
            </Grid>
        </Box>
    );
}