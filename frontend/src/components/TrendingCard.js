import React from "react";
import styled from "styled-components";
import { timeSince } from "../utils";

const Wrapper = styled.div`
  margin: 1.4rem 0;
  margin-top: 1rem;
  display: flex;

  .thumb {
    width: 250px;
    height: 150px;
    border-radius: 4px;
    box-shadow: 10px 5px 5px 0px rgb(12 11 19);
    border-radius: 4px;
    border: 2px solid #009ad0;
    
  }

  .video-info-container {
    margin-left: 1.2rem;
  }

  p {
    font-size: 0.9rem;
  }

  p:last-child {
    margin-top: 0.2rem;
  }

  p span {
    padding-right: 0.3rem;
  }

  @media screen and (max-width: 750px) {
    margin: 1.2rem 0;

    .video-info-container {
      margin-left: 1.5rem;
    }
  }

  @media screen and (max-width: 645px) {
    flex-direction: column;

    .video-info-container {
      padding-bottom: 1rem;
    }

    .thumb {
      width: 100%;
      height: 300px;
    }

    .video-info-container {
      margin-left: 0;
      margin-top: 1rem;
    }
  }

  @media screen and (max-width: 530px) {
    .thumb {
      width: 100%;
      height: 250px;
    }
  }

  @media screen and (max-width: 420px) {
    .thumb {
      width: 100%;
      height: 200px;
    }
  }
`;

const TrendingCard = ({ video }) => {
  return (
    <Wrapper>
      <img className="thumb" src={video.thumbnail} alt="thumbnail" />
      <div className="video-info-container">
        <h3>{video.title}</h3>
        <p className="secondary">
          <span>{video.User.username}</span>
          <span>•</span>
          <span>{video.views || 0} views</span>
          <span>•</span> <span>{timeSince(video.createdAt)} ago</span>
        </p>
        <p className="secondary">{video.description.substr(0, 130)}</p>
      </div>
    </Wrapper>
  );
};

export default TrendingCard;
