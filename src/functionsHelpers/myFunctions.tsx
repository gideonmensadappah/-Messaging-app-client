const REQUEST_URL = "http://localhost:5151/messages/";
export const getCurrentUserMessagesAsync = async (currentUserId: string) => {
  let res = await fetch(`${REQUEST_URL}user/${currentUserId}`);
  return await res.json();
};
