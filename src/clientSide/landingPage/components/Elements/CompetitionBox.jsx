import React from "react";
import styled from "styled-components";

const CompetitionBox = ({ img, title, text, action }) => {
  return (
    <Wrapper>
      <ImgBtn
        className="animate pointer"
        onClick={action ? () => action() : null}
      >
        <img className="radius8" src={img} alt="competition" />
      </ImgBtn>
      <h3 className="font20 extraBold">{title}</h3>
      <p className="font13">{text}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  img {
    width: 100%;
    height: auto;
    margin: 20px 0;
    transition: opacity 0.3s;
  }
  h3 {
    padding-bottom: 10px;
  }
`;

const ImgBtn = styled.button`
  background-color: transparent;
  border: 0;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  :hover > img {
    opacity: 0.5;
  }
`;

export default CompetitionBox;
