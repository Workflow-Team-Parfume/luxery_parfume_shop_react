import { useState } from "react";
import { useFormik } from "formik";

import { Link, useNavigate } from "react-router-dom";
import { IRegisterPage } from "./types";
import CropperModal from "../../common/CropperModal";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "@mui/icons-material";

const RegisterPage = () => {
  const navigate = useNavigate();

  const init: IRegisterPage = {
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
  };
  const [message, setMessage] = useState<string>("");

  const onSubmitFormik = async (values: IRegisterPage) => {
    try {
      console.log("Register user");
      navigate("/");
    } catch {
      setMessage("Дані вказнао не вірно");
    }
  };

  const formik = useFormik({
    initialValues: init,
    onSubmit: onSubmitFormik,
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={handleChange}
                value={values.username}
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
                value={values.email}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                value={values.phoneNumber}
                autoComplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
export default RegisterPage;
