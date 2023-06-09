import React from "react";
import { Container, Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Card, Grid, alertClasses } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";



function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // form validation
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateFormData = (data) => {
    const errors = {};

    // Email validation
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    // Password validation
    if (!data.password) {
      errors.password = "Password is required";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(data.password)) {
      errors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number";
    }

    return errors;
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/user/signin", formData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("user-token", JSON.stringify(token));
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => alert(err.response.data.message));

  }

  return (
    <Container minWidth="md" maxWidth="md">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "8rem",
        }}
      >
        <Card
          sx={{
            width: "40%",
            borderRadius: "1rem",
            p: "1rem",
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            Login
          </Typography>

          <Box component="form" onSubmit={onSubmitHandler} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/register">
                    <Link component="span" variant="caption">
                      {"Create a New Account"}
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;
