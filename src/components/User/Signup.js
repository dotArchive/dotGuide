import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../firebase";
import { Button, Card, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const signup = () => {
    if (!username) {
      alert("Please enter username");
    } else if (!email) {
      alert("Email is required!");
    } else if (!password) {
      alert("Password is required!");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      registerWithEmailAndPassword(username, email, password);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/profile");
  }, [user, loading]);

  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        width: "50%",
        ml: "auto",
        mr: "auto",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#2f2f2f",
          p: 1,
          pl: 2,
          pr: 2,
          // mr: 1,
          width: "25%",
          minHeight: "10vh",
          textOverflow: "ellipsis",
          border: 1.25,
          borderColor: "#353540",
          flexGrow: 1,
        }}
      >
         <Typography variant="h3" sx={{ pt: 2, pb: 3, color: "white", textAlign: "center" }}>
          Signup
        </Typography>
        <TextField
          sx={{
            pb: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderRadius: 3,
                mt: 0.5,
                mb: 0.5,
              },
              "& adornedEnd": {
                pr: 0,
              },
            },
          }}
          size="small"
          variant="outlined"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />
        <TextField
          sx={{
            pb: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderRadius: 3,
                mt: 0.5,
                mb: 0.5,
              },
              "& adornedEnd": {
                pr: 0,
              },
            },
          }}
          size="small"
          variant="outlined"
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <TextField
          sx={{
            pb: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderRadius: 3,
                mt: 0.5,
                mb: 0.5,
              },
              "& adornedEnd": {
                pr: 0,
              },
            },
          }}
          size="small"
          variant="outlined"
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
        <TextField
          sx={{
            pb: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
                borderRadius: 3,
                mt: 0.5,
                mb: 0.5,
              },
              "& adornedEnd": {
                pr: 0,
              },
            },
          }}
          size="small"
          variant="outlined"
          type="password"
          className="register__textBox"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button>
            <ArrowBackIcon sx={{ color: "gray" }} onClick={() => navigate('/')} />
          </Button>
          <Button variant="text" onClick={signup}>
            <CheckCircleOutlineIcon sx={{ color: "#468ef3", fontSize: 28 }} />
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Signup;
