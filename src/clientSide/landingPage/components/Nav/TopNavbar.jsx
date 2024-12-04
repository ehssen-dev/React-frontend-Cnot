import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink for navigation
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuth } from "../../../../AuthContext"; // Adjust path as needed
// Components
import Sidebar from "../Nav/Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
  const { logout, user } = useAuth(); // Use Auth context

  useEffect(() => {
    const handleScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate whiteBg"
        style={{ height: y > 100 ? "60px" : "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          <RouterLink
            to="/" // Use RouterLink to navigate to the home path
            className="pointer flexNullCenter"
          >
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              CNOT
            </h1>
          </RouterLink>
          <BurgerWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurgerWrapper>
          <UlWrapper className="flexNullCenter">
            {["home", "services", "projects", "blog", "pricing", "contact"].map(
              (item) => (
                <li key={item} className="semiBold font15 pointer">
                  <ScrollLink
                    activeClass="active"
                    style={{ padding: "10px 15px" }}
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-80}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </ScrollLink>
                </li>
              )
            )}
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <a href="/eventUser" style={{ padding: "10px 30px 10px 0" }}>
                Competitions
              </a>
            </li>
            <li className="semiBold font15 pointer">
              <a href="/login" style={{ padding: "10px 30px 10px 0" }}>
                Log in
              </a>
            </li>
            <li className="semiBold font15 pointer flexCenter">
              <a
                href="/members/home"
                className="radius8 lightBg"
                style={{ padding: "10px 15px" }}
              >
                Get Started
              </a>
            </li>
            {user && (
              <li className="semiBold font15 pointer flexCenter">
                <button
                  onClick={handleLogout}
                  className="radius8 lightBg"
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#1890ff", // Ant Design blue color
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;

const NavInner = styled.div`
  position: relative;
  height: 100%;
`;

const BurgerWrapper = styled.button`
  outline: none;
  border: 0;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;

const UlWrapperRight = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
