import { Paper, Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

const GeneratePassword = ({ otp }) => {
  const [err, setErr] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const handleGeneratePassword = () => {};
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
        Generate Password
      </Typography>
      <TextField
        type="password"
        label="New Password"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        autoFocus
        onChange={(e) => {
          setPassword(e.target.value);
          setErr("");
          return;
        }}
      />
      <TextField
        type="password"
        label="Confirm New Password"
        helperText={err && err}
        required
        error={!!err}
        fullWidth
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setErr("");
          return;
        }}
      />

      <Button
        color="secondary"
        variant="contained"
        onClick={handleGeneratePassword}
        disabled={!!err}
      >
        Generate Password
      </Button>
    </Stack>
  );
};

export default GeneratePassword;
