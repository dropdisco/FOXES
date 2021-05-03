import { SkynetClient } from "skynet-js";

const dataDomain = window.location.hostname === "localhost" ? "localhost" : "skey.hns";
const portal = "https://siasky.net";
const client = new SkynetClient(portal);

const LogoutMySky = async () => {
    const mySky = await client.loadMySky(dataDomain);
    await mySky.logout();
}

export default LogoutMySky;
