import React, { useState } from "react";
import "../styles/dashboard.css";
import {
  Button,
  Select,
  Menu,
  MenuItem,
  createTheme,
  ThemeProvider,
  ButtonGroup,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router";

const DashBoard = () => {
  const initialBillingValues = {
    milkQuantity: 250,
    milkNumber: 1,
    curdQuantity: 250,
    curdNumber: 1,
    billCycle: 7,
    totalBasketAmount: 0,
    totalBillingAmount: 0,
  };
  const [toggleBillingEdit, setToggleBillingEdit] = useState(true);
  const [billingValues, setBillingValues] = useState(initialBillingValues);
  const theme = createTheme({
    palette: {
      action: {
        disabled: "black",
      },
    },
  });
  function getUserDetails() {
    const details = JSON.parse(localStorage.getItem("dailyDairyUserValues"));
    if (details === null) {
      return {};
    }
    return details;
  }
  const userDetails = getUserDetails();
  const doneButton = (
    <Button type="submit" name="done" variant="outlined" size="small">
      Done
    </Button>
  );
  const editButton = (
    <Button
      type="button"
      name="edit"
      variant="outlined"
      size="small"
      onClick={editToggle}
    >
      Edit
    </Button>
  );
  function billingHandleChange(e) {
    const { name, value } = e.target;
    setBillingValues({ ...billingValues, [name]: parseInt(value) });
  }
  function milkDecrement() {
    if (billingValues.milkNumber > 1) {
      setBillingValues({
        ...billingValues,
        milkNumber: billingValues.milkNumber - 1,
      });
    }
  }
  function milkIncrement() {
    setBillingValues({
      ...billingValues,
      milkNumber: billingValues.milkNumber + 1,
    });
  }
  function curdDecrement() {
    if (billingValues.curdNumber > 1) {
      setBillingValues({
        ...billingValues,
        curdNumber: billingValues.curdNumber - 1,
      });
    }
  }
  function curdIncrement() {
    setBillingValues({
      ...billingValues,
      curdNumber: billingValues.curdNumber + 1,
    });
  }
  function editToggle(e) {
    e.preventDefault();
    setToggleBillingEdit(true);
  }
  function basketFormHandle(e) {
    e.preventDefault();
    const { milkQuantity, milkNumber, curdQuantity, curdNumber, billCycle } =
      billingValues;
    const basketAmount =
      (milkQuantity * milkNumber + curdQuantity * curdNumber) / 10;
    const billingAmount = basketAmount * billCycle;
    setBillingValues({
      ...billingValues,
      totalBasketAmount: basketAmount,
      totalBillingAmount: billingAmount,
    });
    setToggleBillingEdit(false);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  function handleDelete() {
    localStorage.removeItem("dailyDairyUserValues");
    handleLogout();
  }
  function handleLogout() {
    navigate("/");
  }
  return (
    <div className="container-d">
      <div className="parent-container">
        <ThemeProvider theme={theme}>
          <div className="top-container">
            <div className="left-container">
              <h1>Hello, {userDetails.name}</h1>
              <div className="plan-container">
                <h2>Your Daily Basket</h2>
                <br />
                <div className="card">
                  <form onSubmit={basketFormHandle}>
                    <div className="milk-row">
                      <Button disabled>Milk</Button>
                      <Select
                        disabled={!toggleBillingEdit}
                        name="milkQuantity"
                        size="small"
                        value={billingValues.milkQuantity}
                        onChange={billingHandleChange}
                      >
                        <MenuItem value={250} defaultValue>
                          250 ml
                        </MenuItem>
                        <MenuItem value={500}>500 ml</MenuItem>
                        <MenuItem value={1000}>1 L</MenuItem>
                        <MenuItem value={5000}>5 L</MenuItem>
                      </Select>
                      <ButtonGroup
                        sx={{ margin: "0 10px" }}
                        disabled={!toggleBillingEdit}
                      >
                        <Button size="small" onClick={milkDecrement}>
                          -
                        </Button>
                        <Button disabled>{billingValues.milkNumber}</Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={milkIncrement}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                    <div className="curd-row">
                      <Button disabled>Curd</Button>
                      <Select
                        disabled={!toggleBillingEdit}
                        name="curdQuantity"
                        size="small"
                        value={billingValues.curdQuantity}
                        onChange={billingHandleChange}
                      >
                        <MenuItem value={250} defaultValue>
                          250 ml
                        </MenuItem>
                        <MenuItem value={500}>500 ml</MenuItem>
                        <MenuItem value={1000}>1 L</MenuItem>
                        <MenuItem value={5000}>5 L</MenuItem>
                      </Select>
                      <ButtonGroup
                        size="small"
                        sx={{ margin: "0 10px" }}
                        disabled={!toggleBillingEdit}
                      >
                        <Button size="small" onClick={curdDecrement}>
                          -
                        </Button>
                        <Button disabled>{billingValues.curdNumber}</Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={curdIncrement}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                  </form>
                </div>
                <h3>
                  Total Basket Amount: Rs {billingValues.totalBasketAmount}
                </h3>
              </div>
              <div className="billing-cycle-container">
                <h2>Billing Cycle</h2>
                <form onSubmit={basketFormHandle}>
                  <Select
                    disabled={!toggleBillingEdit}
                    sx={{ margin: "0 15px" }}
                    name="billCycle"
                    size="small"
                    value={billingValues.billCycle}
                    onChange={billingHandleChange}
                  >
                    <MenuItem value={7} defaultValue>
                      Weekly
                    </MenuItem>
                    <MenuItem value={30}>Monthly</MenuItem>
                    <MenuItem value={90}>3 Months</MenuItem>
                    <MenuItem value={180}>6 Months</MenuItem>
                    <MenuItem value={365}>1 Year</MenuItem>
                  </Select>
                  {toggleBillingEdit ? doneButton : editButton}
                </form>

                <h3>
                  Total Billing Amount: Rs {billingValues.totalBillingAmount}
                </h3>
              </div>
            </div>
            <div className="right-container">
              <br />

              <Button
                size="medium"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Account <AccountCircleIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>Delete Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              <br />
              <div className="billing-details-container">
                <h2>Billing Address</h2>
                {userDetails.name}
                <br />
                {userDetails.address}
                <br />
                {userDetails.city}
                <br />
                {userDetails.state}
                <br />
                {userDetails.mobile}
                <br />
                {userDetails.email}
              </div>
            </div>
          </div>
          <div className="bottom-container">
            <div className="billing-cycle">
              <h2>Billing History</h2>
              <table>
                <thead>
                  <tr>
                    <th className="table-cell">Date</th>
                    <th className="table-cell">Ref no.</th>
                    <th className="table-cell">Amount</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default DashBoard;
