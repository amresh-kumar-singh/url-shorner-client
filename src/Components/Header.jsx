import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { UserState } from "../context";
import { Button, Stack, Toolbar } from "@mui/material";
import "./header.css";
import Message from "./Message";
import LogoutIcon from "@mui/icons-material/Logout";
import Instance from "../axios/axiosInstance";

export default function Header() {
  const { userState, userDispatcher } = UserState();

  const handleLogout = async () => {
    try {
      const res = await Instance.get("/logout");
      res.status === 204 && userDispatcher({ type: "USER", payload: {} });
    } catch (error) {
      let serverError = error?.response?.data?.message || error.message;
      userDispatcher({ type: "SERVER_ERROR", payload: serverError });
      console.error("Error During Logout: ", serverError);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#090d00",
        color: "rgba(255, 255, 255, 0.25)",
        fontSize: { md: "large", xs: "small", sm: "medium" },
        userSelect: "none",
      }}
    >
      {/* TODO: Make Message field coommon at on Place */}
      {userState?.message && <Message message={userState?.message} />}
      {userState?.error && <Message error={userState?.error} />}
      <Toolbar
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          minHeight: { xs: "35px", sm: "45px", md: "54px" },
        }}
      >
        <div className="wrapper">
          <Typography
            className="logo"
            sx={{ fontSize: { md: "2em", sm: "xx-large", xs: "large" } }}
          >
            ✂️
          </Typography>
          <div>
            <p>
              <span> URL shortner</span>
              &mdash; Trim Your URL &mdash;
            </p>
          </div>
        </div>
        {userState?.user?.email && (
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography
              color="whitesmoke"
              mr="4px"
              sx={{ textTransform: "none", opacity: "0.8" }}
            >
              {userState?.user?.email}
            </Typography>
            <Button
              size="small"
              variant="text"
              onClick={handleLogout}
              sx={{ color: "white" }}
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
