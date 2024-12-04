import React from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";
import LogoImg from "../../assets/svg/Logo";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const getCurrentYear = () => new Date().getFullYear();

  return (
    <FooterWrapper>
      <div className="darkBg">
        <div className="container">
          <TopSection>
            <LogoSection>
              <ScrollLink to="home" smooth={true} offset={-80}>
                <LogoImg />
              </ScrollLink>
              <h1 className="font20 extraBold whiteColor">Cnot</h1>
            </LogoSection>
            <BackToTopLink to="home" smooth={true} offset={-80}>
              Back to top
            </BackToTopLink>
          </TopSection>

          <LinksSection>
            <FooterLink to="about" smooth={true} offset={-80}>
              About Us
            </FooterLink>
            <FooterLink to="contact" smooth={true} offset={-80}>
              Contact Information
            </FooterLink>
            <FooterLink to="/privacy-policy" as={RouterLink}>
              Privacy Policy
            </FooterLink>
            <FooterLink to="/terms-of-service" as={RouterLink}>
              Terms of Service
            </FooterLink>
          </LinksSection>

          <SocialMediaSection>
            <SocialLink
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="social-icon" />
            </SocialLink>
            <SocialLink
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="social-icon" />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn className="social-icon" />
            </SocialLink>
            <SocialLink
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="social-icon" />
            </SocialLink>
          </SocialMediaSection>

          <CopyrightSection>
            <StyleP>
              © {getCurrentYear()} - <span className="purpleColor">Cnot</span>{" "}
              All Rights Reserved
            </StyleP>
          </CopyrightSection>
        </div>
      </div>
    </FooterWrapper>
  );
}

// Styled Components
const FooterWrapper = styled.div`
  width: 100%;
  background-color: #121326;
  color: #fff;
  padding: 30px 0;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin-left: 10px;
  }
`;

const BackToTopLink = styled(ScrollLink)`
  color: #17d7fa;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #ffffff;
  }
`;

const LinksSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
`;

const FooterLink = styled(ScrollLink)`
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #17d7fa;
  }
`;

const SocialMediaSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
`;

const SocialLink = styled.a`
  color: #ffffff;
  transition: color 0.3s;

  &:hover {
    color: #17d7fa;
  }

  .social-icon {
    font-size: 28px;
  }
`;

const CopyrightSection = styled.div`
  text-align: center;
`;

const StyleP = styled.p`
  font-size: 14px;
  color: #ffffff;
`;
