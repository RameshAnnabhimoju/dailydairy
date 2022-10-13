import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginAuthentication from "./LoginAuthentication";
import "../styles/login.css";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";
import Signup from "./Signup";

const Login = () => {
  const initialLoginValues = { email: "", password: "" };
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [loginErrors, setLoginErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  }
  function loginAuth(e) {
    e.preventDefault();
    setLoginErrors(LoginAuthentication(loginValues));
    setIsSubmit(true);
  }
  useEffect(() => {
    if (Object.keys(loginErrors).length === 0 && isSubmit) {
      navigate("/dashboard");
    }
  }, [loginErrors]);
  return (
    <div className="container">
      <Container maxWidth="sm">
        <Box
          maxWidth={"xs"}
          sx={{
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
            textAlign: "center",
            backgroundColor: "rgb(229, 247, 255)",
          }}
        >
          <Paper
            variant="elevation"
            elevation={2}
            style={{ padding: 20, backgroundColor: "rgb(160, 233, 187)" }}
          >
            <Typography variant="h3">Daily Dairy</Typography>
            <Typography variant="subHeading">
              Now Dairy at your doorstep !
            </Typography>
          </Paper>

          <h2>Login</h2>
          <form onSubmit={loginAuth}>
            <TextField
              className="input"
              id="standard-basic"
              label="Email ID"
              variant="outlined"
              name="email"
              value={loginValues.email}
              onChange={handleChange}
            />
            <p className="error">{loginErrors.email}</p>

            <TextField
              type="password"
              className="input"
              id="standard-basic"
              label="Password"
              variant="outlined"
              name="password"
              value={loginValues.password}
              onChange={handleChange}
            />
            <p className="error">{loginErrors.password}</p>

            <br />
            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </form>
          <p>New here? </p>
          <Button variant="text" size="small" onClick={handleClickOpen}>
            SignUp
          </Button>
        </Box>
        <Signup open={open} setOpen={setOpen} />
      </Container>
    </div>
  );
};
export default Login;
