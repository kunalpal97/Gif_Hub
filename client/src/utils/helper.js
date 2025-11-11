export function safeId(obj) {
  return obj.id || obj.gifId || obj._id || "";
}
