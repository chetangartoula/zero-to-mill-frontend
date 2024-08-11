import axios from "axios";

export default async function setRefreshToken(refreshToken: string) {
  try {
    // const res =
    //   (document.cookie = `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`);

    const res = await axios.post("lib/session", {});
  } catch (err) {
    console.error(err);
  }
}
