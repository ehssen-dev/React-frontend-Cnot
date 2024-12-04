import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function FullButton({ title, url, border }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClick = () => {
    if (url) {
      navigate(url); // Navigate to the specified URL
    }
  };

  return (
    <Wrapper
      className="animate pointer radius8"
      onClick={handleClick} // Use handleClick to handle navigation
      border={border}
    >
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  border: 1px solid ${(props) => (props.border ? "#707070" : "#7620ff")};
  background-color: ${(props) => (props.border ? "transparent" : "#7620ff")};
  width: 100%;
  padding: 15px;
  outline: none;
  color: ${(props) => (props.border ? "#707070" : "#fff")};
  cursor: pointer; // Added cursor pointer for better UX
  :hover {
    background-color: ${(props) => (props.border ? "transparent" : "#580cd2")};
    border: 1px solid #7620ff;
    color: ${(props) => (props.border ? "#7620ff" : "#fff")};
  }
`;
