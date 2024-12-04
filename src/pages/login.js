import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import { Mail as MailIcon, Lock as LockIcon } from "@mui/icons-material";
import BgImage from "../assets/img/national.png";
import styled from "styled-components";
import CnotLogo from "../assets/img/CnotLogo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const user = await login({ username, password });

      if (user.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (user.role === "ROLE_ATHLETE") {
        navigate("/members/home");
      } else {
        setMessage("Unexpected role: " + user.role);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Invalid credentials");
    }
  };

  const handleBackToLanding = () => {
    navigate("/"); // Navigate to the landing page
  };

  return (
    <LoginContainer>
      <ImageSection>
        <img src={BgImage} alt="Background" />
      </ImageSection>
      <FormSection>
        <Wrapper>
          <Button
            variant="outlined"
            onClick={handleBackToLanding}
            style={{ marginBottom: "20px", color: "#6065d9" }}
          >
            Back to Landing Page
          </Button>
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
              Welcome back!
            </Typography>
            <Typography variant="body1">Login</Typography>
          </Header>
          <MainContent>
            {message && <Alert severity="error">{message}</Alert>}
            <Box component="form" onSubmit={handleLogin}>
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

              <LoginButton type="submit" variant="contained" color="primary">
                Login
              </LoginButton>
            </Box>
          </MainContent>
          <Footer>
            <Typography variant="body2">
              <Link to="/forgot-password" title="Forgot Password">
                Forgot Password?
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link to="/register" title="Register">
                Register
              </Link>
            </Typography>
          </Footer>
        </Wrapper>
      </FormSection>
    </LoginContainer>
  );
};

export default Login;

// Styled Components

const LoginContainer = styled.div`
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
  width: 400px; /* Increased width */
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    width: 90%; /* Responsive width for smaller screens */
  }
`;

const Header = styled.header`
  margin-bottom: 30px;
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

  span {
    font-size: 16px;
    color: #fff;
  }
`;

const MainContent = styled.section`
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  border: none;
  display: block;
  width: 100%;
  height: 45px;
  margin: 15px 0;
  padding: 10px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9; /* Light background color for input fields */

  &::placeholder {
    color: #999;
    font-size: 16px;
    font-weight: 300;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #99999955;
  margin: 10px 0;
`;

const LoginButton = styled(Button)`
  background: linear-gradient(to right, #6065d9, #17d7fa);
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  display: block;
  width: 120px;
  height: 45px;
  margin: 30px auto 0;
  outline: none;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #17d7fa, #6065d9);
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;

  p {
    margin: 0;
    font-weight: 300;
  }

  a {
    color: #6065d9;
    text-decoration: none;
    font-weight: 500;
    margin: 5px 0;
  }
`;
