import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { useGoogleLogin } from "@react-oauth/google";
import { AuthUserActionType, IUser, ILogin } from "../types";
import http_common from "../../../http_common";
import jwtDecode from "jwt-decode";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const initialValues: ILogin = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .test(
        "checkEmail",
        "Email does not exist or is not registered yet",
        async (value) => {
          if (isSubmit) {
            setIsSubmit(false);
            try {
              const result = await http_common.get(
                `api/Users/checkEmailExists/${value}`
              );
              const { data } = result;
              return data;
            } catch (error) {
              console.error("Error during email validation:", error);
              return false;
            }
          } else return true;
        }
      ),
    password: Yup.string().required("Password is required"),
  });

  const onHandleSubmit = async (values: ILogin) => {
    try {
      await loginSchema.validate(values);

      const result = await http_common.post("api/Account/login", values);

      const { data } = result;
      const token = data.token;
      localStorage.token = token;
      var user = jwtDecode(token) as IUser;
      dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: {
          id: user.id,
          userName: user.userName,
          email: user.email,
          profilePicture: user.profilePicture,
          registrationDate: user.registrationDate,
          phoneNumber: user.phoneNumber,
          roles: user.roles,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      // Add code to show an error message to the user.
    }
  };

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse: any) => {
  //     axios
  //       .get(
  //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${codeResponse.access_token}`,
  //             Accept: "application/json",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         localStorage.access_token = codeResponse.access_token;
  //         if (res.data) {
  //           dispatch({
  //             type: AuthUserActionType.LOGIN_GOOGLE_USER,
  //             payload: {
  //               id: res.data.id,
  //               userName: res.data.name,
  //               email: res.data.email,
  //               profilePicture: res.data.picture,
  //               registrationDate: "",
  //               phoneNumber: "",
  //               roles: ["user"],
  //             },
  //           });
  //         }
  //         navigate(-1);
  //       })
  //       .catch((err) => {
  //         console.error("Google login error:", err);
  //         // Add code to show an error message to the user.
  //       });
  //   },
  //   onError: (error) => {
  //     console.log("Login Failed:", error);
  //     // Add code to show an error message to the user.
  //   },
  // });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: onHandleSubmit,
  });

  const { values, handleChange, handleSubmit, touched, errors } = formik;

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={values.email}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            value={values.password}
            autoComplete="current-password"
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {/* <Button
            onClick={() => login()}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#4285F4", color: "white" }} // Customize the button's appearance
          >
            Sign in with Google
          </Button> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
