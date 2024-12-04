import React from "react";
import styled from "styled-components";
// Components
import BlogBox from "../Elements/BlogBox";
import FullButton from "../Buttons/FullButton";
import TestimonialSlider from "../Elements/TestimonialSlider";

export default function OlympicEvents() {
  return (
    <Wrapper id="olympic-events">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Upcoming Olympic Events</h1>
            <p className="font13">
              Join us for the official events of the Olympic Committee, where
              athletes and fans come together in celebration of sportsmanship
              and excellence. Explore our events below!
            </p>
          </HeaderInfo>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Opening Ceremony"
                text="Witness the spectacular opening ceremony that marks the start of the Olympic Games."
                tag="ceremony"
                author="July 26, 2024"
                action={() => alert("Event details")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Athletics Showcase"
                text="Watch top athletes from around the world compete in track and field events."
                tag="competition"
                author="July 28, 2024"
                action={() => alert("Event details")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Swimming Finals"
                text="Don’t miss the thrilling swimming finals with top athletes competing for gold."
                tag="competition"
                author="July 30, 2024"
                action={() => alert("Event details")}
              />
            </div>
          </div>
          <div className="row textCenter">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Gymnastics Finals"
                text="Experience the beauty and precision of gymnastics as athletes compete for the podium."
                tag="competition"
                author="August 1, 2024"
                action={() => alert("Event details")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Closing Ceremony"
                text="Join us as we celebrate the achievements of athletes and bid farewell to the Olympic Games."
                tag="ceremony"
                author="August 11, 2024"
                action={() => alert("Event details")}
              />
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <BlogBox
                title="Paralympic Games Kickoff"
                text="Celebrate the beginning of the Paralympic Games with athletes showcasing inspiring talents."
                tag="ceremony"
                author="August 28, 2024"
                action={() => alert("Event details")}
              />
            </div>
          </div>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton
                title="Load More"
                action={() => alert("Load more events")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="lightBg" style={{ padding: "50px 0" }}>
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">What Our Attendees Say</h1>
            <p className="font13">
              Hear from fans and attendees about their experiences at our
              events. Join the celebration and become part of the Olympic
              community!
            </p>
          </HeaderInfo>
          <TestimonialSlider />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
