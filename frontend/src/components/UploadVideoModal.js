import React, { useState } from "react";
import { client } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { CloseIcon } from "./Icons";
import { addToRecommendation } from "../reducers/recommendation";
import { scfoxes } from "../utils";
import { toast } from "react-toastify";
import { Progress } from "antd";
import FoxesLoader from "../styles/UploadLoader";
import useInput from "../hooks/useInput";
import Player from "./Player";
import Button from "../styles/Button";

const openModal = keyframes`
	from {
		opacity: 0;
    transition: opacity 2000ms ease-out;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .modal-content {
    width: 600px;
    margin: 4rem auto;
    background: #040407;
    box-shadow: 0px 0px 0px rgb(0 0 0 / 40%), 0px 0px 4px rgb(0 0 0 / 25%);
    border: 2px solid #009ad0;
    border-radius: 4px;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .modal-header-left {
    display: flex;
    align-items: center;
  }

  .modal-header-left svg {
    margin-right: 1rem;
    position: relative;
    fill: ${(props) => props.theme.red};
    top: -1px;
  }

  .video-form {
    border-top: 1px solid ${(props) => props.theme.darkGrey};
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    padding: 0.5rem 1rem;
  }

  .video-form h2 {
    margin: 1rem 0;
  }

  .video-form input,
  .video-form textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.darkGrey};
    color: ${(props) => props.theme.primaryColor};
    padding: 0.6rem 1.2rem;
    margin-bottom: 1.2rem;
    border-radius: 3px;
  }

  .video-form input {
    height: 60px;
  }

  .video-form textarea {
    height: 120px;
  }

  .modal-footer {
    display: flex;
    height: 70px;
    padding: 1rem;
  }

  button {
    margin-left: auto;
  }

  img {
    width: 100%;
    height: 340px;
    object-fit: cover;
  }

  svg {
    width: 30px;
    height: 30px;
    fill: ${(props) => props.theme.red};
  }
.cover-upload-container {
  text-align: center;
  margin-bottom: 25px;
}
.testMargin {
  background: #181625;
    padding: 0px;
    border-radius: 20px;
    box-shadow: 0px 2px 0 0 #009ad0;
}
.styleThumbnail {
  padding: 0.4rem 1rem !important;
    background: #12101b !important;
    color: #FFF;
    border: 1px solid #0a768d !important;
    border-radius: 3px !important;
    -webkit-letter-spacing: 1.1px !important;
    -moz-letter-spacing: 1.1px !important;
    -ms-letter-spacing: 1.1px !important;
    letter-spacing: 1.1px !important;
    margin-bottom: 25px !important;
}
  @media screen and (max-width: 835px) {
    .modal-content,
    .modal-content input,
    .modal-content textarea {
      width: 100%;
    }

    .modal-content {
      margin-top: 7rem;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;


const UploadVideoModal = ({ previewVideo, closeModal, url }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  const title = useInput("");
  const description = useInput("");
  const [tab, setTab] = useState("PREVIEW");

  const [thumbnail, setThumbnail] = useState("");

  const [doprogress, setDoProgress] = useState("");

  const [dostatus, setDoStatus] = useState("");

  const onUploadProgress = (progress, { loaded, total }) => {
    return setDoProgress(Math.round(progress * 100));
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];


    try {
      setDoStatus("uploading");
      const resThumb = await client.uploadFile(file, { onUploadProgress });
      setDoProgress(0);
      console.log(resThumb);
      const parserThumb = await client.getSkylinkUrl(resThumb.skylink);
      setThumbnail(parserThumb);
      setDoStatus("completed");
      setDoProgress(100);
    } catch (error) {
      return toast.error("error");
    }


  };

  const handleTab = async () => {
    if (tab === "PREVIEW") {
      setTab("FORM");
    } else {
      if (!title.value.trim() || !description.value.trim()) {
        return toast.error("Please fill in all the fields");
      }

      const newVideo = {
        title: title.value,
        description: description.value,
        url,
        thumbnail,
      };

      const { data: video } = await scfoxes(
        `${process.env.REACT_APP_FOXES_SKY}/videos`,
        {
          body: newVideo,
        }
      );

      closeModal();

      dispatch(
        addToRecommendation({
          ...video,
          views: 0,
          User: {
            id: user.id,
            avatar: user.avatar,
            username: user.username,
            userID: user.userID,
          },
        })
      );
    }
  };

  return (
    <Wrapper>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-left">
            <CloseIcon onClick={() => closeModal()} />
            <h3>Create Profile Video</h3>
          </div>
          <div style={{ display: url ? "block" : "none" }}>
            <Button className="save-button" onClick={handleTab}>
              {tab === "PREVIEW" ? "Next" : "Process"}
            </Button>
          </div>
        </div>
        {tab === "PREVIEW" && (
          <div className="tab video-preview">
            <Player previewUrl={previewVideo} />
          </div>
        )}
        {tab === "FORM" && (
          <div className="tab video-form">
            <h2>Details</h2>
            <div className="cover-upload-container">
              <label htmlFor="cover-upload">
                <div className="pointer button-thumbnail">
                <div className="testMargin">
                  <button>
                  {dostatus === "uploading" && (<img width="100%" height="200px" style={{display: "none"}} alt=""/> )}
                  {dostatus === "completed" && (<img width="100%" height="200px" src={thumbnail} alt="Upload Thumbnail" />)}
                  </button>Upload Thumbnail
                  </div>
                </div>
              </label>
              <input
                id="cover-upload"
                type="file"
                placeholder="Upload Thumbnail"
                accept="image/*"
                onChange={handleThumbnailUpload}
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
            <input
              type="text"
              placeholder="Enter the title"
              value={title.value}
              onChange={title.onChange}
              className="styleThumbnail"

            />
            <textarea
              placeholder="Tell viewers about your video"
              value={description.value}
              onChange={description.onChange}
              className="styleThumbnail"

            />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default UploadVideoModal;
