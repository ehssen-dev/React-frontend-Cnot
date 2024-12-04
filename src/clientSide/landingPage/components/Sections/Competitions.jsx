import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick"; // Import react-slick
import { getAllEvents } from "../../../../services/CommunicationInterne/EventService"; // Adjust the import path as needed

// Components
import CompetitionBox from "../Elements/CompetitionBox";
import FullButton from "../Buttons/FullButton";

// Assets
import AddImage from "../../assets/img/esprit.png";

export default function Competitions() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents();
        setEvents(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Wrapper id="competitions">
      <div className="whiteBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">Our Prestigious Competitions</h1>
            <p className="font13">
              Showcasing our top competitions
              <br />
              and remarkable achievements.
            </p>
          </HeaderInfo>
          <SliderContainer>
            <Slider {...settings}>
              {events.map((event) => (
                <div key={event.eventId}>
                  <CompetitionBox
                    img={event.imageUrl || AddImage} // Use event image URL or default image
                    title={event.name}
                    text={event.description}
                    action={() => alert(`Clicked on ${event.name}`)}
                  />
                </div>
              ))}
            </Slider>
          </SliderContainer>
          <div className="row flexCenter">
            <div style={{ margin: "50px 0", width: "200px" }}>
              <FullButton title="Load More" url="/eventUser" />{" "}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const HeaderInfo = styled.div`
  @media (max-width: 860px) {
    text-align: center;
  }
`;

const SliderContainer = styled.div`
  .slick-slide {
    padding: 0 10px;
  }
  .slick-dots {
    bottom: -30px;
  }
`;

const Advertising = styled.div`
  padding: 100px 0;
  margin: 100px 0;
  position: relative;
  @media (max-width: 1160px) {
    padding: 60px 0 40px 0;
  }
  @media (max-width: 860px) {
    flex-direction: column;
    padding: 0 0 30px 0;
    margin: 80px 0 0 0;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const AddLeft = styled.div`
  position: relative;
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 2;
    text-align: center;
  }
`;

const AddRight = styled.div`
  width: 50%;
  @media (max-width: 860px) {
    width: 80%;
    order: 1;
  }
`;

const AddLeftInner = styled.div`
  width: 100%;
  position: absolute;
  top: -300px;
  left: 0;
  @media (max-width: 1190px) {
    top: -250px;
  }
  @media (max-width: 920px) {
    top: -200px;
  }
  @media (max-width: 860px) {
    order: 1;
    position: relative;
    top: -60px;
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  padding: 0 15%;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px; // Ensure image has rounded corners
  }
  @media (max-width: 400px) {
    padding: 0;
  }
`;
