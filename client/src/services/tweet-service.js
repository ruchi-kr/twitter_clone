import axios from "axios";
import toast from "react-hot-toast";
const API_URL = "https://twitter-clone-bys6.onrender.com/tweets";

export const createTweet = async (tweet, accessToken) => {
  try {
    const response = await axios.post(API_URL + "/create", tweet, {
      headers: { "x-access-token": accessToken },
    });
    toast.success("Tweet Added Successfully");
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Tweet Input Field Can not be Empty");
  }
};

export const getTweets = async (username) => {
  const response = await axios.get(API_URL + "/" + username);
  return response.data;
};

export const getFollowingsTweets = async (followings, accessToken) => {
  const response = await axios.post(
    API_URL + "/followings",
    { followings: followings },
    { headers: { "x-access-token": accessToken } }
  );
  return response.data;
};

export const updateTweet = async (datas, accessToken) => {
  const response = await axios.patch(
    `${API_URL}/update/${datas.tweet._id}`,
    datas,
    { headers: { "x-access-token": accessToken } }
  );
  return response.data;
};
