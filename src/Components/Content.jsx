import React, { useState, lazy, Suspense } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import URLField from "./URLField";
import { UserState } from "../context";
import URLTable from "./URLTable";
import AuthTabs from "./Authentication/AuthTabs";
// import ForgotPassword from "./Authentication/ResetPassword/ForgotPassword";
// import ResetPassword from "./Authentication/ResetPassword";
// import { lazy } from "react";
const ResetPassword = lazy(() => import("./Authentication/ResetPassword"));

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#ccc",
}));

const Content = () => {
  const { user } = UserState();
  const [toggle, setToggle] = useState(true);

  return (
    <Box sx={{ padding: "10px 40px", alignContent: "center" }}>
      <Grid
        container
        spacing={4}
        sx={{ width: { sm: "100vw", md: "95vw", lg: "90vw", xl: "85vw" } }}
      >
        <Grid item height="90vh" sm={!user?.email ? 7 : 12} xs={12}>
          <MyPaper
            sx={{
              flexDirection: "column",
              padding: "8px 20px",
              justifyContent: "space-around",
            }}
          >
            <URLField />
            <URLTable />
          </MyPaper>
        </Grid>
        {!user?.email && (
          <Grid item sm={5} xs={12}>
            <MyPaper>
              {toggle ? (
                <AuthTabs setToggle={setToggle} />
              ) : (
                <Suspense fallback={<div>Loading...</div>}>
                  <ResetPassword setToggle={setToggle} />
                </Suspense>
              )}
            </MyPaper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Content;
