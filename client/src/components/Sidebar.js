import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import Subscriptions from "./Subscriptions";


import { 
  GiGroundSprout,
  GiBuyCard,
  GiBurningEye,
  GiHoneyJar,
  GiCubes,
  GiTrade,
  GiKoala
} from "react-icons/gi";




import { closeSidebar } from "../reducers/sidebar";

const SidebarWrapper = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: #12101b;
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    padding-left: 1.5rem;
    margin-bottom: 1.2rem;
  }

  .icon:not(.hover-disable):hover {
    background: #4381a045;
    cursor: pointer;
    border-radius: 25px;
  }

  .active div {
    background: #459eca1c;
    cursor: pointer;
    border-radius: 25px;
    box-shadow: 0px 1px 0 0 #00dcfff7;
  }

  .active svg {
    fill: #10acfdc2;
  }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  @media screen and (max-width: 1093px) {
    transform: translateX(-100%);

    ${(props) =>
      props.open &&
      css`
        transform: translateX(0);
      `}
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebar: open } = useSelector((state) => state.sidebar);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <SidebarWrapper open={open}>
      <NavLink
        onClick={handleCloseSidebar}
        exact
        to="/"
        activeClassName="active"
      >
        <div className="icon">
          <GiGroundSprout />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink
        onClick={handleCloseSidebar}
        to="/feed/trending"
        activeClassName="active"
      >
        <div className="icon">
          <GiBurningEye />
          <span>Trending</span>
        </div>
      </NavLink>

      <NavLink
        onClick={handleCloseSidebar}
        to="/feed/subscriptions"
        activeClassName="active"
      >
        <div className="icon">
          <GiBuyCard />
          <span>Subscriptions</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <NavLink
        onClick={handleCloseSidebar}
        to="/feed/library"
        activeClassName="active"
      >
        <div className="icon">
          <GiCubes />
          <span>Library</span>
        </div>
      </NavLink>

      <NavLink
        onClick={handleCloseSidebar}
        to="/feed/history"
        activeClassName="active"
      >
        <div className="icon">
          <GiHoneyJar />
          <span>History</span>
        </div>
      </NavLink>

      <NavLink
        onClick={handleCloseSidebar}
        to="/feed/my_videos"
        activeClassName="active"
      >
        <div className="icon">
          <GiTrade />
          <span>Your videos</span>
        </div>
      </NavLink>

      <NavLink
        onClick={handleCloseSidebar}
        to="/feed/liked_videos"
        activeClassName="active"
      >
        <div className="icon">
          <GiKoala />
          <span>Liked videos</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <Subscriptions />
    </SidebarWrapper>
  );
};

export default Sidebar;
