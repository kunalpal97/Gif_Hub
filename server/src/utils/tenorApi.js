
// src/utils/tensorApi.js
import axios from "axios";

export const fetchTrendingGifs = async () => {
  try {
    const params = {
      key: process.env.TENOR_API_KEY,
      client_key: "gif_hub_app",
      limit: 10,
      media_filter: "tinygif",
    };

    console.log("🔥 Final Tenor API URL:", "https://tenor.googleapis.com/v2/featured");
    console.log("📦 Params Sent:", params);

    const response = await axios.get("https://tenor.googleapis.com/v2/featured", { params });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching trending GIFs:", error.message);
    if (error.response) console.error("📨 Response:", error.response.data);
    throw error;
  }
};

export const searchGifs = async (query) => {
  try {
    const params = {
      q: query,
      key: process.env.TENOR_API_KEY,
      client_key: "gif_hub_app",
      limit: 10,
      media_filter: "tinygif",
      locale: "en_US",
    };
    console.log("🔍 Final Tenor API URL:", "https://tenor.googleapis.com/v2/search");
    console.log("🧾 Params Sent:", params);

    const response = await axios.get("https://tenor.googleapis.com/v2/search", { params });
    return response.data;
  } catch (error) {
    console.error("❌ Error searching GIFs:", error.message);
    if (error.response) console.error("📦 Response Data:", error.response.data);
    throw error;
  }
};


