import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import style from "../style";

export default function SuccessMessage(props) {
    
    return (
        <Snackbar open={!!props.successMessage} autoHideDuration={10000} onClose={props.onClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={props.onClose} severity="success" style={{backgroundColor: style.mainGreen}}>
                    {props.successMessage}
                </MuiAlert>
        </Snackbar>
    )
}