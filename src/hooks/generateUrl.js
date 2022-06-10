import axios from "../axios/axiosInstance";

async function generateUrl(url) {
  const res = await axios.post("/", { fullURL: url });
}
