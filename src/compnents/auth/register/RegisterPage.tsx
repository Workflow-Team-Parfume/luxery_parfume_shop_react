import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
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
import http_common from "../../../http_common";
import { AuthUserActionType, IRegister, IUser } from "../types";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const initialValues: IRegister = {
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
  };

  const registerSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(16, "Name must be at most 16 characters")
      .test("checkUsername", "Name already exists", async (value) => {
        if (isSubmit) {
          setIsSubmit(false);
          try {
            const result = await http_common.get(
              `api/Account/checkUsernameExists/${value}`
            );
            const { data } = result;
            return !data;
          } catch (error) {
            console.error("Error during userName validation:", error);
            return false;
          }
        } else return true;
      }),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email")
      .test("checkEmail", "Email already registered", async (value) => {
        if (isSubmit) {
          setIsSubmit(false);
          try {
            const result = await http_common.get(
              `api/Account/checkEmailExists/${value}`
            );
            const { data } = result;
            return !data;
          } catch (error) {
            console.error("Error during email validation:", error);
            return false;
          }
        } else return true;
      }),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least 1 special character"
      ),
    passwordConfirmation: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onHandleSubmit = async (values: IRegister) => {
    try {
      await registerSchema.validate(values);
      await http_common.post("api/Users/register", values).then(async () => {
        const result = await http_common.post("api/Users/login", {
          email: values.email,
          password: values.password,
        });

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
        navigate(-1);
      });
    } catch (error) {
      console.error("Error during register: ", error);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
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
                value={values.userName}
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
          <Typography variant="body2">
            Already have an account?{" "}
            <Link  to="/login">
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
export default RegisterPage;
