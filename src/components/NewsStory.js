import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export default function NewsStory(props) {

    const date = new Date(props.datetime * 1000);
    const dateStr = date.toLocaleDateString();
    const timeStr = date.toLocaleTimeString();

    return (
        <a href={props.url} style={{color: "black", textDecoration: "none"}} target="_blank" rel="noopener noreferrer">
            <Box p={1} marginTop={1} border="1px solid black" boxShadow={5} width={400} minHeight={100}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    {props.image ?
                        <Box width={132}>
                            <img src={props.image} alt={props.headline} style={{height: 80, width: 132}} />
                        </Box>
                    :
                        null
                    }
                    <Box width={props.image ? 236 : undefined}>
                        <Box fontWeight={500}>
                            {props.headline}
                        </Box>
                        <Box color="gray">
                            {`${dateStr.substr(0, dateStr.length - 5)} ${timeStr.substr(0, timeStr.length-6)} ${timeStr.substr(timeStr.length-2)}`}
                        </Box>
                    </Box>
                </Grid>
            </Box>
        </a>
    )
}