import { client } from "../utils";

const dataDomain = window.location.hostname === "localhost" ? "localhost" : "skey.hns";

const LogoutMySky = async () => {
    const mySky = await client.loadMySky(dataDomain);
    await mySky.logout();
}

export default LogoutMySky;
