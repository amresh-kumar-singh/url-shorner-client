import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useAxios from "../../hooks/useAxios";
import { checkEmail, checkPassword } from "../../utils/checkCredential";
import Message from "../Message";
import { UserState } from "../../context";

const Login = ({ setValue, setToggle }) => {
  const { storage } = UserState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [loading, ServerError, Fetch] = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Fetch({
      url: "/login",
      method: "POST",
      requestConfig: {
        email: email,
        password: password,
        urls: storage.map((item) => item.short),
      },
    });
  };

  useEffect(() => {
    if (ServerError) {
      setErrEmail(ServerError);
      setErrPassword(ServerError);
    }
  }, [ServerError]);
  const resetError = () => {
    setErrEmail("");
    setErrPassword("");
  };
  const handleEmailCheck = (e) => {
    if (!checkEmail(email)) {
      email && setErrEmail("Please Enter Valid Email Id");
    }
  };

  const handlePasswordCheck = () => {
    if (!checkPassword(password)) {
      password && setErrPassword("Please Enter valid Password");
    }
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
      {/* <Message error={ServerError?.response?.data} /> */}
      <Typography variant="h4" component="h1" sx={{ color: "black" }}>
        🔐
      </Typography>
      <Typography component="h1" varient="h5">
        Login
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          required
          label="Enter Email"
          type="email"
          fullWidth
          margin="normal"
          error={!!errEmail}
          variant="standard"
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
            resetError();
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
            resetError();
          }}
          helperText={
            errPassword ||
            "Atleast one lowercase, number, uppercase, among @$!%*?&"
          }
          onBlur={handlePasswordCheck}
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
            !!errPassword || !!errEmail || !email || !password || loading
          } //this prop take only Boolean
          sx={{ mt: 3, mb: 2 }}
        >
          {!loading ? "Login" : "Loading..."}
        </Button>

        <Grid container>
          <Grid item xs sx={{ display: "flex" }}>
            <Button
              size="small"
              sx={{ padding: 0, margin: 0, fontSize: "10px" }}
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
              onClick={() => setValue(0)}
            >
              Don't Have an account? SignUp
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
