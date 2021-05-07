import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import videojs from "video.js";
import { scfoxes } from "../utils";
import "video.js/dist/video-js.css";
import '@videojs/themes/dist/city/index.css';

const Player = ({ previewUrl }) => {

  const videoRef = useRef(null);

  const dispatch = useDispatch();
  
  const { id: videoId, url: src, thumb: poster } = useSelector(
    (state) => state.video.data
  );

  useEffect(() => {
// 
    const vjsPlayer = videojs(videoRef.current);

    if (!previewUrl) {
      vjsPlayer.poster(poster);
      vjsPlayer.src(src);
    }

    if (previewUrl) {
      vjsPlayer.src({ type: 'video/mp4', src: previewUrl });
      vjsPlayer.src(src);
    }

    vjsPlayer.on("ended", () => {
      scfoxes(`${process.env.REACT_APP_FOXES_SKY}/videos/${videoId}/view`);
    });

    return () => {
      if (vjsPlayer) {
        vjsPlayer.dispose();
      }
    };
  }, [videoId, dispatch, src, previewUrl, poster]);

  return (
    <div data-vjs-player>
      <video
        controls
        ref={videoRef}
        source="true"
        className="video-js vjs-fluid vjs-big-play-centered vjs-theme-city"
      ></video>
    </div>
  );
};

export default Player;
