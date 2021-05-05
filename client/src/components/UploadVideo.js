import React, { useState } from "react";
import { UploadIcon } from "./Icons";
import UploadVideoModal from "./UploadVideoModal";
import { client } from "../utils";
import FoxesLoader from "../styles/UploadLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Progress } from "antd";


const UploadVideo = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState("");
  const [status, setStatus] = useState("");
  const closeModal = () => setShowModal(false);

  const [progress, setProgress] = useState(-1);

  const [url, setUrl] = useState("");

  const onUploadProgress = (progress, { loaded, total }) => {
    return setProgress(Math.round(progress * 100));
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    const size = file.size / 1000000;

    if (size > 300) {
      return toast.error("Sorry, file size should be less than 300MB");
    }

    try {

      setStatus("uploading");
      setProgress(0);

      const response = await client.uploadFile(file, { onUploadProgress });

      setShowModal(true);
      setPreviewVideo(response);

      console.log(response);

      const parseR = await client.getSkylinkUrl(response.skylink);
      setPreviewVideo(parseR);

      const skyLinkMp4 = parseR + "#.mp4";

      const data = skyLinkMp4;

      setUrl(data);
      setProgress(100);
      setStatus("completed");
      setProgress(0)
      console.log(data);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div>
      <label htmlFor="video-upload">
        <UploadIcon />
      </label>
      <input
        style={{ display: "none" }}
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
      />
      {status === "uploading" && (
        <div className="customLoaderFoxes">
          <FoxesLoader />
          <div className="customId2">
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              width={250}
              percent={progress}
            />
          </div>
        </div>
      )}
      {showModal && (
        <UploadVideoModal
          closeModal={closeModal}
          previewVideo={previewVideo}
          url={url}
        />
      )}
    </div>
  );
};

export default UploadVideo;
