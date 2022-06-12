import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { InputAdornment } from "@mui/material";
// import Box from '@mui/material/Box'

import Adornment from "./Adornment";
import useAxios from "../../hooks/useAxios";
import { checkEmail, checkPassword } from "../../utils/checkCredential";

// const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
// // Minimum eight max 20 , at least one uppercase letter, one lowercase letter, one number and one special characte
// const passwordRegEx =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

const SignUp = ({ setValue, setToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfirmPassword, setErrConfirmPassword] = useState("");
  const [response, loading, ServerError, Fetch] = useAxios();

  const handleEmailCheck = (e) => {
    if (!checkEmail(email)) {
      console.log(email);
      email && setErrEmail("Please Enter Valid Email Id");
    }
  };

  const handlePasswordCheck = () => {
    if (!checkPassword(password)) {
      password &&
        setErrPassword(
          "Minimum 8 character, atleat one uppercase, lowercase and special character"
        );
    }
  };

  const handleConfirmPassword = (e) => {
    setErrConfirmPassword("");
    setConfirmPassword(e.target.value);
    if (!errPassword && password === e.target.value) {
      console.log("match");
      setConfirmPassword(() => e.target.value);
      return;
    }

    setErrConfirmPassword(
      e.target.value && (errPassword || "Password Did't Match")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Fetch({
      url: "/register",
      method: "POST",
      requestConfig: {
        email: email,
        password: password,
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItem: "center",
        flexDirection: "column",
        opacity: loading ? "0.4" : "1",
        cursor: loading && "wait",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ color: "black" }}>
        🔐
      </Typography>
      <Typography component="h1" varient="h5">
        SignUp
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          required
          label="Enter Email"
          type="email"
          fullWidth
          error={!!errEmail}
          variant="standard"
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setErrEmail("");
          }}
          onBlur={handleEmailCheck}
          helperText={errEmail}
        />
        <TextField
          required
          fullWidth
          label="Enter Password"
          type="password"
          variant="standard"
          placeholder="Enter Password"
          sx={{ mt: 3 }}
          error={!!errPassword}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrPassword("");
          }}
          helperText={
            errPassword ||
            "Atleast one lowercase, number, uppercase, among @$!%*?&"
          }
          onBlur={handlePasswordCheck}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Adornment password={password} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          required
          fullWidth
          // error={!!errConfirmPassword}
          label="Confirm Password"
          type="password"
          variant="standard"
          placeholder="Confirm Password"
          sx={{ mt: 3 }}
          onChange={handleConfirmPassword}
          helperText={errConfirmPassword}
        />
        <div style={{ display: "flex" }}>
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Remember Me"
          />
        </div>
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          disabled={
            !!errConfirmPassword ||
            !!errPassword ||
            !!errEmail ||
            !email ||
            !password ||
            !confirmPassword ||
            loading
          } //this prop take only Boolean
          sx={{ mt: 3, mb: 2 }}
        >
          {!loading ? "SignUp" : "Loading..."}
        </Button>

        <Grid container>
          <Grid item xs sx={{ display: "flex" }}>
            <Button
              size="small"
              sx={{
                padding: 0,
                margin: 0,
                fontSize: "10px",
              }}
              onClick={() => setToggle(false)}
            >
              Forgot Password
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="small"
              sx={{
                padding: 0,
                margin: 0,
                fontSize: "10px",
              }}
              onClick={() => setValue(1)}
            >
              Already Have an account? Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
