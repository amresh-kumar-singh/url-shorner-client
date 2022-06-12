import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Instance from "../../../axios/axiosInstance";
import { checkEmail } from "../../../utils/checkCredential";

const ForgotPassword = ({
  setToggle,
  setMessage,
  setDisplay,
  email,
  setEmail,
}) => {
  const [err, setErr] = useState();

  const handleForgotPassword = async (e) => {
    if (!checkEmail(email)) {
      setErr("Please Enter Valid Email Id");
      return;
    }
    try {
      const res = await Instance.post("/forgotPassword", { email: email });
      setMessage(res.data.message);
      setDisplay(2);
      console.log(res.data);
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(error.response);
    }
  };

  const handleCancle = () => {
    setToggle(true);
  };

  return (
    <Stack
      spacing={3}
      width="95%"
      height="60%"
      component={Paper}
      justifyContent="center"
      padding="10px 20px"
    >
      <Typography variant="h5" color="secondary">
        Forgot Password
      </Typography>
      <TextField
        type="email"
        label="Enter Email Address"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        autoFocus
        onChange={(e) => {
          setEmail(e.target.value);
          setErr("");
        }}
      />
      <Stack direction="row" spacing={2}>
        <Button
          color="warning"
          variant="contained"
          sx={{ flex: 1, opacity: 0.9 }}
          onClick={handleCancle}
        >
          Cancle
        </Button>
        <Button
          color="secondary"
          variant="contained"
          sx={{ flex: 2 }}
          onClick={handleForgotPassword}
        >
          Search You Email
        </Button>
      </Stack>
    </Stack>
  );
};

export default ForgotPassword;
