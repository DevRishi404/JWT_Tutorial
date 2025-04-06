import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";
import { registerWithCredentials } from "../../redux/slices/AuthSlice";
import ShowSnackBar from "../ReusableComponents/ShowSnackbar";
import { Link } from "react-router-dom";

const Register = () => {

    const dispatch = useDispatch();
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password")

    const { isLoading, success } = useSelector(state => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState(false);

    useEffect(() => {
        if (success) {
            setSnackbar(true);
        }
    }, [success])

    const onSubmit = (model) => {
        const data = {
            email: model.email,
            password: model.password
        }
        dispatch(registerWithCredentials(data));
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                                <Typography variant="h2" align="center">Register</Typography>
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
                                                required: "Password required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password should be greater than 8 chars"
                                                }
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    label="Password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    fullWidth
                                                    slotProps={{
                                                        input: {
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={handleClickShowPassword}
                                                                    >
                                                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }
                                                    }}
                                                    error={!!errors.password} // Shows the error state on the TextField
                                                    helperText={errors.password?.message} // Displays the error message below the TextField
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid size={12}>
                                        <Controller
                                            name="confirmPassword"
                                            control={control}
                                            rules={{
                                                required: "Confirm password is required",
                                                validate: (value) => value === password || "Password don't match."
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    variant="outlined"
                                                    label="Confirm Password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    fullWidth
                                                    error={!!errors.confirmPassword} // Shows the error state on the TextField
                                                    helperText={errors.confirmPassword?.message} // Displays the error message below the TextField
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <CardActions sx={{ display: "flex", justifyContent: "center", width: "100%", padding: 0, marginTop: 2 }}>
                                        <Button variant="contained" type="submit" fullWidth>Submit</Button>
                                    </CardActions>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </form>
            <Box sx={{ marginTop: 5 }}>
                <Typography align="center" variant="body1">New? <Link to='/login' >Login here</Link> </Typography>
            </Box>
            <ShowSnackBar open={snackbar} onClose={handleSnackbarClose} message={success} />
        </>
    )
}

export default Register;