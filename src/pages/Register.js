import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Mail as MailIcon, Lock as LockIcon } from "@mui/icons-material";
import styled from "styled-components";
import BgImage from "../assets/img/national.png";
import { Person as PersonIcon } from "@mui/icons-material";
import CnotLogo from "../assets/img/CnotLogo.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await AuthService.register({
        username,
        email,
        password,
        role: ["user"], // Example default role
      });
      setMessage(response.message);

      if (response.message === "User registered successfully!") {
        await AuthService.login({ username, password });
        navigate("/admin/dashboard"); // Change this to your desired route
      }
    } catch (error) {
      setMessage(error.message || "An error occurred during registration.");
    }
  };

  return (
    <RegisterContainer>
      <ImageSection>
        <img src={BgImage} alt="Background" />
      </ImageSection>
      <FormSection>
        <Wrapper>
          <Header>
            <Logo>
              <span>
                <img
                  src={CnotLogo}
                  alt="Logo Image"
                  style={{ width: "50px", height: "50px" }}
                />
              </span>
            </Logo>
            <Typography variant="h2" component="h1">
              Join Us!
            </Typography>
            <Typography variant="body1">Create an Account</Typography>
          </Header>
          <MainContent>
            {message && (
              <Alert severity={message.includes("Error") ? "error" : "success"}>
                {message}
              </Alert>
            )}
            <Box component="form" onSubmit={handleRegister}>
              <StyledTextField
                variant="outlined"
                fullWidth
                id="username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <PersonIcon />
                    </IconButton>
                  ),
                }}
              />
              <Line />

              <StyledTextField
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <MailIcon />
                    </IconButton>
                  ),
                }}
              />
              <Line />

              <StyledTextField
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <LockIcon />
                    </IconButton>
                  ),
                }}
              />
              <Line />

              <StyledTextField
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <LockIcon />
                    </IconButton>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                }
                label="I agree to the terms and conditions"
                style={{ margin: "15px 0" }}
              />
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={!termsAccepted}
              >
                Sign Up
              </StyledButton>
            </Box>
          </MainContent>
          <Footer>
            <Typography variant="body2">
              Already have an account? <Link to="/login">Login here</Link>
            </Typography>
          </Footer>
        </Wrapper>
      </FormSection>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const ImageSection = styled.div`
  flex: 1;
  background-image: url(${BgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121326;
`;

const Wrapper = styled.section`
  padding: 30px;
  background-color: #fff;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Header = styled.header`
  margin-bottom: 20px;
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #6065d9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: #fff;
  font-size: 16px;
`;

const MainContent = styled.section`
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  margin: 15px 0;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #6065d9, #17d7fa);
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  display: block;
  height: 45px;
  margin: 30px auto 0;
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #17d7fa, #6065d9);
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #99999955;
  margin: 3px 0;
`;
const Footer = styled.footer`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;

  a {
    color: #6065d9;
    text-decoration: none;
    font-weight: 500;
    margin-left: 5px;
  }
`;
