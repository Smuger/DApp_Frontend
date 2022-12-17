import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.31.30:10000",
  headers: {
    "Content-type": "application/json"
  }
});