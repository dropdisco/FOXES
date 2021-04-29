import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { 
  GiGroundSprout,
  GiBuyCard,
  GiKoala,
  GiHoneyJar,
  GiBurningEye
} from "react-icons/gi";



const Wrapper = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #0f0e17;
  border-top: 1px solid ${(props) => props.theme.darkGrey};
  display: none;
  padding: 0.8rem 1rem;

  .icons a {
    padding: 0;
    margin: 0;
  }

  .icons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icons svg {
    width: 30px;
    height: 30px;
    fill: #1f4d65a1;
  }

  .icons img {
    width: 26px;
    height: 26px;
    object-fit: cover;
    border-radius: 13px;
  }

  .active svg {
    fill: #10acfdc2;
  }

  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const BottomBar = () => {
  return (
    <Wrapper>
      <div className="icons">
        <NavLink activeClassName="active" exact to="/">
          <GiGroundSprout />
        </NavLink>

        <NavLink activeClassName="active" exact to="/feed/liked_videos">
          <GiKoala />
        </NavLink>
        
        <NavLink activeClassName="active" exact to="/feed/subscriptions">
          <GiBuyCard />
        </NavLink>

        <NavLink activeClassName="active" exact to="/feed/history">
          <GiHoneyJar />
        </NavLink>

        <NavLink activeClassName="active" exact to="/feed/trending">
          <GiBurningEye />
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default BottomBar;
