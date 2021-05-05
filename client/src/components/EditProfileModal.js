import React, { useState } from "react";
import { client, seed, dataKey } from "../utils";
import { genKeyPairFromSeed } from "skynet-js";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { CloseIcon } from "./Icons";
import Button from "../styles/Button";
import useInput from "../hooks/useInput";
import { updateUser } from "../reducers/user";
import { updateProfile } from "../reducers/profile";
import { scfoxes, updateUserLocalSt } from "../utils";
import FoxesLoader from "../styles/UploadLoader";
import { Progress } from "antd";

const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .edit-profile {
    width: 580px;
    border-radius: 4px;
    background: #040407;
    margin: 36px auto;
    box-shadow: 0px 0px 0px rgb(0 0 0 / 40%), 0px 0px 4px rgb(0 0 0 / 25%);
    border: 2px solid #009ad0;
  }

  .edit-profile img {
    object-fit: cover;
  }

  .avatar {
    margin-top: -40px;
    margin-left: 20px;
  }

  div.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }

  h3 {
    display: flex;
    align-items: center;
  }

  form {
    padding: 1rem;
  }

  input,
  textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
  }

  textarea {
    height: 75px;
  }

  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
  }
.save-button {
  padding: 0.4rem 1rem;
  background: #040407;
  color: #dfdef5;
  border: 1px solid #008ec5;
  border-radius: 3px;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  font-weight: 600;
  letter-spacing: 2px;
}
.warn-edit-profile {
  display: block;
  text-align: center; 
  font-size: 12px;
  text-transform: uppercase;
  background: #00a1d3;
}
  @media screen and (max-width: 600px) {
    .edit-profile {
      width: 90%;
      margin: 4rem auto;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const EditProfileModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { data: profile } = useSelector((state) => state.profile);
  const [doprogress, setDoProgress] = useState("");
  const [dostatus, setDoStatus] = useState("");
  const [doprogress1, setDoProgress1] = useState("");
  const [dostatus1, setDoStatus1] = useState("");
  const firstname = useInput(profile.firstname);
  const lastname = useInput(profile.lastname);
  const username = useInput(profile.username);
  const channelDesc = useInput(profile.channelDescription || "");
  const { privateKey } = genKeyPairFromSeed(seed);

  // uploaded avatar, cover
  const [cover, setCover] = useState("");
  const [avatar, setAvatar] = useState("");

  const onUploadProgress = (progress, { loaded, total }) => {
    return setDoProgress(Math.round(progress * 100));
  };

  // handlers for image upload
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];

    try {

      setDoStatus("uploading");
      const resThumb = await client.uploadFile(file, { onUploadProgress });
      setDoProgress(0);
      const parserThumb = await client.getSkylinkUrl(resThumb.skylink);
      setCover(parserThumb);
      console.table(parserThumb);
      setDoStatus("completed");
      setDoProgress(100);

    } catch (error) {
      return toast.error("error");
    }
    
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    try {
      setDoStatus1("uploading");
      const resThumb = await client.uploadFile(file, { onUploadProgress });
      setDoProgress1(0);
      const parserThumb = await client.getSkylinkUrl(resThumb.skylink);
      setAvatar(parserThumb);
      console.table(resThumb);
      setDoStatus1("completed");
      setDoProgress1(100);

    } catch (error) {
      return toast.error("error");
    }

  };

  const handleEditProfile = async () => {
    if (!firstname.value.trim()) {
      return toast.error("firstname should not be empty");
    }

    if (!lastname.value.trim()) {
      return toast.error("lastname should not be empty");
    }

    if (!username.value.trim()) {
      return toast.error("username should not be empty");
    }

    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
      username: username.value,
    };

    if (avatar) data.avatar = avatar;
    if (cover) data.cover = cover;

    const updates = { ...data, channelDescription: channelDesc.value };
    const setJSON = async () => {

      try {
        await client.db.setJSON(privateKey, dataKey, data, avatar, cover);
        console.log('%c%s', 'color: white; background: green; font-size: 15px;','Edit Profile Then SetJSON ⏬');
        console.table({privateKey, dataKey, data, avatar, cover});
      } catch (error) {
        return toast.error(error);
      }
    };
    
    await setJSON();
    dispatch(updateProfile(updates));
    dispatch(updateUser(updates));
    scfoxes(`${process.env.REACT_APP_FOXES_SKY}/users`, {
      body: updates,
      method: "PUT",
    });

    updateUserLocalSt(updates);
    toast.dark("Profile updated");
    closeModal();
  };

  return (
    <Wrapper>
      <div className="container"></div>
      <div className="edit-profile">
        <div className="modal-header">
          <h3>
            <CloseIcon onClick={() => closeModal()} />
            <span>Edit Profile</span>
          </h3>
          <Button className="save-button" onClick={handleEditProfile}>Save</Button>
        </div>

        <div className="cover-upload-container">
          <label htmlFor="cover-upload">
            <img
              className="pointer"
              width="100%"
              height="200px"
              src={cover ? cover : profile.cover}
              alt="cover"
            />
          </label>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            style={{ display: "none" }}
          />
                  {dostatus === "uploading" && (
                <div className="customLoaderFoxes">
                  <FoxesLoader />
                  <div className="customId2">
                    <Progress
                      strokeColor={{
                        from: "#108ee9",
                        to: "#87d068",
                      }}
                      percent={doprogress}
                      status="active"
                    />
                  </div>
                </div>
        )}
        </div>

        <div className="avatar-upload-icon">
          <label htmlFor="avatar-upload">
            <img
              src={avatar ? avatar : profile.avatar}
              className="pointer avatar lg"
              alt="avatar"
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />
                  {dostatus1 === "uploading" && (
                <div className="customLoaderFoxes">
                  <FoxesLoader />
                  <div className="customId2">
                    <Progress
                      strokeColor={{
                        from: "#108ee9",
                        to: "#87d068",
                      }}
                      percent={doprogress1}
                      status="active"
                    />
                  </div>
                </div>
        )}
        </div>

        <form>
        <input
            type="text"
            placeholder="username"
            value={username.value}
            onChange={username.onChange}
          />
          <input
            type="text"
            placeholder="firstname"
            value={firstname.value}
            onChange={firstname.onChange}
          />
          <input
            type="text"
            placeholder="lastname"
            value={lastname.value}
            onChange={lastname.onChange}
          />
          <textarea
            type="text"
            placeholder="Tell viewers about your channel"
            value={channelDesc.value}
            onChange={channelDesc.onChange}
          />
          <span className="warn-edit-profile">Change : Profile Name : Avatar : Cover Image</span>
        </form>
      </div>
    </Wrapper>
  );
};

export default EditProfileModal;
