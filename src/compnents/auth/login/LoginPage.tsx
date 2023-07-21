import {ILoginPage, ILoginResult} from "./types";
import {useState} from "react";
import http_common from "../../../http_common";
import {useFormik} from "formik";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "../types";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const init : ILoginPage = { 
        email: "",
        password: ""
    };
    const [message, setMessage] = useState<string>('');

    const onSubmitFormik = async (values: ILoginPage) => {
        try {
            const result = await http_common.post<ILoginResult>('api/auth/login', values);
            //console.log("Login is good", result.data);
            const {data} = result;
            const token = data.access_token;
            localStorage.token = token;
            var user = jwtDecode(token) as IUser;
            console.log("Login user info", user);
            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
            console.log("User info", user);
            setMessage("");
            navigate("/");
        }
        catch {
            setMessage("Дані вказнао не вірно");
        }
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onSubmitFormik
    });

    const {values, handleChange, handleSubmit} = formik;

    return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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


    )
}
export default LoginPage;