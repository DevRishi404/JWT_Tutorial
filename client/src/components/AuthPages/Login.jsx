import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";
import { useDispatch, useSelector } from "react-redux";
import { loginWithCredentials } from "../../redux/slices/AuthSlice";
import ShowSnackBar from "../ReusableComponents/ShowSnackbar";
import { Link, useNavigate } from "react-router-dom";


const Login = (props) => {

    // const token = localStorage.getItem("accessToken");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, isLoading, error } = useSelector((state) => state.auth);
    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const [snackbar, setSnackbar] = useState(false);

    useEffect(() => {
        if (error) {
            setSnackbar(true);
        }
    }, [error])

    useEffect(() => {
        if(token) {
            navigate('/', {replace: true});
        }
    }, [token]);

    const onSubmit = (model) => {
        console.log(model);
        const data = {
            email: model.email,
            password: model.password,
        }

        dispatch(loginWithCredentials(data));
    }

    const loading = () => {
        return (
            <p>Loading...</p>
        )
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <Card variant="elevation" raised={true}>
                        <CardContent>
                            <Box>
                                <Typography variant="h2" align="center">Login</Typography>
                            </Box>
                            <Box sx={{ padding: 8, width: 500 }}>
                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{ required: "Email is required" }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    label="Email"
                                                    type="email"
                                                    fullWidth
                                                    error={!!errors.email} // Shows the error state on the TextField
                                                    helperText={errors.email?.message} // Displays the error message below the TextField
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid size={12}>
                                        <Controller
                                            name="password"
                                            control={control}
                                            rules={{ 
                                                required: "Password is required" 
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    label="Password"
                                                    type="password"
                                                    fullWidth
                                                />
                                            )}
                                        />

                                    </Grid>
                                    <CardActions sx={{ display: "flex", justifyContent: "center", width: "100%", padding: 0, marginTop: 2 }}>
                                        {
                                            isLoading ? loading() :
                                                <Button variant="contained" type="submit" fullWidth>Submit</Button>
                                        }
                                    </CardActions>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </form>
            <Box sx={{marginTop: 5}}>
                <Typography align="center" variant="body1">New? <Link to='/register' >Register here</Link> </Typography>
            </Box>
            <ShowSnackBar open={snackbar} message={error} onClose={handleSnackbarClose} />
        </>
    )
}

export default Login;