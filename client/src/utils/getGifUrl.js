// src/utils/getGifUrl.js
export default function getGifUrl(gif) {
  // Try multiple known paths (covers Tenor v2 variations + fallback)
  // Order: media_formats.gif.url (recommended) -> media[0].gif.url -> gif.url -> mediaUrl -> ""
  return (
    gif?.media_formats?.gif?.url ||
    gif?.media?.[0]?.gif?.url ||
    gif?.gif?.url ||
    gif?.url ||
    gif?.mediaUrl ||
    ""
  );
}
