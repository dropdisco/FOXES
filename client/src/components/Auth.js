import React, { useState } from "react";
import SkyReConnect from "./SkyReConnect";
import SkyConnect from "./SkyConnect";

const Auth = () => {
  const [auth, setAuth] = useState("SkyReConnect");

  if (auth === "SkyConnect") {
    return <SkyConnect setAuth={setAuth}/>
  } else {
    return <SkyReConnect setAuth={setAuth}/>
  }
};

export default Auth;
