import { Paper, Stack, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { checkPassword } from "../../../utils/checkCredential";

const GeneratePassword = ({ otp, email }) => {
  const [err, setErr] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [response, loading, ServerError, Fetch] = useAxios();

  const handleGeneratePassword = async () => {
    if (!checkPassword(password)) {
      // console.log("was pass");
      setErr(
        "Minimum 8 character, atleat one uppercase, lowercase and special character"
      );
      return;
    }
    if (password !== confirmPassword) {
      setErr("Password Did't Match");
      return;
    }
    try {
      await Fetch({
        url: "/generatePassword",
        method: "POST",
        requestConfig: {
          email: email,
          password: password,
          otp: otp,
        },
      });
    } catch (error) {
      setErr(ServerError);
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
      sx={{ opacity: loading ? "0.5" : "1" }}
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
        disabled={!!err || !password || !confirmPassword}
      >
        Generate Password
      </Button>
    </Stack>
  );
};

export default GeneratePassword;
