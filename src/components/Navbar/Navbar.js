import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/dataContext";
import LinkedInIcon from '@mui/icons-material/LinkedIn';


import "./Navbar.css";
const pages = ["Budgets", "Create Budget"];

function ResponsiveAppBar() {
  const { userRole, setUserRole } = useContext(DataContext);

  useEffect(() => {
    console.log(userRole, "UR NAVBAR");
  }, [userRole]);

  const handleCreateBudget = () => {
    navigate("/allBudgets");
  };

  const handleOther = () => {
    navigate("/createBudgets");
  };
  const navigate = useNavigate();
  const restartUserRole = {
    userRole: "default",
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" style={{ background: "#2E3B55" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {userRole.userRole === "FINANCE" ? (
            <LinkedInIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              onClick={() => navigate("/budgetCreation")}
            />
          ) : (
            <LinkedInIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              onClick={() => navigate("/")}
            />
          )}
          <LinkedInIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages &&
              pages.map((page) => {
                return (
                  <div>
                    {(userRole.userRole === "TEAM_LEADER" ||
                      userRole.userRole === "FINANCE") && (
                      <Button
                        key={page}
                        onClick={
                          page === "Budgets" ? handleCreateBudget : handleOther
                        }
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    )}
                  </div>
                );
              })}
          </Box>
          {userRole.userRole === "RR_HH" && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => navigate("/requirements")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Requirements
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <div>
              {userRole.userRole === "default" ? (
                <div onClick={() => handleLogin()}>
                  {" "}
                  <h5 className="link"> Login</h5>
                </div>
              ) : (
                <div
                  onClick={() => {
                    localStorage.setItem(
                      "userRole",
                      JSON.stringify({ userRole: "default" })
                    );
                    setUserRole(restartUserRole);
                    navigate("/login");
                  }}
                >
                  {" "}
                  Logout
                </div>
              )}
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
