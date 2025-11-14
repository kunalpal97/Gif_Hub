
// // src/utils/tensorApi.js
// import axios from "axios";

// export const fetchTrendingGifs = async () => {
//   try {
//     const params = {
//       key: process.env.TENOR_API_KEY,
//       client_key: "gif_hub_app",
//       limit: 10,
//       media_filter: "tinygif",
//     };

//     // console.log("🔥 Final Tenor API URL:", "https://tenor.googleapis.com/v2/featured");
//     // console.log("📦 Params Sent:", params);

//     const response = await axios.get("https://tenor.googleapis.com/v2/featured", { params });
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching trending GIFs:", error.message);
//     if (error.response) console.error("📨 Response:", error.response.data);
//     throw error;
//   }
// };

// export const searchGifs = async (query) => {
//   try {
//     const params = {
//       q: query,
//       key: process.env.TENOR_API_KEY,
//       client_key: "gif_hub_app",
//       limit: 10,
//       media_filter: "tinygif",
//       locale: "en_US",
//     };
//     // console.log("🔍 Final Tenor API URL:", "https://tenor.googleapis.com/v2/search");
//     // console.log("🧾 Params Sent:", params);

//     const response = await axios.get("https://tenor.googleapis.com/v2/search", { params });
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error searching GIFs:", error.message);
//     if (error.response) console.error("📦 Response Data:", error.response.data);
//     throw error;
//   }
// };


// src/utils/tenorApi.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// TENOR API - v2 (change if you used a different endpoint)
const BASE = "https://tenor.googleapis.com/v2";
const KEY = process.env.TENOR_API_KEY;

if (!KEY) {
  console.warn("TENOR_API_KEY not set in .env — GIF endpoints will fail.");
}

/**
 * Fetch trending gifs (or general list)
 * limit: number, pos: offset (Tenor supports cursor/next but we pass limit/pos)
 */
export async function fetchTrending(limit = 12, pos = 0) {
  // Tenor v2 uses 'q' param for search; for trending you can use 'trending_terms' or no q.
  const url = `${BASE}/trending`;
  const res = await axios.get(url, {
    params: {
      key: KEY,
      limit,
      pos,
      // optionally add locale or contentfilter
    },
  });
  return res.data; // contains results array
}

/**
 * Search Tenor
 */
export async function fetchBySearch(q = "", limit = 12, pos = 0) {
  const url = `${BASE}/search`;
  const res = await axios.get(url, {
    params: {
      key: KEY,
      q,
      limit,
      pos,
    },
  });
  return res.data;
}
