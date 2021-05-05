import React, { useState, useEffect } from "react";
import { parseSkylink, genKeyPairFromSeed } from "skynet-js";
import { ContentRecordDAC } from "@skynetlabs/content-record-library";
import { client, skykey, seed, dataKey } from "../utils";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import faker from "faker";
import { skyconnect } from "../reducers/user";
import { toast } from "react-toastify";
import LogoutMySky from "./ButtonExcecution";
import FoxesLoader from "../styles/Loader";
import foxesLogo from "../assets/logo.svg";



export const StyledAuth = styled.div`
  margin: 0 auto;
  display: block;
  max-width: 420px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 200px;

  h2 {
    margin-bottom: 3.3rem;
    text-align: center;
  }

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .input-group input:last-child {
    margin-left: 0.7rem;
  }

  input {
    overflow: hidden;
    border-radius: 3px;
    width: 100%;
    padding: 0.6rem 1.2rem;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1.5rem;
    color: ${(props) => props.theme.primaryColor};
  }

  .action {
    margin-top: 1rem;
  }

  button {
    padding: 0.4rem 3rem;
    background: #20ebf0;
    color: #fbfbfb;
    border: 1px solid #171421;
    border-radius: 3px;
    text-transform: uppercase;
    -webkit-letter-spacing: 1.1px;
    -moz-letter-spacing: 1.1px;
    -ms-letter-spacing: 1.1px;
    letter-spacing: 1.1px;
  }

  span {
    letter-spacing: 0.8px;
    color: ${(props) => props.theme.secondaryColor};
  }

  .foxes-bordering {
    padding: 10px 0px;
    border-bottom: 1px solid #22eaf0;
    letter-spacing: 2px;
    color: #34dde7;
    border-width: medium;
  }

  .foxes_uiles-left {
    position: absolute;
    left: 100px;
  }

  .foxes_uiles-right {
    position: absolute;
    right: 100px;
  }

  .uiles {
    position: fixed;
    top: 0;
    bottom: 0;
    pointer-events: none;
    width: 2px;
    margin: 0;

    .left_uiles {
      left: 70px;
      margin-left: -1px;
    }
  }
  .sm_uiles {
    position: absolute;
    left: 0;
    right: 0;
    height: 45px;
    background-color: #20ebf0;
    background-blend-mode: darken;
    -moz-transition: background-color 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
    -o-transition: background-color 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transition: background-color 0.8s
      cubic-bezier(0.215, 0.61, 0.355, 1);
    transition: background-color 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .sm_uiles.top {
    top: 0;
  }

  .mid_uiles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    background: #928caf40;
  }

  .sm_uiles.bot {
    bottom: 0;
  }

  @media screen and (max-width: 430px) {
    margin: 20% auto;
    width: 90%;

    .foxes_uiles-left {
      left: 30px;
    }

    .foxes_uiles-right {
      right: 30px;
    }
  }
`;

const SkyConnect = ({ setAuth }) => {

  const dispatch = useDispatch();
  const [mySky, setMySky] = useState("");
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);
  const { publicKey, privateKey } = genKeyPairFromSeed(seed);

  const textFoxes = "Username";
  const firstname = faker.datatype.number({ min: 5, max: 500 });
  const lastname = textFoxes + firstname;
  const username = lastname;
  const dataDomain = window.location.hostname === "localhost" ? "localhost" : "skey.hns";
  const contentRecord = new ContentRecordDAC();

  const registryWrite = async () => {

    try {
      
      const rawSkylink = parseSkylink(skykey);
      const { entry } = await client.registry.getEntry(publicKey, dataKey, {
        timeout: 2,
      });

      const revision = entry ? entry.revision + 1n : 0n;

      const updatedEntry = {
        datakey: dataKey,
        data: rawSkylink,
        revision,
      };

      await client.registry.setEntry(privateKey, updatedEntry);
      console.table({dataKey, privateKey});
    } catch (error) {

      return toast.error(error);
    }
  };
  
  
  const mySkyConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    const mySky = await client.loadMySky(dataDomain);
    const status = await mySky.requestLoginAccess();
    await mySky.loadDacs(contentRecord);
    const userID = await mySky.userID();


    const payload = {
      username,
      firstname,
      lastname,
      userID,
      skykey,
    };

    const setJSON = async () => {

      try {
        await client.db.setJSON(privateKey, dataKey, payload);
        console.log('%c%s', 'color: white; background: green; font-size: 15px;','SetJSON ⏬');
        console.table({privateKey, dataKey, payload});
      } catch (error) {
        return toast.error(error);
      }
    };

    setLoggedIn(status);

    if (status) {
      await registryWrite();
      await setJSON();
      setUserID(await mySky.userID());
      setLoading(false);
      dispatch(skyconnect({ payload }));
      console.table({ username, firstname, lastname, userID });
    }
    
  };


  const mySkyDisconnect = async () => {
    await mySky.logout();
    setLoggedIn(false);
    setUserID("");
  };

  const buttonSetting = async () => {
    await LogoutMySky();
    setAuth("SkyReConnect");
  };


  useEffect(() => {
    const initMySky = async () => {
      try {
        const mySky = await client.loadMySky(dataDomain);
        await mySky.loadDacs(contentRecord);
        const loggedIn = await mySky.checkLogin();
        console.log("silent response:", loggedIn);
        setMySky(mySky);
        setLoggedIn(loggedIn);
        if (loggedIn) {
          setUserID(await mySky.userID());
          console.table(userID);
        }
      } catch (e) {
        console.error(e);
      }
    };
    initMySky();
    const destroyMySky = async () => {
      if (mySky) {
        await mySky.destroy();
        mySkyDisconnect();
      }
    };
    destroyMySky();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyledAuth>
      <div className="foxes_uiles-left">
        <div className="left_uiles uiles">
          <div className="sm_uiles top"></div>
          <div className="mid_uiles"></div>
          <div className="sm_uiles bot"></div>
        </div>
      </div>
      <div className="foxes_uiles-right">
        <div className="right uiles">
          <div className="sm_uiles top"></div>
          <div className="mid_uiles"></div>
          <div className="sm_uiles bot"></div>
        </div>
      </div>
      <img src={foxesLogo} className="foxeslogo" alt="foxesLogo" />
      <h2 className="sky-connect-wtih">
        <span>FOXES MEDIA</span>
      </h2>
      <form style={{ textAlign: "center" }}>
        {loading && (
          <button size="medium">
            <FoxesLoader />
          </button>
        )}
        {!loading && !loggedIn && (
          <button className="foxesBtn" onClick={mySkyConnect} size="medium">
            MySky Create
          </button>
        )}
        {!loading && loggedIn && (
          <button onClick={mySkyDisconnect} size="medium">
            <FoxesLoader />
            <span style={{ color: "#12101b", fontWeight: "500" }}>
              Please Wait...
            </span>
          </button>
        )}
        <div className="action input-group">
          <span
            className="pointer sky-connect-wtih"
            onClick={() => buttonSetting()}
          >
            <span className="foxes-bordering">Connect With MySky</span>
          </span>
        </div>
      </form>
    </StyledAuth>
  );
};

export default SkyConnect;
