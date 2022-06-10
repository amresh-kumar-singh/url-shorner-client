import React from "react";

import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { UserState } from "../context";
import { Button, IconButton, Stack, Toolbar } from "@mui/material";
import "./header.css";
export default function Header() {
  const { user, setUser } = UserState();

  const handleLogout = () => {
    setUser({});
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "#090d00", color: "rgba(255, 255, 255, 0.25)" }}
    >
      <Toolbar
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
        }}
      >
        <div className="wrapper">
          <span className="logo">✂️</span>
          <div>
            <p>
              <span> URL shortner</span>
              &mdash; Trim Your URL &mdash;
            </p>
          </div>
        </div>
        {user?.email && (
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="subtitle2" color="GrayText">
              Wecome,{" "}
            </Typography>
            <Typography variant="body2">{user?.email}</Typography>
            <Button
              size="small"
              variant="text"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
