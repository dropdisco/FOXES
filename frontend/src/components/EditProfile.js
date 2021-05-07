import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import EditProfileModal from "./EditProfileModal";
import Button from "../styles/Button";
import { SignoutIcon } from "./Icons";
import { logingOut } from "../reducers/user";
import LogoutMySky from "./ButtonExcecution";

const Wrapper = styled.div`
  svg {
    width: 30px;
    height: 30px;
    margin-left: 1rem;
    fill: #c8da99;
  }

  div {
    display: flex;
    align-items: center;
  }
  
.editSkyData {
  padding: 0.4rem 1.22em;
  color: #FFF;
  border-radius: 8px;
  -webkit-letter-spacing: 1.1px;
  -moz-letter-spacing: 1.1px;
  -ms-letter-spacing: 1.1px;
  letter-spacing: 2px;
  background: #459eca1c;
  border-color: transparent;
  cursor: pointer;
  box-shadow: 1px 1px 0 0 #00dcfff7;
}
  @media screen and (max-width: 440px) {
    margin-top: 1rem;
  }
`;

const EditProfile = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const handleLogout = async () => {
    LogoutMySky();
    dispatch(logingOut());
    localStorage.removeItem("user");
    window.location = "/";
  };

  return (
    <>
      <Wrapper>
        <div>
          <Button className="editSkyData" onClick={() => setShowModal(true)}>
            Edit Profile
          </Button>
          <SignoutIcon onClick={handleLogout} />
        </div>
      </Wrapper>
      {showModal && <EditProfileModal closeModal={closeModal} />}
    </>
  );
};
export default EditProfile;
