import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ValidateForm from "./ValidateForm";

import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Signup = (props) => {
  const initialValues = {
    name: "",
    address: "",
    city: "",
    state: "",
    mobile: "",
    email: "",
    password: "",
  };
  const [userValues, setUserValues] = useState(initialValues);
  const [userErrors, setUserErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const navigate = useNavigate();
  const handleClose = () => {
    props.setOpen(false);
  };
  function handleChange(e) {
    const { id, value } = e.target;
    setUserValues({ ...userValues, [id]: value });
  }
  function formHandler(e) {
    e.preventDefault();
    setUserErrors(ValidateForm(userValues));
    setIsSubmit(true);
  }
  useEffect(() => {
    if (Object.keys(userErrors).length === 0 && isSubmit) {
      localStorage.setItem("dailyDairyUserValues", JSON.stringify(userValues));
      alert("Signup Sucessful, login using email");
      // navigate("/");
    }
  }, [userErrors]);

  return (
    <Dialog
      fullWidth={true}
      scroll="body"
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle sx={{ textAlign: "center" }}>SignUp</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <form onSubmit={formHandler}>
            <TextField
              id="name"
              label="Name"
              variant="filled"
              value={userValues.name}
              onChange={handleChange}
            />
            <p className="error">{userErrors.name}</p>

            <TextField
              id="address"
              label="Address"
              variant="filled"
              value={userValues.address}
              onChange={handleChange}
            />
            <p className="error">{userErrors.address}</p>

            <TextField
              id="city"
              label="City"
              variant="filled"
              value={userValues.city}
              onChange={handleChange}
            />
            <p className="error">{userErrors.city}</p>

            <TextField
              id="state"
              label="State"
              variant="filled"
              value={userValues.state}
              onChange={handleChange}
            />
            <p className="error">{userErrors.state}</p>

            <TextField
              id="mobile"
              label="Mobile"
              variant="filled"
              value={userValues.mobile}
              onChange={handleChange}
            />
            <p className="error">{userErrors.mobile}</p>

            <TextField
              id="email"
              label="Email ID"
              variant="filled"
              value={userValues.email}
              onChange={handleChange}
            />
            <p className="error">{userErrors.email}</p>

            <TextField
              id="password"
              label="Password"
              variant="filled"
              value={userValues.password}
              onChange={handleChange}
            />
            <p className="error">{userErrors.password}</p>
            <Button type="submit" variant="contained">
              SignUp
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
