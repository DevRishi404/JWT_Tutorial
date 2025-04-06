import Snackbar from '@mui/material/Snackbar';

function ShowSnackBar(props) {

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={2000}
            message={props.message} 
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            onClose={props.onClose}
        />
    );
}

export default ShowSnackBar;