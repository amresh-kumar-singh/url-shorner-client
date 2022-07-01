import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import is_url from "../../utils/is_url";
import useInterceptor from "../../hooks/useInterceptor";
import { UserState } from "../../context";
import "./URLField.css";
import Instance from "../../axios/axiosInstance";

const URLField = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const axiosPrivate = useInterceptor();
  const { setStorage, userDispatcher } = UserState();

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setUrl(e.target.value);
  };

  const handleShortUrl = async (e) => {
    e.preventDefault();
    console.log("Entered URL");
    if (!url) {
      setError("Enter Url");
      return;
    }
    if (!is_url(url)) {
      setError("Enter valid Url");
      return;
    }
    try {
      setError("");
      const res = await axiosPrivate.post("/", { fullURL: url });
      setStorage((purl) => [...purl, res.data]);
      setUrl("");
    } catch (err) {
      console.log("Err:", err);
      let serverError = err?.response?.data?.message || err.message;
      setError(serverError);
      userDispatcher({ type: "SERVER_ERROR", payload: serverError });
      console.log("err: ", serverError);
    }
  };

  return (
    <Box
      className="effect3"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "-webkit-fill-available",
        gap: "5px",
        backgroundColor: "white",
        padding: "10px 20px",
      }}
      // component={Paper}
    >
      <TextField
        value={url}
        variant="outlined"
        label={error || "Enter Your URL"}
        type="url"
        fullWidth
        margin="dense"
        onChange={handleChange}
        error={!!error}
        autoComplete="none"
      ></TextField>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        color="secondary"
        onClick={handleShortUrl}
      >
        Shorten Your URL
      </Button>
    </Box>
  );
};

export default URLField;
