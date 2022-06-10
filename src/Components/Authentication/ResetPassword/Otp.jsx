import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Instance from "../../../axios/axiosInstance";

const Otp = ({ setDisplay, message, email }) => {
  const [otp, setOtp] = useState();
  const [err, setErr] = useState();

  const handleSendOtp = async () => {
    if (otp < 1000 || otp > 9999) {
      console.log(typeof otp);
      setErr("Not valid OTP");
      return;
    }
    try {
      const res = await Instance.post("/otp", { otp: otp, email: email });
      // setOtpMessage(res.data.message);
      if (res.status === 204) {
        setDisplay(3);
        return;
      }
      console.log(res.data);
    } catch (error) {
      setErr(error?.response?.data?.message);
      console.log(error.response);
    }
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
        Please Enter 4 Digit OTP
      </Typography>
      <Typography variant="body2">{message}</Typography>
      <TextField
        type="number"
        label="Enter Otp"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        autoFocus
        inputProps={{ maxLength: 4, max: 9999, min: 1000 }}
        onChange={(e) => {
          setOtp(e.target.value);
          setErr("");
          return;
        }}
      />

      <Button
        color="secondary"
        variant="contained"
        onClick={handleSendOtp}
        disabled={!!err || otp?.length !== 4}
      >
        Validate
      </Button>
      <Typography variant="subtitle2">Didn't got OTP? resend</Typography>
    </Stack>
  );
};

export default Otp;
