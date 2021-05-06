import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import style from "../style";

export default function ErrorMessage(props) {    
    return (
        <Snackbar open={!!props.errorMessage} autoHideDuration={10000} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={props.onClose} severity="error" style={{backgroundColor: style.mainRed}}>
                    {props.errorMessage}
                </MuiAlert>
        </Snackbar>
    )
}