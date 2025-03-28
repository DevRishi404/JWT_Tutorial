import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from "@mui/material/CardActions";
import { useDispatch, useSelector } from "react-redux";
import { loginWithCredentials } from "../../redux/slices/AuthSlice";



const Login = (props) => {

    const dispatch = useDispatch();

    const { register, control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (model) => {
        console.log(model);
        const data = {
            email: model.email,
            password: model.password,
        }
        dispatch(loginWithCredentials(data));
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
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
                                        <Button variant="contained" type="submit" fullWidth>Submit</Button>
                                    </CardActions>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </form>
        </>
    )
}

export default Login;