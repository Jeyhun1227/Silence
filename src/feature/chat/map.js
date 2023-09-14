export const mapChatList = (data = []) => {
  return data.map((item) => ({
    name: item.type === "private" ? "test name" : item.name,
    id: item.id,
    type: item.type,
  }));
};
